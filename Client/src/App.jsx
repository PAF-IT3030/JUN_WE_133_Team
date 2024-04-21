import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import MealList from './components/MealList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateMeal from './components/UpdateMeal';
import CreateMeal from './components/CreateMeal';
import CreateTool from './components/CreateTool';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<MealList />} />
          <Route path="/save" element={<CreateMeal />} />
          <Route path="/update/:id" element={<UpdateMeal />} />
          <Route path="/yt" element={<CreateTool />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
