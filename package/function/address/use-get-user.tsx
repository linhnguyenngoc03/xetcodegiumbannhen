import { FetcherProps, fetcher } from "../../fetcher";
import { ResponseBody } from "../../model/api";
import { UseGetAddressUserUidBody } from "../../model/api/address/get-user";

export const UseGetAddressUserUid = async ({ userUid } : UseGetAddressUserUidBody) => {
    const url = `http://localhost:3000/api/address/getByUserUid?userUid=${userUid}`;
    const props: FetcherProps = {
        method: "GET",
        options: {
            next: {
                revalidate: 60,
            }
        },
    };
    const response : ResponseBody<Address[]> = await fetcher(url, props);   
    return response
};
