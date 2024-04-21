import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListWorkOutComponent from './components/WorkoutList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateWorkOutComponent from './components/AddWorkout';
import UpdateWorkOut from './components/UpdateWorkout';
import AddTemplate from './components/AddTemplate';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element={<ListWorkOutComponent />} />
          <Route path="/save" element={<CreateWorkOutComponent />} />
          <Route path="/update/:id" element={<UpdateWorkOut />} />
          <Route path="/tm" element={<AddTemplate />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
