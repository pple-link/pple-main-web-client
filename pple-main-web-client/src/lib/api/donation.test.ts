import {customAxios} from "../customAxios";

export const getOneDonationByEncodedParameter = (encoded: string) => {
    return customAxios(`/api/v1/donation/detail/${encoded}`);
}