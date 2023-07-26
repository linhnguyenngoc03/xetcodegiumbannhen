import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { setup } from "@/config/setup";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import UrlImage from "../theme/image/Image1";
import LoadingIconButton from "../theme/button/LoadingIconButton";
import { CartAndCartItemAndProduct } from "../../../package/model/cart/cart-and-cartItem-and-product";
import { UseAddToCart } from "../../../package/function/cart/use-add-cartItem";
import { Product } from "../../../package/model/product";
import { UserContext } from "../auth/AuthContext";
import { ResponseBody } from "../../../package/model/api";
import { auth } from "@/config/firebase";

const formatNumber = (number: number) => {
  if (number !== undefined) {
    return number.toLocaleString("en-US");
  }
};

interface Props {
  product: Product
}

export default function ProductCard({product}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { cart } = React.useContext(UserContext)
  const dispatch = useAppDispatch();
  const handleAddtoCart = async () => {
    if (auth.currentUser === null) {
      dispatch(
        setOpen({
          open: true,
          message: "You must login to buy",
          severity: "error",
        })
      );
    } else {
      try {
        setIsLoading(true)
        const response : ResponseBody<CartAndCartItemAndProduct> = await UseAddToCart({
          productId: product?.productId,
          cartId: cart?.cart.cartId,
          auth: auth.currentUser?.uid
        })
        dispatch(
          setOpen({
            open: true,
            message: response.message,
            severity: response.status,
          })
        );
      } catch (error: any) {
        dispatch(
          setOpen({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
      } finally {
        setIsLoading(false)
      }
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "1rem",
        // boxShadow: "none",
      }}
    >
      <UrlImage
        height="16rem"
        url={`/product/${product.productName}`}
        img={`/assets/images/${product.image}`}
      />
      <div
        style={{
          padding: "1rem 1rem 0.5rem 1rem",
        }}
      >
        <Typography
          variant="body1"
          noWrap
          sx={{
            overflow: "hidden",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          {product.productName}
        </Typography>
        <Typography
          sx={{
            color: product.quantity > 0 ? setup.success : setup.error,
          }}
        >
          {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
        </Typography>
        <CardActions
          sx={{
            padding: 0,
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#e10404",
              fontWeight: 600,
            }}
          >
            {formatNumber(product.price)} VND
          </Typography>
          <LoadingIconButton
            loading={isLoading}
            size="large"
            onClick={handleAddtoCart}
          >
            <AddShoppingCartIcon />
          </LoadingIconButton>
        </CardActions>
      </div>
    </Card>
  );
}

