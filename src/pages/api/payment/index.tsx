import { NextApiRequest, NextApiResponse } from "next";
import { Payment } from "../../../../package/model/payment";

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
    req.method == "GET" ? null : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
    })
    try {
        const response = await fetch(
            "http://localhost:8080/api/payment/allPayment"
        );
        if (response.status === 200) {
            const data: Payment[] = await response.json();
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
