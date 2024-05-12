import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import HomeSection from './Components/HomeSection/HomeSection';
import Authentication from './Components/Authentication/Authentication';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomeSection />} />
      </Routes>
    </div>
  );
}

export default App;
