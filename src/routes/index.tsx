import strings from '../constants/strings.ts';
import Home from '../pages/Home';
import BuyPION from '../pages/BuyPION';
import Actions from '../pages/Actions';
import ClaimPrize from '../pages/ClaimPrize';
import ReviewDetail from '../pages/ReviewDetail';
// import Migration from '../pages/Migration';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface RouteInterface {
  path: string;
  name: string;
  element: ReactNode;
}

export interface RoutesInterface {
  index: RouteInterface;
  gettingStarted: RouteInterface;
  buyToken: RouteInterface;
  view: RouteInterface;
  create: RouteInterface;
  increase: RouteInterface;
  merge: RouteInterface;
  split: RouteInterface;
  transfer: RouteInterface;
  claim: RouteInterface;
  setupNode: RouteInterface;
  // migration: RouteInterface;
  [key: string]: RouteInterface;
}

const routes: RoutesInterface = {
  index: {
    path: '/',
    name: 'Index',
    element: <Navigate to={`/${strings.projectName}/getting-started`} />,
  },
  gettingStarted: {
    path: `/${strings.projectName}/getting-started`,
    name: 'Getting Started',
    element: <Home />,
  },
  buyToken: {
    path: `/${strings.projectName}/buy-${strings.projectName}`,
    name: `Buy ${strings.token}`,
    element: <BuyPION />,
  },
  view: {
    path: `/${strings.projectName}/bon${strings.token}/view`,
    name: `View ${strings.token}`,
    element: <Actions />,
  },
  create: {
    path: `/${strings.projectName}/bon${strings.token}/create`,
    name: `Create ${strings.token}`,
    element: <Actions />,
  },
  increase: {
    path: `/${strings.projectName}/bon${strings.token}/boost`,
    name: `Boost ${strings.token}`,
    element: <Actions />,
  },
  merge: {
    path: `/${strings.projectName}/bon${strings.token}/merge`,
    name: `Merge ${strings.token}`,
    element: <Actions />,
  },
  split: {
    path: `/${strings.projectName}/bon${strings.token}/split-`,
    name: `Split ${strings.token}`,
    element: <Actions />,
  },
  transfer: {
    path: `/${strings.projectName}/bon${strings.token}/transfer-`,
    name: `Transfer ${strings.token}`,
    element: <Actions />,
  },
  claim: {
    path: `/${strings.projectName}/claim`,
    name: `Claim Prize`,
    element: <ClaimPrize />,
  },
  setupNode: {
    path: `/${strings.projectName}/setup-node`,
    name: `Setup Node`,
    element: <ReviewDetail />,
  },
  // migration: {
  //   path: `/${strings.projectName}/migration`,
  //   name: `Migration`,
  //   element: <Migration />,
  // },
};

export default routes;
