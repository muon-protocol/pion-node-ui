import { Routes, Route, BrowserRouter } from 'react-router-dom';

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
import { Sidebar } from './components/Basic/Sidebar.tsx';
import { useEffect } from 'react';
import routes, { RoutesInterface } from './routes';

function App() {
  useEffect(() => {
    if (import.meta.env.VITE_PROJECT_NAME === 'ALICE') {
      document.getElementsByTagName('body')[0].className = 'dark alice';
    } else {
      document.getElementsByTagName('body')[0].className = 'pion';
    }
  }, []);

  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    const title = document.querySelector('title');
    if (!link || !title) return;
    if (import.meta.env.VITE_PROJECT_NAME === 'ALICE') {
      link.setAttribute('href', '/alice-favicon.ico');
      title.innerHTML = 'ALICE';
    } else {
      link.setAttribute('href', '/favicon.ico');
      title.innerHTML = 'PION';
    }
  }, []);

  return (
    <div className="app relative overflow-x-hidden max-md:pt-[calc(18*4px)]">
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
                                            {Object.keys(routes).map(
                                              (key: keyof RoutesInterface) => (
                                                <Route
                                                  key={key}
                                                  path={routes[key].path}
                                                  element={routes[key].element}
                                                />
                                              ),
                                            )}
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
