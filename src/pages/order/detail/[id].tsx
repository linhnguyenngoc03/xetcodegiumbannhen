import CheckoutCartTable from "@/component/checkout/CheckoutCartTable";
import OrderViewTable from "@/component/order/OrderViewTable";
import { StyledButton } from "@/component/theme/button/StyledButton";
import Layout1 from "@/component/theme/layout/Layout1";
import { setup } from "@/config/setup";
import { Button, Dialog, Grid, Paper, Typography, styled } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useContext } from "react";
import { UseGetOrderItemHook } from "../../../../package/function/order/get-item-hook";
import StyledLink from "@/component/theme/navLink/Link";
import { UserContext } from "@/component/auth/AuthContext";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { useRouter } from "next/router";

const StyledText = styled(Typography)({
  fontWeight: 700,
  margin: "0.5rem 0rem",
  fontSize: "1.1rem",
});
export const orderColor = (statusId: number) => {
  if (statusId === 1) {
    return "#878787";
  } else if (statusId === 2) {
    return "#0047FF";
  } else if (statusId === 3) {
    return "orange";
  } else if (statusId === 4) {
    return "#5BB700";
  } else if (statusId === 5) {
    return "#B70000";
  }
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const orderId = params?.id as string;
  return {
    props: {
      orderId: Number.parseInt(orderId),
    },
  };
}

const orderId = ({ orderId }: { orderId: number }) => {
  const { data, isLoading, error, mutate } = UseGetOrderItemHook({ orderId });
  const { setOpenLoading } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleCancel = async () => {
    try {
      setOpenLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/order/cancelOrder?orderId=${orderId}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        dispatch(
          setOpen({
            message: "Hủy đơn thành công",
            severity: "success",
            open: true,
          })
        );
      } else {
        dispatch(
          setOpen({
            message: "Hủy đơn thất bại",
            severity: "error",
            open: true,
          })
        );
      }
    } catch (error: any) {
      dispatch(
        setOpen({
          message: error.message,
          severity: "error",
          open: true,
        })
      );
    } finally {
      await mutate();
      setOpenLoading(false);
    }
  };
  return (
    <Layout1>
      {data !== undefined && data.data !== null ? (
        <>
          <Paper
            sx={{
              padding: "1rem 4rem 1rem",
              marginBottom: "2rem",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={3.5}>
                <StyledText
                  sx={{
                    color: setup.border,
                    fontSize: "1.3rem",
                  }}
                >
                  Thông tin giao hàng
                </StyledText>
                <StyledText>{data.data?.user.userName}</StyledText>
                <StyledText>{data.data?.user.phoneNumber}</StyledText>
              </Grid>
              <Grid item xs={6}>
                <StyledText
                  sx={{
                    marginTop: "1rem",
                  }}
                >
                  {data.data?.orderDate}
                </StyledText>
                <Typography>{data.data?.delivery.address}</Typography>
              </Grid>
            </Grid>
          </Paper>
          <OrderViewTable
            orderList={data.data?.productAndOrderItemList}
            payment={data.data?.payment}
            total={data.data?.totalPayment}
          />
          <Paper
            sx={{
              padding: "1rem 4rem 1rem",
              marginBottom: "2rem",
              marginTop: "2rem",
              display: data.data.note !== "" ? "block" : "none"
            }}
          >
            <StyledText
              sx={{
                color: setup.border,
                fontSize: "1.3rem",
              }}
            >
              Lời nhắn
            </StyledText>
            <StyledText>{data.data.note}</StyledText>
          </Paper>
          <Paper
            sx={{
              padding: "1rem 4rem 1rem",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <StyledText>
                Tình trạng đơn hàng:
                <span
                  style={{
                    marginLeft: "6rem",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    marginRight: "2.5rem",
                    color: orderColor(data.data?.orderStatus.statusId),
                  }}
                >
                  {data.data?.orderStatus.status}
                </span>
              </StyledText>
              <Button
                sx={{
                  color: "white",
                  boxShadow: "0px 0px 0px black",
                  fontWeight: 600,
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                  display:
                    data.data.orderStatus.statusId !== 1 ? "none" : "block",
                }}
                onClick={handleCancel}
                variant="contained"
              >
                Hủy đơn
              </Button>
            </div>
          </Paper>
          <StyledLink href={`/order/${data?.data?.user.userUid}`}>
            <StyledText>Back</StyledText>
          </StyledLink>
        </>
      ) : (
        <Dialog open={true}></Dialog>
      )}
    </Layout1>
  );
};

export default orderId;
