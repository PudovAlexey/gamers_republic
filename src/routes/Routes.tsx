import { Route, Routes } from 'react-router-dom';
import Games from '../pages/Games/Games';
import MainPage from '../pages/Main/MainPage';
import GamesList from '../games/GamesList/GamesList';
import LoginPage from '../pages/LoginPage/LoginPage';
import { ERoutes } from '.';
type RouteEl = {
  path?: string;
  virtual?: boolean;
  component?: JSX.Element;
};
type RouteTree = {
  node: RouteEl;
  children?: RouteTree[];
};
const routes: RouteTree = {
  node: { virtual: true, path: '' },
  children: [
    {
      node: { path: ERoutes.Home, component: <MainPage /> },
    },
    {
      node: { path: ERoutes.Login, component: <LoginPage /> },
    },
    {
      node: { path: ERoutes.Records, component: <div>{'records'}</div> },
    },
    {
      node: { path: ERoutes.Registration, component: <div>{'records'}</div> },
    },
    {
      node: { path: ERoutes.Games, component: <Games /> },
      children: [
        {
          node: {
            path: '/:gameId',
            component: <GamesList />,
          },
        },
      ],
    },
  ],
};
let treeRoutes = [];
(function makeTreeRoutes(routes: RouteTree, parrentRoutePath: string) {
  if (routes.children) {
    routes.children.forEach((route) => makeTreeRoutes(route, routes.node.path));
  }
  if (!routes?.node?.virtual) {
    treeRoutes.push(
      <Route
        key={`${parrentRoutePath}${routes.node.path}`}
        path={`${parrentRoutePath}${routes.node.path}`}
        element={routes.node.component}
      />
    );
  }
})(routes, '');

function RouterComponent() {
  return <Routes>{treeRoutes}</Routes>;
}

export default RouterComponent;
