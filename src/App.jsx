import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guests from "./pages/Guests";
import Meals from "./pages/Meals";



function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Guests/>} />
      <Route path="/meals" element={<Meals/>} /> {/* setting up new route para sa meals*/}
      
    </Routes>
  </BrowserRouter>
);
}


export default App;