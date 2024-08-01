import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';

export function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <Header isMobile={isMobile} />
      <Routes>
        <Route path="/" element={<Home isMobile={isMobile} />} />
        <Route
          path="/categories/:categoryName"
          element={<Home isMobile={isMobile} />}
        />
      </Routes>
    </>
  );
}
