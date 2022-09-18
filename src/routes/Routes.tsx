import { Route, Routes } from "react-router-dom";
import Games from "../pages/Games/Games";
import MainPage from "../pages/Main/MainPage";
import GamesList from "../games/GamesList/GamesList";
const routes = {
  node: { virtual: true, path: "" },
  children: [
    {
      node: { path: "/", component: <MainPage /> },
    },
    {
      node: { path: "/games", component: <Games /> },
      children: [{ node: {path: "/:gameId", component: <GamesList />} }],
    },
  ],
};
let treeRoutes = [];
(function makeTreeRoutes(routes, parrentRoutePath) {
  if (routes.children) {
     routes.children.forEach((route) => makeTreeRoutes(route, routes.node.path));
  } 
  if (!routes?.node?.virtual) {
    treeRoutes.push(<Route
      key={`${parrentRoutePath}${routes.node.path}`}
      path={`${parrentRoutePath}${routes.node.path}`}
      element={routes.node.component}
    />)
  }
  
})(routes, "")

function RouterComponent() {
return (
  <Routes>
{treeRoutes}
</Routes>
)
//   <Routes>
//   <Route path="/" element={<MainPage />} />
//   <Route path="/:gameId" element={<GamesList />}></Route>
//   <Route path="/games" element={<Games />}></Route>
// </Routes>
}

export default RouterComponent;
