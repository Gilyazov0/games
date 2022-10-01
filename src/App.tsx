import React from "react";
import "./App.css";
import Snake from "./components/Snake/Snake";
import Tetris from "./components/Tetris/Tetris";
import { Apps } from "./dataTypes/gameDataTypes";
import { setParameters } from "./libs/gamesParameters";

const App: React.FC = () => {
  const [app, setApp] = React.useState(Apps.menu);

  const handleSnakeClick = () => setApp(Apps.snake);
  const handleTetrisClick = () => setApp(Apps.tetris);
  const exitToMenu = () => setApp(Apps.menu);

  switch (app) {
    case Apps.snake:
      setParameters(app);
      document.title = "SNAKE";
      return <Snake exitToMenu={exitToMenu} />;
    case Apps.tetris:
      document.title = "TETRIS";
      setParameters(app);
      return <Tetris exitToMenu={exitToMenu} />;
    case Apps.menu:
      document.title = "MENU";
      return (
        <div className={"menu "}>
          <button
            className={"menu--item infoBadge"}
            id={"start-tetris"}
            onClick={handleTetrisClick}
          >
            T E T R I S
          </button>
          <button
            className={"menu--item infoBadge"}
            id={"start-stake"}
            onClick={handleSnakeClick}
          >
            S N A K E
          </button>
        </div>
      );
  }
};

export default App;
