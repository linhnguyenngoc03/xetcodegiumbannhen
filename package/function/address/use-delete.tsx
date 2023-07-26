import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseDeleteAddressBody } from "../../model/api/address/detele";

export const UseDeleteAddress = async ({ addressId }: UseDeleteAddressBody) => {
    const url = `/api/address/delete-address?addressId=${addressId}`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const data : ResponseBody<String> = await fetcher(url, props)
    return data

};
