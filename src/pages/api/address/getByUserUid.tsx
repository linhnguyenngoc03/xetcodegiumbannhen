import { NextApiRequest, NextApiResponse } from "next";
import { UseGetAddressUserUidBody } from "../../../../package/model/api/address/get-user";
import { UseLogin } from "../../../../package/function/auth/use-login";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
  req.method == "GET" ? null : res.status(400).json({
    data: null,
    status: "error",
    message: "error",
  })
  try {
    const params = req.query as unknown as UseGetAddressUserUidBody;
    const response = await fetch(
        `http://localhost:8080/api/address/getAddressByUserUid?userUid=${params.userUid}`
    );
    if (response.status === 200) {
      const data: Address[] = await response.json();
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
