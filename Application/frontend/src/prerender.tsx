import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { StrictMode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ExplorePage } from './pages/ExplorePage';
import { EventsPage } from './pages/EventsPage';

export async function prerender(data: { url?: string }) {
  const url = data?.url ?? '/';

  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  );

  return {
    html,
    links: new Set(['/contact', '/explore', '/events']),
  };
}
