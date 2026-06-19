import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SummonsPage } from './pages/SummonsPage';
import { GeneratorPage } from './pages/GeneratorPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SummonsPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
