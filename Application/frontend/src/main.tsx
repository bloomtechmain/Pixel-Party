import { StrictMode, useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/globals.css';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ExplorePage } from './pages/ExplorePage';
import { EventsPage } from './pages/EventsPage';

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const timer = setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 420);
    return () => clearTimeout(timer);
  }, [hash]);
  return null;
}

const rootElement = document.getElementById('root')!;

const app = (
  <StrictMode>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// Use hydrateRoot when react-snap has pre-rendered content, createRoot otherwise
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
