import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn.ts'

/**
 * Sfondo della pagina 404: una "tenda" di strisce verticali con codice che scorre e ondeggia al vento.
 * - Il codice è disegnato una sola volta su un canvas nascosto; a ogni frame ogni striscia ne copia una fetta inclinata.
 * - Ogni striscia è una molla collegata alle vicine, così l'onda si propaga; il mouse aggiunge una spinta.
 * - L'animazione si ferma fuori schermo o con la scheda in background; con prefers-reduced-motion resta ferma.
 */

const FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace'

/** Righe di codice a tema "pagina non trovata" (nessun testo da tradurre). */
const SNIPPETS = [
  "app.get('*', (req, res) => {",
  "  res.status(404).json({ error: 'Not Found' })",
  '})',
  'const page = routes.find((route) => route.path === pathname)',
  'if (!page) return <NotFound />',
  '<Route path="*" element={<NotFound />} />',
  'export default function NotFound() {',
  "throw new Error('404')",
  "const { data, error } = await supabase.from('pages').select('*')",
  'if (error) return next(error)',
  "await fetch('/api/contact', { method: 'POST' })",
  'const [found, setFound] = useState(false)',
  'useEffect(() => { navigate("/") }, [])',
  "import { Link } from 'react-router'",
  'return res.sendStatus(404)',
  'while (!found) { keepLooking() }',
  'export const status = 404',
  "console.error('Cannot GET', req.url)",
  'SELECT * FROM pages WHERE slug = $1',
  'const route = null',
  'let answer = undefined',
] as const

const TOKEN =
  /'[^']*'|"[^"]*"|\b(?:const|let|return|if|else|await|async|export|default|function|throw|new|import|from|while|SELECT|FROM|WHERE)\b|\b(?:null|undefined|true|false)\b|\b\d+\b|[A-Za-z_$][\w$]*|\s+|[^\sA-Za-z_$\d]/g
const KEYWORD =
  /^(?:const|let|return|if|else|await|async|export|default|function|throw|new|import|from|while|SELECT|FROM|WHERE)$/
const LITERAL = /^(?:null|undefined|true|false|\d+)$/

type Colors = { fg: string; muted: string; accent: string; accent2: string }

/** Colori del tema in uso (le variabili CSS del sito), riletti quando cambia il tema. */
function readColors(): Colors {
  const style = getComputedStyle(document.documentElement)
  const get = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback
  return {
    fg: get('--fg', '#eaf0fb'),
    muted: get('--muted', '#9aa8bd'),
    accent: get('--accent', '#38bdf8'),
    accent2: get('--accent-2', '#a78bfa'),
  }
}

/** Numero pseudo-casuale ripetibile (sempre lo stesso per lo stesso n): niente Math.random, il disegno è stabile. */
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const ROWS = 72

