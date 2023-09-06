import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar'
import { useLocation } from "react-router-dom";
import Form from './components/Form/Form.jsx'
import axios from 'axios'
axios.defaults.baseURL = 'https://dogsappback.onrender.com'


function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/home' && <NavBar />}
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail />} />
        <Route exact path='/create' element={<Form />}></Route>
      </Routes>
    </div>
  );
}

export default App;
