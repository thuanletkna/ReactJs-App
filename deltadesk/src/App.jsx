/* eslint-disable react/jsx-no-undef */
import { useEffect } from 'react';
import './css/style.css';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/home';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Routes>
        <Route exact path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default App
