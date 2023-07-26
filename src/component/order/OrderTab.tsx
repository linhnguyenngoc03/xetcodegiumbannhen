import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import OrderTabItem from "./OrderTabItem";
import { OrderAndOrderItem, OrderStatus } from "../../../package/model/order";

const StyledTab = styled(Tab)({
  fontWeight: 1000,
  color: "black",
  width: "20%",
});


export default function OrderTab({ orderStatusList, data }: {
  orderStatusList : OrderStatus[],
  data: OrderAndOrderItem[] | null | undefined
}) {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
        <Paper>
          <TabList onChange={handleChange}>
            {orderStatusList.map((item: any, key: number) => (
              <StyledTab
                label={item.status}
                value={item.statusId.toString()}
                key={key}
              />
            ))}
          </TabList>
        </Paper>
        {orderStatusList.map((item: any, index : number) => (
          <OrderTabItem value={item.statusId.toString()} key={index} order={data}/>
        ))}
      </TabContext>
    </>
  );
}