/** Disegna la tessera di codice (larga quanto il telo, alta ROWS righe) su un canvas nascosto. */
function buildTile(width: number, dpr: number, fontSize: number, lineHeight: number, colors: Colors) {
  const tile = document.createElement('canvas')
  tile.width = Math.ceil(width * dpr)
  tile.height = Math.ceil(ROWS * lineHeight * dpr)
  const c = tile.getContext('2d')
  if (!c) return tile

  c.scale(dpr, dpr)

  // Fondo con il gradiente del sito, incluso nella tessera per non ridisegnarlo a ogni frame.
  const body = c.createLinearGradient(0, 0, width, 0)
  body.addColorStop(0, colors.accent)
  body.addColorStop(1, colors.accent2)
  c.globalAlpha = 0.16
  c.fillStyle = body
  c.fillRect(0, 0, width, ROWS * lineHeight)

  c.font = `${fontSize}px ${FONT}`
  c.textBaseline = 'alphabetic'
  const charWidth = c.measureText('M').width
  const columns = Math.ceil(width / charWidth) + 48

  for (let row = 0; row < ROWS; row++) {
    // Ogni riga concatena più frammenti partendo da un indice diverso.
    let line = ''
    for (let k = row * 7; line.length < columns; k++) line += `${SNIPPETS[k % SNIPPETS.length]}      `

    let x = -Math.floor(rand(row) * 36) * charWidth
    const y = (row + 1) * lineHeight - lineHeight * 0.28
    for (const token of line.match(TOKEN) ?? []) {
      const advance = token.length * charWidth
      if (x + advance > 0 && x < width && token.trim()) {
        if (token[0] === "'" || token[0] === '"') {
          c.fillStyle = colors.accent2
          c.globalAlpha = 0.95
        } else if (KEYWORD.test(token)) {
          c.fillStyle = colors.accent
          c.globalAlpha = 1
        } else if (LITERAL.test(token)) {
          c.fillStyle = colors.fg
          c.globalAlpha = 0.95
        } else {
          c.fillStyle = colors.muted
          c.globalAlpha = /^[\w$]+$/.test(token) ? 0.85 : 0.6
        }
        c.fillText(token, x, y)
      }
      x += advance
    }
  }
  return tile
}

/** Forze della simulazione: rigidità della molla, attrito, legame con le strisce vicine. */
const SPRING = 7
const DAMPING = 1.4
const COUPLING = 22

