import {customAxios} from "../customAxios";

export const getOneDonationByEncodedParameter = (encoded: string): Promise<void> =>{
    return customAxios.get(`/api/v1/donation/detail/${encoded}`);
}