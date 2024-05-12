import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import HomeSection from './Components/HomeSection/HomeSection';
import WorkoutPlan from './Components/RightSection/WorkoutPlan/WorkoutPlan';
import Authentication from './Components/Authentication/Authentication';

function App() {
  return (
    <div className="">

      <Routes>
        <Route path="/" element={true? <HomePage/> : <Authentication/>}>
          <Route path="/home" element={<HomeSection/>}/>
          <Route path="/workoutplan" element={<WorkoutPlan/>}/>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
