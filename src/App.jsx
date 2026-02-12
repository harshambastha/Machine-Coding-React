import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppPage from './pages/AppPage';

import './index.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/:appId" element={<AppPage />} />
    </Routes>
  )
}

export default App
