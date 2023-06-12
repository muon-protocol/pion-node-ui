import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Actions from './pages/Actions';

import Navbar from './components/Common/Navbar.tsx';

import { ActionsProvider } from './contexts/Actions/ActionsContext.tsx';
import { UpgradeActionProvider } from './contexts/UpgradeAction/UpgradeActionContext.tsx';
import { MergeActionProvider } from './contexts/MergeAction/MergeActionContext.tsx';
import { SplitActionProvider } from './contexts/SplitAction/SplitActionContext.tsx';
import { TransferActionProvider } from './contexts/TransferAction/TransferActionContext.tsx';
import GetStarted from './pages/GetStarted';

function App() {
  return (
    <div className="app">
      <ActionsProvider>
        <UpgradeActionProvider>
          <MergeActionProvider>
            <SplitActionProvider>
              <TransferActionProvider>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Actions />} />
                    <Route path="/get-started" element={<GetStarted />} />
                  </Routes>
                </BrowserRouter>
              </TransferActionProvider>
            </SplitActionProvider>
          </MergeActionProvider>
        </UpgradeActionProvider>
      </ActionsProvider>
    </div>
  );
}

export default App;
