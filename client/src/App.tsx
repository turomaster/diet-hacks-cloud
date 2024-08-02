import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import './App.css';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';

export function App() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

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
      <Routes>
        <Route path="/" element={<Header isMobile={isMobile} />}>
          <Route index element={<Home isMobile={isMobile} />} />
        </Route>
      </Routes>
    </>
  );
}
