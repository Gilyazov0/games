import React from "react";
import { GlassManipulations as GM } from "./components/glassManipulations";
import SnakeField from "./components/snakeField";
import "./App.css";
import { setConstants, gameConstants as GC } from "./components/constants";

setConstants("snake");
const Snake: React.FC = () => {
  const [state, SetState] = React.useState();
  return (
    <SnakeField
      glass={{
        rows: GM.getEmptyGlass(GC.rows, GC.cols),
        maxWidth: 400,
        maxHight: 300,
      }}
      pause={false}
      gameOver={false}
      score={1}
      speed={1}
    />
  );
};

export default Snake;
