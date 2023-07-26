import React, { useContext, useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, TextField, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout1 from "@/component/theme/layout/Layout1";
import { UserContext } from "@/component/auth/AuthContext";
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user";
import { ProductAndCartItem } from "../../../package/model/product/product-and-cartItem";
import { Payment } from "../../../package/model/payment";
import { UseGetPaymentList } from "../../../package/function/payment/use-get-all";
import { UseGetAddressUserUid } from "../../../package/function/address/use-get-user";
import { UseLogin } from "../../../package/function/auth/use-login";
import { User } from "../../../package/model/user";
import { UseCreateOrder } from "../../../package/function/order/create";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { useRouter } from "next/router";
import CheckoutAddress from "@/component/checkout/Address";
import CheckoutCartTable from "@/component/checkout/CheckoutCartTable";
import CheckoutPayment from "@/component/checkout/Payment";
import CheckoutInfor from "@/component/checkout/Infor";
import { auth } from "@/config/firebase";
import { createPaymentUrl } from "../../../package/function/cart/VNPAY";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  let orderList: ProductAndCartItem[] | undefined = [];
  let total: number = 0;
  let paymentList: Payment[] | null = [];
  let addressList: Address[] | null = [];
  let user: User | null = null;
  try {
    if (slug !== undefined) {
      const orderIds = slug[0].split(",");
      const response = await UseGetCartUserUid({ userUid: slug[2] });
      orderList = response.data?.productAndCartItemList.filter(
        (cartItem: ProductAndCartItem) =>
          orderIds.includes(cartItem.cartItemId.toString())
      );
      total = Number.parseInt(slug[1]);
      const response2 = await UseGetAddressUserUid({ userUid: slug[2] });
      addressList = response2.data;
      const response3 = await UseLogin({ userUid: slug[2] });
      user = response3.data;
    }
    const response1 = await UseGetPaymentList();
    paymentList = response1.data;
  } catch (error: any) {
    console.log(error);
  }
  return {
    props: {
      orderList,
      total,
      paymentList,
      addressList,
      user,
    },
  };
};

interface Props {
  orderList: ProductAndCartItem[] | undefined;
  total: number;
  paymentList: Payment[] | null;
  addressList: Address[] | null;
  user: User | null;
}
const Order = ({ orderList, total, paymentList, addressList, user }: Props) => {
  const [selectAddress, setSelectAddress] = useState<Address | null>(null);
  const [selectPayment, setSelectPayment] = useState<Payment | null>(null);
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm();
  const { setOpenLoading, openLoading } = useContext(UserContext);
  const router = useRouter();
  const { vnp_TransactionStatus } = router.query;
  useEffect(() => {
    const handleCreateOrder = async () => {
      try {
        setOpenLoading(true);
        const addressId = localStorage.getItem("addressId");
        const paymentId = localStorage.getItem("paymentId");
        const note = localStorage.getItem("note");
        const data = await UseCreateOrder({
          cartItemsList: orderList,
          deliveryAddressId: Number.parseInt(
            addressId !== null ? addressId : "-1"
          ),
          paymentId: Number.parseInt(paymentId !== null ? paymentId : "-1"),
          totalPayment: total,
          userUid: user?.userUid,
          note: note !== null ? note : "",
        });
        dispatch(
          setOpen({
            open: true,
            message: data.message,
            severity: data.status,
          })
        );
        router.push(`/order/detail/${data.data}`);
      } catch (error: any) {
        dispatch(
          setOpen({
            open: true,
            message: error.message,
            severity: "error",
          })
        );
        router.push(`/cart`);
      } finally {
        setOpenLoading(false);
        
      }
    };

    if (vnp_TransactionStatus !== undefined) {
      if (vnp_TransactionStatus === "00") {
        handleCreateOrder();
      } else {
        router.push("/cart");
      }
    }
  }, [vnp_TransactionStatus]);

  const onSubmit = async (data: any) => {
    if (selectPayment !== null && selectAddress != null) {
      localStorage.setItem("addressId", selectAddress.addressId.toString());
      localStorage.setItem("paymentId", selectPayment.paymentId.toString());
      data.note !== undefined
        ? localStorage.setItem("note", data.note)
        : localStorage.setItem("note", "");
    }
    let url = `#`;
    if (selectPayment?.paymentId === 1) {
      url = createPaymentUrl(total + selectPayment.paymentCost, `http://localhost:3000/${router.asPath}`);
    } else {
      url = `${router.asPath}?vnp_TransactionStatus=00`;
    }
    router.push(url);
  };
  return (
    <Layout1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CheckoutCartTable orderList={orderList} />
            <Paper
              sx={{
                marginTop: "1rem",
                padding: "1rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "700",
                }}
              >
                Lời nhắn
              </Typography>
              <TextField
                sx={{
                  marginTop: "1rem",
                }}
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={2}
                {...register("note", {
                  required: false,
                })}
              />
            </Paper>
            <CheckoutAddress
              selectAddress={selectAddress}
              setSelectAddress={setSelectAddress}
              addressList={addressList}
              userBackend={user}
            />
          </Grid>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "1rem",
              }}
            >
              <CheckoutPayment
                selectPayment={selectPayment}
                setSelectPayment={setSelectPayment}
                paymentList={paymentList}
              />
              <CheckoutInfor
                cost={(selectPayment?.paymentCost || 0)}
                total={total}
                selectAddress={selectAddress}
                selectPayment={selectPayment}
              />
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Layout1>
  );
};

export default Order;
