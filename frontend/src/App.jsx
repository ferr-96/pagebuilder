import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuilderPage from './builder/BuilderPage';
import PreviewPage from './preview/PreviewPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
