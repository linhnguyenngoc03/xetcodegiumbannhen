import { NextApiRequest, NextApiResponse } from "next";
import { UseAddNewAddressBody } from "../../../../package/model/api/address/add";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "POST"
    ? null
    : res.status(400).json({
      data: null,
      status: "error",
      message: "error",
    });
  try {
    const params = req.body as unknown as UseAddNewAddressBody;
    const response = await fetch("http://localhost:8080/api/address/createAddress", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            "address": params.address,
            "addressId": 0,
            "dateCreate": "",
            "dateUpdate": "",
            "userId": params.userId
          })
    })
    if (response.status === 200) {
      res.status(200).json({
        data: null,
        status: "success",
        message: "Thêm mới địa chỉ thành công",
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
