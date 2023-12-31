import React, { useEffect, useState } from "react";
import TabsComp from "../../ReusableComp/Tabs/TabsComp";
import CategoryCreate from "../../category/tabs/CategoryCreate";
import { fetchCategories } from "../../../functions/functions.ts";
import CategoryListSettings from "./Category/CategoryListSettings";

const Category = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchCategories(setData);
  }, []);
  const Tabs = [
    {
      name: "Categories",
      comp: <CategoryListSettings data={data} setData={setData} />,
      id: "categories-list",
      active: true
    },
    {
      name: "Add Category",
      comp: <CategoryCreate setData={setData} />,
      id: "add-category"
    },
  ];
  return (
    <div>
      <TabsComp Tabs={Tabs} />
    </div>
  );
};

export default Category;
