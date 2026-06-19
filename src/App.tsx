import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SummonsPage } from './pages/SummonsPage';
import { GeneratorPage } from './pages/GeneratorPage';

const basename = import.meta.env.PROD ? '/registry' : '';

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<SummonsPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
