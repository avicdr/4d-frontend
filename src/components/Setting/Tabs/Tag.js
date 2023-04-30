import React, { useEffect, useState } from "react";
import TagCreate from "../../tag/tabs/TagCreate";
import TabsComp from "../../ReusableComp/Tabs/TabsComp";
import { fetchTags } from "../../../functions/functions.ts";
import TagListSettings from "./Tags/TagListSettings";

const Tag = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetchTags(setTags);
  }, []);
  const Tabs = [
    {
      name: "Tags",
      comp: <TagListSettings data={tags} setData={setTags} />,
    },
    {
      name: "Add Tag",
      comp: <TagCreate setTags={setTags} />,
    },
  ];

  return <TabsComp Tabs={Tabs} />;
};

export default Tag;