export default function CodeCurtain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const host = canvas.parentElement ?? canvas

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let dpr = 1
    let stripWidth = 40
    let stripCount = 0 // strisce visibili + una per lato (con l'inclinazione il fondo esce dai bordi)
    let tile: HTMLCanvasElement | null = null
    let colors = readColors()
    let offset: number[] = [] // sfasamento iniziale dello scorrimento di ogni striscia
    let speed: number[] = [] // velocità di scorrimento di ogni striscia (poco diversa dalle altre)
    let pos: number[] = [] // spostamento del fondo di ogni striscia, in pixel
    let vel: number[] = []
    let time = 0
    let running = false
    let visible = true
    let frameId = 0
    let last = 0
    let pointer: { x: number; at: number } | null = null

    /** Vento: raffiche lente (ampiezza che sale e scende) e un'onda che attraversa il telo da sinistra a destra. */
    const wind = (i: number, t: number) => {
      const amplitude = clamp(height * 0.06, 14, 40)
      const gust = 0.4 + 0.6 * Math.pow(Math.max(0, Math.sin(t * 0.37)), 2)
      const wave = Math.sin(t * 1.5 - i * 0.42) + 0.5 * Math.sin(t * 2.6 - i * 0.9 + 1.3)
      return amplitude * gust * wave * 0.7
    }

    const step = (dt: number) => {
      const fixed = 1 / 120
      for (let done = 0; done < dt - 1e-6; done += fixed) {
        time += fixed
        for (let i = 0; i < stripCount; i++) {
          const left = pos[i - 1] ?? pos[i] ?? 0
          const right = pos[i + 1] ?? pos[i] ?? 0
          const here = pos[i] ?? 0
          const accel =
            SPRING * (wind(i, time) - here) - DAMPING * (vel[i] ?? 0) + COUPLING * (left + right - 2 * here)
          vel[i] = (vel[i] ?? 0) + accel * fixed
        }
        for (let i = 0; i < stripCount; i++) pos[i] = (pos[i] ?? 0) + (vel[i] ?? 0) * fixed
      }
    }

    const draw = () => {
      if (!tile || width === 0) return
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const tileHeight = tile.height / dpr
      for (let i = 0; i < stripCount; i++) {
        const x0 = (i - 1) * stripWidth
        const slope = (pos[i] ?? 0) / height
        // Le strisce inclinate verso un lato prendono più luce dell'altro: le pieghe del tessuto.
        const lit = clamp(0.5 + slope * 9, 0, 1)

        // Inclina la striscia: l'attaccatura in alto resta ferma, il fondo si sposta di pos[i].
        ctx.setTransform(dpr, 0, slope * dpr, dpr, x0 * dpr, 0)

        // Il tessuto con il codice: scorre verso l'alto, ogni striscia alla sua velocità.
        const scroll = (time * 20 * (speed[i] ?? 1) + (offset[i] ?? 0)) % tileHeight
        const firstPart = Math.min(height, tileHeight - scroll)
        ctx.globalAlpha = 0.3 + 0.24 * lit
        const sx = i * stripWidth * dpr
        ctx.drawImage(tile, sx, scroll * dpr, stripWidth * dpr, firstPart * dpr, 0, 0, stripWidth + 0.4, firstPart)
        if (firstPart < height) {
          const rest = height - firstPart
          ctx.drawImage(tile, sx, 0, stripWidth * dpr, rest * dpr, 0, firstPart, stripWidth + 0.4, rest)
        }

        // Filo di piega tra una striscia e l'altra.
        ctx.globalAlpha = 0.07 + 0.08 * lit
        ctx.fillStyle = colors.fg
        ctx.fillRect(0, 0, 1, height)
      }
    }

    const buildTileForSize = () => {
      const small = width < 640
      const fontSize = small ? 10 : 11.5
      tile = buildTile((stripCount + 1) * stripWidth, dpr, fontSize, small ? 15 : 17, colors)
    }

    /** Alla prima misura o al cambio di dimensioni: rifà strisce e tessera. */
    const layout = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      const visibleStrips = Math.max(1, Math.round(width / (width < 640 ? 40 : 58)))
      stripWidth = width / visibleStrips
      stripCount = visibleStrips + 2
      offset = Array.from({ length: stripCount }, (_, i) => rand(i + 1) * 900)
      speed = Array.from({ length: stripCount }, (_, i) => 0.88 + rand(i + 50) * 0.24)
      if (pos.length !== stripCount) {
        pos = Array.from({ length: stripCount }, (_, i) => wind(i, 1.2))
        vel = Array.from({ length: stripCount }, () => 0)
      }
      buildTileForSize()
      draw()
    }

    const frame = (now: number) => {
      frameId = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000 || 1 / 60)
      last = now
      step(dt)
      draw()
    }
    const start = () => {
      if (running || reduceMotion.matches || !visible || document.hidden) return
      running = true
      last = performance.now()
      frameId = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frameId)
    }
    const refresh = () => {
      stop()
      if (reduceMotion.matches) draw()
      else start()
    }

    // Il mouse spinge il tessuto: la velocità del cursore diventa una spinta sulle strisce vicine.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || reduceMotion.matches || stripCount === 0) return
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const now = performance.now()
      if (pointer && now - pointer.at < 200) {
        const speedX = ((x - pointer.x) / Math.max(8, now - pointer.at)) * 1000
        const push = clamp(speedX * 0.04, -90, 90)
        for (let i = 0; i < stripCount; i++) {
          const distance = (x - ((i - 1) * stripWidth + stripWidth / 2)) / stripWidth
          if (Math.abs(distance) < 5) vel[i] = (vel[i] ?? 0) + push * Math.exp(-(distance * distance) / 5)
        }
      }
      pointer = { x, at: now }
    }

    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)

    // Cambio tema: stesso disegno con i colori nuovi.
    const themeObserver = new MutationObserver(() => {
      colors = readColors()
      if (width > 0) {
        buildTileForSize()
        if (!running) draw()
      }
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    reduceMotion.addEventListener('change', refresh)
    host.addEventListener('pointermove', onPointerMove)

    layout()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduceMotion.removeEventListener('change', refresh)
      host.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  // La sfumatura verso il basso è una maschera CSS, più economica che sfumare nel canvas.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none block [mask-image:linear-gradient(to_bottom,#000_0%,rgb(0_0_0/0.9)_45%,transparent_100%)]',
        className,
      )}
    />
  )
}
