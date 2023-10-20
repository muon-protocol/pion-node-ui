import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import ReviewDetail from './pages/ReviewDetail';
import ClaimPrize from './pages/ClaimPrize';
import GetStarted from './pages/GetStarted';
import Actions from './pages/Actions';
import Home from './pages/Home';

import Navbar from './components/Common/Navbar.tsx';

import { TransferActionProvider } from './contexts/TransferAction/TransferActionContext.tsx';
import { UpgradeActionProvider } from './contexts/UpgradeAction/UpgradeActionContext.tsx';
import { CreateActionProvider } from './contexts/CreateAction/CreateActionContext.tsx';
import { MergeActionProvider } from './contexts/MergeAction/MergeActionContext.tsx';
import { SplitActionProvider } from './contexts/SplitAction/SplitActionContext.tsx';
import { UserProfileProvider } from './contexts/UserProfile/UserProfileContext.tsx';
import { ClaimPrizeProvider } from './contexts/ClaimPrize/ClaimPrizeContext.tsx';
import { BonALICEProvider } from './contexts/BonALICE/BonALICEContext.tsx';
import { ActionsProvider } from './contexts/Actions/ActionsContext.tsx';
import { Web3Provider } from './contexts/Web3/Web3Context.tsx';
import { ALICEProvider } from './contexts/ALICE/ALICEContext.tsx';
import { Footer } from './components/Common/Footer.tsx';
import { NotificationsProvider } from './contexts/Notifications/NotificationsContext.tsx';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';
import { aliceClient } from './apollo/client.ts';
import { RefreshProvider } from './contexts/Refresh/RefreshContext.tsx';
import { LPTokenProvider } from './contexts/LPToken/LPTokenContext.tsx';
import BuyPION from './pages/BuyPION';
import { Sidebar } from './components/Basic/Sidebar.tsx';

function App() {
  return (
    <div className="app relative">
      <Web3Provider>
        <ApolloProvider client={aliceClient}>
          <RefreshProvider>
            <NotificationsProvider>
              <UserProfileProvider>
                <ALICEProvider>
                  <BonALICEProvider>
                    <LPTokenProvider>
                      <ActionsProvider>
                        <CreateActionProvider>
                          <UpgradeActionProvider>
                            <MergeActionProvider>
                              <SplitActionProvider>
                                <TransferActionProvider>
                                  <ClaimPrizeProvider>
                                    <BrowserRouter>
                                      <Navbar />
                                      <div className={'flex'}>
                                      <Sidebar />
                                        <div className={'w-full'}>
                                      <Routes>
                                        <Route
                                          path="/"
                                          element={
                                            <Navigate to="/pion/getting-started" />
                                          }
                                        />
                                        <Route
                                          path="/pion/getting-started"
                                          element={<Home />}
                                        />
                                        <Route
                                          path="/pion/buy-pion"
                                          element={<BuyPION />}
                                        />
                                        <Route
                                          path="/pion/bonPION/view"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/bonPION/create"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/bonPION/increase"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/bonPION/merge"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/bonPION/split-"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/bonPION/transfer-"
                                          element={<Actions />}
                                        />
                                        <Route
                                          path="/pion/get-started"
                                          element={<GetStarted />}
                                        />
                                        <Route
                                          path="/pion/claim"
                                          element={<ClaimPrize />}
                                        />
                                        <Route
                                          path="/pion/setup-node"
                                          element={<ReviewDetail />}
                                        />
                                      </Routes>
                                        </div>
                                      </div>
                                      <Toaster position="bottom-right" />
                                      <Footer />
                                    </BrowserRouter>
                                  </ClaimPrizeProvider>
                                </TransferActionProvider>
                              </SplitActionProvider>
                            </MergeActionProvider>
                          </UpgradeActionProvider>
                        </CreateActionProvider>
                      </ActionsProvider>
                    </LPTokenProvider>
                  </BonALICEProvider>
                </ALICEProvider>
              </UserProfileProvider>
            </NotificationsProvider>
          </RefreshProvider>
        </ApolloProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
