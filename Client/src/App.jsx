import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListMedia from './components/ListMedia';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateMediaComponent from './components/CreateMediaComponent';
import UpdateMedia from './components/UpdateMedia';
import LoginPage from './components/loginPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          
          <Route path='/' element={<ListMedia />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/save" element={<CreateMediaComponent />} />
          <Route path="/update/:id" element={<UpdateMedia />} />
          <Route path="/allmedia" element={<ListMedia />} />
          <Route path="/createpost" element={<CreateMediaComponent />} />
          
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
