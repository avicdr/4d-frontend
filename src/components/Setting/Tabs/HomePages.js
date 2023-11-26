import React, {useState, useEffect} from 'react'
import TabsComp from '../../ReusableComp/Tabs/TabsComp';
import Positions from './Positions';
import CustomCategoryCreate from './CustomCategory/CustomCategoryCreate';
import CustomCategoryUpdate from './CustomCategory/CustomCategoryUpdate';
import { fetchCustomCategories } from '../../../functions/functions.ts';
const HomePages = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchCustomCategories(setData);
  }, []);
  const Tabs = [
    {
      name: "Change Positions",
      comp: <Positions/>,
      id:"change-positions",
      active: true
    },
    {
      name: "Create Custom Category",
      comp: <CustomCategoryCreate setCustomCategories={setData}/>,
      id: "create-custom-category"
    },
    {
      name: "Update Custom Category",
      comp: <CustomCategoryUpdate data={data} />,
      id: "update-custom"
    },
  ];
  return (<TabsComp Tabs={Tabs} />);
}

export default HomePages