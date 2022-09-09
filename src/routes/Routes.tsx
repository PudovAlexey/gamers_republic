import { Route, Routes } from "react-router-dom";
import Games from "../pages/Games/Games";
import MainPage from "../pages/Main/MainPage";
import GamesList from "../games/GamesList/GamesList";
const routes = {
  node: { virtual: true },
  children: [
    {
        node: {path: "/", component: <MainPage/>}
    },
    {
      node: { path: "/games", component: <Games /> },
      children: [{ node: "/:game" }],
    },
  ],
};
function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:gameId" element={<GamesList />}></Route>
      <Route path="/games" element={<Games />}></Route>
    </Routes>
  );
}

export default RouterComponent;
