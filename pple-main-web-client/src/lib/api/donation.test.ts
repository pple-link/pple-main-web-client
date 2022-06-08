import {customAxios} from "../customAxios";
import {Axios, AxiosPromise} from "axios";

export const getOneDonationByEncodedParameter = (encoded: string,a: string, d: string):  AxiosPromise<any> => {
    return customAxios(`/api/v1/donation/detail/${encoded}?a=${a}&d=${d}`);
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