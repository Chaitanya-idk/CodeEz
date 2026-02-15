import './App.css'
import { Content } from './components/Content'
import {Routes,Route} from 'react-router'
import { ProblemSet } from './components/ProblemSet'

function App() {
  return (
    
    <Routes>
      <Route index element={<Content />}/>
      <Route path = "problems" element={<ProblemSet/>}/>  
    </Routes>
  )
}

export default App
