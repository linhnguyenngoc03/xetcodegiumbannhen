import { NextApiRequest, NextApiResponse } from "next";
import { UseGetCartUserUidBody } from "../../../../package/model/api/cart/get-user";
import { CartAndCartItemAndProduct } from "../../../../package/model/cart/cart-and-cartItem-and-product";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
    req.method == "GET" ? null : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
    })
    try {
        const params = req.query as unknown as UseGetCartUserUidBody;
        const response = await fetch(
            `http://localhost:8080/api/cart/getCartProductByUserUid?userUid=${params.userUid}`
        );
        if (response.status === 200) {
            const data: CartAndCartItemAndProduct = await response.json();
            res.status(200).json({
                data: data,
                status: "success",
                message: "success",
            });
        } else {
            res.status(200).json({
                data: [],
                status: "error",
                message: "Không tìm thấy",
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
