import './App.css'
import { Content } from './components/Content'
import {Routes,Route} from 'react-router'

function App() {
  return (
    
    <Routes>
      <Route index element={<Content />}/>
      
    </Routes>
  )
}

export default App
