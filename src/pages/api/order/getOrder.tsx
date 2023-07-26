import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../../package/model/product";
import { UseSearchProductNameBody } from "../../../../package/model/api/product/search-name";
import { UseGetOrderBody } from "../../../../package/model/order/get";
import { OrderAndOrderItem } from "../../../../package/model/order";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "GET" ? null : res.status(400).json({
    data: null,
    status: "error",
    message: "error",
  })
  try {
    const params = req.query as unknown as UseGetOrderBody;
    const response = await fetch(
      `http://localhost:8080/api/order/getOrderAndOrderItemByUserId?userId=${params.userId}`
    );
    if (response.status === 200) {
      const data: OrderAndOrderItem = await response.json();
      res.status(200).json({
        data: data,
        status: "success",
        message: "Thành công",
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
