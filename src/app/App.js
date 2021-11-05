import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/home/Home'
import { Feature } from '../pages/feature'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/app/*" element={<Feature />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;