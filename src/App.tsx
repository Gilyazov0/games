import React from "react";
import "./App.css";
import Snake from "./components/Snake/Snake";
import Tetris from "./components/Tetris/Tetris";
import { Apps } from "./dataTypes/gameDataTypes";
import { setParameters } from "./libs/gamesParameters";
import Life from "./components/Life/Life";

const App: React.FC = () => {
  const [app, setApp] = React.useState(Apps.menu);

  const handleSnakeClick = () => setApp(Apps.snake);
  const handleTetrisClick = () => setApp(Apps.tetris);
  const handleLifeClick = () => setApp(Apps.life);
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
    case Apps.life:
      document.title = "GAME OF LIFE";
      setParameters(app);
      return <Life exitToMenu={exitToMenu} />;

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
          <button
            className={"menu--item infoBadge"}
            id={"start-stake"}
            onClick={handleLifeClick}
          >
            GAME OF LIFE
          </button>
        </div>
      );
  }
};

export default App;
