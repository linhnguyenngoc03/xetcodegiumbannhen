import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../package/model/user';
import { UseRegisterBody } from '../../../../package/model/api/auth/register';

export default async function Api(req: NextApiRequest, res: NextApiResponse) {
    req.method == "POST" ? null : res.status(400).json({
        data: null,
        status: "error",
        message: "error",
    })
    try {
        const params = req.body as UseRegisterBody<string>
        const response = await fetch('http://localhost:8080/api/user/createUser', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: params.email,
                phoneNumber: params.phoneNumber,
                address: params.address,
                userName: params.userName,
                userUid: params.auth,
            })
        })
        if (response.ok) {
            const data: User = await response.json()
            res.status(200).json({
                data: data,
                status: "success",
                message: "Đăng ký tài khoản thành công",
            });
        } else {
            res.status(200).json({
                data: null,
                status: "error",
                message: "Đã xảy ra lỗi! Đăng ký không thành công",
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
