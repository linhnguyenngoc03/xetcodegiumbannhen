import { NextApiRequest, NextApiResponse } from "next";
import { CartAndCartItemAndProduct } from "../../../../package/model/cart/cart-and-cartItem-and-product";
import { UseAddCartItemBody } from "../../../../package/model/api/cart/add-cartItem";
import { ResponseBody } from "../../../../package/model/api";
import { UseUpdateCartItemQuantity } from "../../../../package/model/api/cart/update-cartItem";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "POST"
    ? null
    : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
      });
  try {
    const params = req.body as unknown as UseUpdateCartItemQuantity;
    const response = await fetch(
        `http://localhost:8080/api/cartItem/updateCartItems`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartId: 0,
          cartItemId: params.cartItemId,
          productId: 0,
          quantity: params.quantity,
        }),
      }
    );
    if (response.status === 200) {
        res.status(200).json({
          data: null,
          status: "success",
          message: "Cập nhật thành công",
        });
    } else {
        res.status(200).json({
            data: null,
            status: "error",
            message: "Thất bại",
          });
    }
  } catch (error: any) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: "error",
    });
  }
}
