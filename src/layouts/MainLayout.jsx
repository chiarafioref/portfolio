import { Github, Linkedin } from "react-bootstrap-icons";
import { NavLink, Outlet } from "react-router";
import './App.css'

export default function MainLayout() {

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom border-light py-3 sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-dark fs-4" href="#" style={{ letterSpacing: '-0.5px' }}>
                        {import.meta.env.VITE_NAME}<span className="text-primary">.</span>{import.meta.env.VITE_SURNAME}
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav gap-2 mt-3 mt-lg-0">
                            <li className="nav-link fw-semibold px-3 py-2 rounded-pill text-muted">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-link fw-semibold px-3 py-2 rounded-pill text-muted">
                                <NavLink className="nav-link" to="/About">Profilo</NavLink>
                            </li>
                            <li className="nav-link fw-semibold px-3 py-2 rounded-pill text-muted">
                                <NavLink className="nav-link" to="/Portfolio">Portfolio</NavLink>
                            </li>
                            <li className="nav-link fw-semibold px-3 py-2 rounded-pill text-muted">
                                <NavLink className="nav-link" to="/Contact">Contatti</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />

            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/About">Profilo</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/Portfolio">Portfolio</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/Contact">Contatti</NavLink></li>

                    </ul>

                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <span>© 2026 Chiara Fiore</span>

                        <div className="d-flex align-items-center gap-3">
                            <a href="https://github.com/chiarafioref" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-reset">
                                <Github size={22} />
                            </a>

                            <a href="https://linkedin.com/in/chiara-fiore-277800203/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-reset">
                                <Linkedin size={22} />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    )
}