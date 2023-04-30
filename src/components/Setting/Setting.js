import React from "react";
import Ads from "./Tabs/Ads";
import Sorting from "./Tabs/Sorting";
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

const Setting = () => {
  const Tabs = [
    {
      name: "Ads",
      comp: <Ads />,
    },
    {
      name: "Sorting",
      comp: <Sorting />,
    },
    {
      name: "Category",
      comp: <Category />,
      id: "category",
    },
    {
      name: "Tag",
      comp: <Tag />,
    },
    {
      name: "Colour",
      comp: <Colour />,
    },
    {
      name: "Home Banners",
      comp: <HomeBanner />,
    },
    {
      name: "Home Pages",
      comp: <HomePages />,
    },
    {
      name: "4D Unlisted",
      comp: <Unlisted4D />,
    },
    {
      name: "4K Unlisted",
      comp: <Unlisted4K />,
    },
    {
      name: "Live Unlisted",
      comp: <UnlistedLive />,
    },
    {
      name: "Base Url",
      comp: <BaseUrl />,
    },
  ];
  return (
    <div className="content-wrapper">
      <ToastContainer/>
      <div className="row">
        {/* <div className="col-md-12"> */}
          <TabsComp Tabs={Tabs} />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Setting;
