import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guests from "./pages/Guests";



function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Guests/>} />
      
    </Routes>
  </BrowserRouter>
);
}


export default App;