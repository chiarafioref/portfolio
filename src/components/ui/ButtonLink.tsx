import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn.ts'
import ButtonShine from './ButtonShine.tsx'
import { buttonBase, buttonVariants } from './buttonStyles.ts'

type ButtonLinkProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  /** Rotta interna (React Router). Se assente si usa un normale <a href>. */
  to?: string
  href?: string
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>

/** Bottone-link con bagliore e "shine" al passaggio del mouse. */
export default function ButtonLink({
  children,
  variant = 'primary',
  to,
  href,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(buttonBase, buttonVariants[variant], className)
  const content = (
    <>
      {variant === 'primary' && <ButtonShine />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  )
}
