import { FetcherProps, fetcher } from "../../fetcher";
import { Payment } from "../../model/payment";
import { ResponseBody } from "../../model/api";

export const UseGetPaymentList = async () => {
    const url = `http://localhost:3000/api/payment`;
    const props: FetcherProps = {
        method: "GET",
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const response : ResponseBody<Payment[]> = await fetcher(url, props);
    return response
};
