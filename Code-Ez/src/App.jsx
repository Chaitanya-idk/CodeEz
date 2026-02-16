import './App.css'
import { useState, useEffect } from 'react'
import { Content } from './components/Content'
import {Routes,Route} from 'react-router'
import { ProblemSet } from './components/ProblemSet'
import { Solving } from './components/Solving'
import { Header } from './components/Header'

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? "dark-theme" : "light-theme";
  }, [isDark]);

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route index element={<Content isDark={isDark} />}/>
        <Route path = "problems" element={<ProblemSet isDark={isDark} />}/>
        <Route path = "problems/:id" element={<Solving isDark={isDark} />}/>
      </Routes>
    </>
  )
}

export default App
