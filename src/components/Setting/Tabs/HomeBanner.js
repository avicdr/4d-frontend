import React, { useEffect, useState } from "react";
import BannerList from "./Banners/BannerList";
import TabsComp from "../../ReusableComp/Tabs/TabsComp";
import { fetchBanners } from "../../../functions/functions.ts";
import BannerCreate from "./Banners/BannerCreate";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    fetchBanners(setBanners);
  }, []);
  const Tabs = [
    {
      name: "Banners",
      comp: <BannerList data={banners} setData={setBanners} />,
    },
    {
      name: "Add Banner",
      comp: <BannerCreate setData={setBanners} />,
    },
  ];
  return <TabsComp Tabs={Tabs} />;
};
export default HomeBanner;
