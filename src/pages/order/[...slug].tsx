import Layout2 from "@/component/theme/layout/Layout2";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { UseLogin } from "../../../package/function/auth/use-login";
import { ResponseBody } from "../../../package/model/api";
import { User } from "../../../package/model/user";
import { UseGetOrderHook } from "../../../package/function/order/get-hook";
import OrderTable from "@/component/order/OrderTable";
import OrderTab from "@/component/order/OrderTab";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  const response = await fetch(
    "http://localhost:8080/all/orderstatus/allOrderStatus"
  );
  const allOrderStatus = await response.json();
  if (slug !== undefined) {
    const user: ResponseBody<User> = await UseLogin({ userUid: slug[0] });
    return {
      props: {
        orderStatus: allOrderStatus,
        user: user.data,
      },
    };
  }
  return {
    props: {
      orderStatus: allOrderStatus,
      user: {},
    },
  };
};

export default function Order({ user, orderStatus }: { user: User, orderStatus : any }) {
  const { data, isLoading, mutate } = UseGetOrderHook({
    userId: user.userId,
  });
  useEffect(() => {
    setInterval(() => {
      mutate()
    }, 60000)
  })
  return (
    <Layout2>
      <OrderTab orderStatusList={orderStatus} data={data?.data}/>
    </Layout2>
  );
}
