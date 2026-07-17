import { FiletypeHtml, FiletypeCss, FiletypeJsx, Envelope, Download, Laptop, Stars, Gear, Cpu, PhoneVibrate } from "react-bootstrap-icons"

export default function Home() {
    return (
        <>
            <div className="section">

                <h1 className="text-center fw-bold display-4 text-dark mx-auto my-5 col-lg-9" style={{ letterSpacing: '-1px', lineHeight: '1.2' }}>
                    Sviluppo di interfacce web moderne <span className="text-primary">potenziate dall'IA</span>
                </h1>

                <div className="rounded-circle img-thumbnail mx-auto" style={{
                    width: '280px',
                    height: '280px',
                    backgroundImage: 'url("src/assets/me.jpeg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />

                <h4 className="text-center text-muted mt-3">{import.meta.env.VITE_NAME} {import.meta.env.VITE_SURNAME}</h4>
                <h6 className="text-center text-muted mt-1">{import.meta.env.VITE_RESIDENCE}</h6>

                <p className="text-center lead text-muted mt-4 col-lg-8 mx-auto px-3">Sono una Full-Stack Developer specializzata nella creazione di interfacce web moderne, interattive e curate nei minimi dettagli, il mio obiettivo è unire la pulizia del design alla solidità del codice, ottimizzando ogni progetto per garantire un'esperienza fluida e reattiva, con un focus assoluto sui dispositivi mobile.</p>

                <div className="d-flex flex-wrap justify-content-center gap-2 mt-4 col-lg-8 mx-auto px-3">
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        HTML5
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        CSS3
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        JavaScript (ES6+)
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        React
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        Node.js
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        Bootstrap
                    </span>
                    <span className="badge bg-dark-subtle text-dark border border-secondary-subtle px-3 py-2 rounded-pill fw-semibold">
                        Tailwind CSS
                    </span>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold">
                        AI Integration
                    </span>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-4 mt-5 mb-5">

                    <a href="mailto:chiarafioref@gmail.com" className="text-decoration-none text-dark d-inline-flex align-items-center fw-semibold custom-action-link">
                        <div className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle me-2 shadow-sm" style={{ width: '75px', height: '75px' }}>
                            <Envelope size={40} className="text-primary" />
                        </div>
                        Contattami
                    </a>

                    <div className="vr text-muted opacity-50" style={{ height: '70px' }}></div>

                    <a href="/Curriculum_Fiore Chiara.pdf" download className="text-decoration-none text-dark d-inline-flex align-items-center fw-semibold custom-action-link">
                        <div className="d-flex align-items-center justify-content-center bg-success-subtle text-success rounded-circle me-2 shadow-sm" style={{ width: '75px', height: '75px' }}>
                            <Download size={40} className="text-success" />
                        </div>
                        Scarica CV
                    </a>

                </div>

                <div className="container text-center mt-5">
                    <div className="row row-cols-1 row-cols-md-4 g-3">

                        <div className="col">
                            <div className="p-3 border rounded h-100 bg-white shadow-sm">
                                <div className="mb-3">
                                    <Laptop size={40} className="text-primary" />
                                </div>
                                <h6>Front-End Reattivo</h6>
                                <p>Creazione di interfacce moderne, fluide e interattive. Sviluppo in JavaScript e React, sfruttando la flessibilità di Bootstrap e Tailwind per un design pulito.</p>
                            </div>
                        </div>

                        <div className="col">
                            <div className="p-3 border rounded h-100 bg-white shadow-sm">
                                <div className="mb-3">
                                    <Gear size={40} className="text-primary" />
                                </div>
                                <h6>Back-End & Logica</h6>
                                <p>Sviluppo di architetture lato server solide e sicure. Gestione del database, creazione di API efficienti e modellazione dei dati per garantire applicazioni scalabili.</p>
                            </div>
                        </div>

                        <div className="col">
                            <div className="p-3 border rounded h-100 bg-white shadow-sm">
                                <div className="mb-3">
                                    <PhoneVibrate size={40} className="text-primary" />
                                </div>
                                <h6>Mobile-First & Dettagli</h6>
                                <p>Ottimizzazione totale per gli schermi dei cellulari e attenzione maniacale ai dettagli visivi, garantendo applicazioni web veloci, accessibili e scalabili.</p>
                            </div>
                        </div>

                        <div className="col">
                            <div className="p-3 border rounded h-100 bg-white shadow-sm">
                                <div className="mb-3">
                                    <Stars size={40} className="text-primary" />
                                </div>
                                <h6>Intelligenza Artificiale</h6>
                                <p>Integrazione di modelli linguistici e IA generativa all'interno di applicazioni web. Sviluppo di automazioni intelligenti e script per ottimizzare i flussi di lavoro e creare esperienze utente dinamiche.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}