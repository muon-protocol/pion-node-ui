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
import ClaimPrize from './pages/ClaimPrize';
import { ClaimPrizeProvider } from './contexts/ClaimPrize/ClaimPrizeContext.tsx';
import ReviewDetail from './pages/ReviewDetail';
import { Web3Provider } from './contexts/Web3/Web3Context.tsx';

function App() {
  return (
    <div className="app">
      <Web3Provider>
        <ActionsProvider>
          <UpgradeActionProvider>
            <MergeActionProvider>
              <SplitActionProvider>
                <TransferActionProvider>
                  <ClaimPrizeProvider>
                    <BrowserRouter>
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Actions />} />
                        <Route path="/get-started" element={<GetStarted />} />
                        <Route path="/claim" element={<ClaimPrize />} />
                        <Route path="/review" element={<ReviewDetail />} />
                      </Routes>
                    </BrowserRouter>
                  </ClaimPrizeProvider>
                </TransferActionProvider>
              </SplitActionProvider>
            </MergeActionProvider>
          </UpgradeActionProvider>
        </ActionsProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
