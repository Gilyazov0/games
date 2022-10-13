import React from "react";
import LifeField from "./LifeField";
import { LifeManipulations as GM } from "../../libs/life/lifeManipulations";
import { gamesParameters } from "../../libs/gamesParameters";
import { LifeGameParameters } from "../../dataTypes/lifeDataTypes";

const Life: React.FC<{ exitToMenu: Function }> = (props) => {
  const GP = gamesParameters as LifeGameParameters;

  return (
    <LifeField
      score={0}
      field={{
        rows: GM.getPopulatedField(GP.rows, GP.cols, 0.5),
        maxHight: 800,
        maxWidth: 1000,
      }}
      gameOver={false}
      pause={false}
      speed={1}
      exitToMenu={props.exitToMenu}
    />
  );
};

export default Life;
