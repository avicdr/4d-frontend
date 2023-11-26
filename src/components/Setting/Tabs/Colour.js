import React, { useEffect, useState } from "react";
import TabsComp from "../../ReusableComp/Tabs/TabsComp";
import ColorList from "./Color/ColorList";
import ColorAdd from "./Color/ColorAdd";
import { fetchColors } from "../../../functions/functions.ts";

const Colour = ({ colors, setColors }) => {
  const Tabs = [
    {
      name: "Color Name",
      comp: <ColorList colors={colors} setColors={setColors} />,
      id: "color-name",
      active: true
    },
    {
      name: "Add Color Name",
      comp: <ColorAdd setColor={setColors} />,
      id: "color-list"
    },
    // {
    //   name: "Color Hex",
    //   comp: <ColorListHex hexColors={hexColors} setHexColors={setHexColors}/>,
    // },
    // {
    //   name: "Add Color Hex",
    //   comp: <ColorAddHex setHexColors={setHexColors}/>,
    // },
  ];
  return <TabsComp Tabs={Tabs} />;
};

export default Colour;
