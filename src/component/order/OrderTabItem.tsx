import React from "react";
import { OrderAndOrderItem } from "../../../package/model/order";
import { TabPanel } from "@mui/lab";
import OrderTable from "./OrderTable";
import { useRouter } from "next/router";
import OrderAdminTable from "../admin-component/order/orderTable";

const OrderTabItem = ({
  value,
  order,
}: {
  value: string;
  order: OrderAndOrderItem[] | null | undefined;
}) => {
  const router = useRouter()
  const filterOrder = order?.filter(
    (orderAndOrderItem) =>
      orderAndOrderItem.orderStatus.statusId === Number.parseInt(value)
  );
  return (
    <TabPanel
      value={value}
      sx={{
        padding: "3rem 0rem",
      }}
    >
      {router.asPath.indexOf("admin") === -1 ? <OrderTable order={filterOrder?.reverse()} /> : <OrderAdminTable order={filterOrder?.reverse()}/>}
    </TabPanel>
  );
};

export default OrderTabItem;
