import React from "react";
import "./App.css";
import Snake from "./components/Snake/Snake";
import Tetris from "./components/Tetris/Tetris";
import { Apps } from "./libs/interfaces";
import { setConstants } from "./libs/сonstants";

const App: React.FC = () => {
  const [app, setApp] = React.useState(Apps.menu);

  const handleSnakeClick = () => setApp(Apps.snake);
  const handleTetrisClick = () => setApp(Apps.tetris);
  const exitToMenu = () => setApp(Apps.menu);
  switch (app) {
    case Apps.snake:
      setConstants(app);
      return <Snake exitToMenu={exitToMenu} />;
    case Apps.tetris:
      setConstants(app);
      return <Tetris exitToMenu={exitToMenu} />;
    case Apps.menu:
      return (
        <div className={"menu "}>
          <button
            className={"menu--item infoBadge"}
            id={"start-tetris"}
            onClick={handleTetrisClick}
          >
            TETRIS
          </button>
          <button
            className={"menu--item infoBadge"}
            id={"start-stake"}
            onClick={handleSnakeClick}
          >
            SNAKE
          </button>
        </div>
      );
  }
};

export default App;
