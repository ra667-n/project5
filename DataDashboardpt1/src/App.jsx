import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Ghibli from './Ghibli';
import FilmDetail from './FilmDetail';
import  './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Ghibli />} />
          <Route path="/films/:id" element={<FilmDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
