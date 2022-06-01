import {customAxios} from "../customAxios";
import {Axios} from "axios";

export const getOneDonationByEncodedParameter = (encoded: string) => {
    return customAxios(`/api/v1/donation/detail/${encoded}`);
}

export const getShareUrl = (donationUuid: string, accessToken: string): Promise<any> =>{
    const body = {
        donationUuid : donationUuid,
    }

    return customAxios.post('/api/v1/donation/url/test',body,{
     headers:{
         'X-AUTH-TOKEN': `${accessToken}`,
     }
    });
}