import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';

import Navbar from './components/Common/Navbar.tsx';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
