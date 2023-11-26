import React, { useState, useEffect } from "react";
import Ads from "./Tabs/Ads";
import Category from "./Tabs/Category";
import Tag from "./Tabs/Tag";
import Colour from "./Tabs/Colour";
import HomeBanner from "./Tabs/HomeBanner";
import Unlisted4K from "./Tabs/Unlisted4K";
import Unlisted4D from "./Tabs/Unlisted4D";
import UnlistedLive from "./Tabs/UnlistedLive";
import BaseUrl from "./Tabs/BaseUrl";
import HomePages from "./Tabs/HomePages";
import TabsComp from "../ReusableComp/Tabs/TabsComp";
import { ToastContainer } from "react-toastify";
import { fetchColors } from "../../functions/functions";

const Setting = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchColors(setColors);
  }, []);

  const Tabs = [
    {
      name: "Ads",
      comp: <Ads />,
      id: "ads"
    },
    {
      name: "Category",
      comp: <Category />,
      id: "categories-list",
    },
    {
      name: "Tag",
      comp: <Tag />,
      id: "tag-list"
    },
    {
      name: "Colour",
      comp: <Colour colors={colors} setColors={setColors}/>,
      id: "color-name"
    },
    {
      name: "Home Banners",
      comp: <HomeBanner />,
      id: "home-banners"
    },
    {
      name: "Home Pages",
      comp: <HomePages />,
      id: "change-positions"
    },
    {
      name: "4D Unlisted",
      comp: <Unlisted4D setColors={setColors}/>,
      id: "4d-unlisted"
    },
    {
      name: "4K Unlisted",
      comp: <Unlisted4K setColors={setColors}/>,
      id: "4k-unlisted"
    },
    {
      name: "Live Unlisted",
      comp: <UnlistedLive setColors={setColors}/>,
      id: "live-unlisted"
    },
    {
      name: "Base Url",
      comp: <BaseUrl />,
      id: "base-url"
    },
  ];

  const userRole = localStorage.getItem('role');

  const renderTabs = () => {
    if (userRole === "admin") {
      return Tabs
    } else {
      return Tabs.filter(tab => tab.name !== "Base Url" && tab.name !== "Ads");
    }
  }

  return (
    <div className="content-wrapper">
      <ToastContainer />
      <div className="row">
        <TabsComp Tabs={renderTabs()} type = {"main"} />
      </div>
    </div>
  );
};

export default Setting;
