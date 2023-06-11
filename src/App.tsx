import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Actions from './pages/Actions';

import Navbar from './components/Common/Navbar.tsx';

import { ActionsProvider } from './contexts/Actions/ActionsContext.tsx';
import { UpgradeActionProvider } from './contexts/UpgradeAction/UpgradeActionContext.tsx';

function App() {
  return (
    <div className="app">
      <ActionsProvider>
        <UpgradeActionProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Actions />} />
            </Routes>
          </BrowserRouter>
        </UpgradeActionProvider>
      </ActionsProvider>
    </div>
  );
}

export default App;
