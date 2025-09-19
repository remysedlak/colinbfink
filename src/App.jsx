import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Contact from './pages/Contact';
import Films from './pages/Films';
import FilmPage from './components/FilmPage';
import Resume from './pages/Resume';
import Footer from './components/Footer';
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="h-dvh flex flex-col">
      <NavBar />
      <div className='overflow-auto flex-2'>
        <div className="min-h-full flex flex-col">
          <div className="flex-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/films" element={<Films />} />
                <Route path="/films/:title" element={<FilmPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
