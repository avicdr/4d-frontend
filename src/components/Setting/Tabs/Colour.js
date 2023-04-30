import React, { useEffect, useState } from "react";
import TabsComp from "../../ReusableComp/Tabs/TabsComp";
import ColorList from "./Color/ColorList";
import ColorAdd from "./Color/ColorAdd";
import { fetchColors } from "../../../functions/functions.ts";

const Colour = () => {
  const [colors, setColors] = useState([]);
  useEffect(() => {
    fetchColors(setColors);
  }, []);
  // const [hexColors, setHexColors] = useState([])
  // useEffect(()=>{
  //   fetchHexColors(setHexColors)
  // }, [])

  const Tabs = [
    {
      name: "Color Name",
      comp: <ColorList colors={colors} setColors={setColors} />,
    },
    {
      name: "Add Color Name",
      comp: <ColorAdd setColor={setColors} />,
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
