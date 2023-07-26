import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseCreateOrderBody } from "../../model/api/order/createBody";


export const UseCreateOrder = async ({ cartItemsList, deliveryAddressId, paymentId, totalPayment, userUid, note }: UseCreateOrderBody) => {
    const url = `http://localhost:3000/api/order/createOrder`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: {
            cartItemsList,
            deliveryAddressId,
            paymentId,
            totalPayment,
            userUid,
            note
        },
        options: {
            next: {
                revalidate: 60,
            },
        },
    };
    const data: ResponseBody<null> = await fetcher(
        url,
        props
    );
    return data;
};
