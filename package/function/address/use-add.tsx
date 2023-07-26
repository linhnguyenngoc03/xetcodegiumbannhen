import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseAddNewAddressBody } from "../../model/api/address/add";

export const UseAddNewAddress = async ({ address, userId}: UseAddNewAddressBody) => {
    const url = `/api/address/add-new-address`;
    const props: FetcherProps = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: {
            address: address,
            userId: userId
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
