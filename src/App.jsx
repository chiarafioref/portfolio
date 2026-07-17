import { Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

import './App.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from './Pages/Home'
import Portfolio from './Pages/Portfolio'
import About from './Pages/About'
import Contact from './Pages/Contact'
import NotFound from './Pages/NotFound'
import MainLayout from './layouts/MainLayout'
function App() {


  return (
    <>
      <Routes>
        <Route Component={MainLayout}>

          <Route path="/" Component={Home}>Home</Route>
          <Route path="/Portfolio" Component={Portfolio}>Portfolio</Route>
          <Route path="/About" Component={About}>Chi sono</Route>
          <Route path="/Contact" Component={Contact}>Contatti</Route>
          <Route path="*" Component={NotFound}>404</Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
