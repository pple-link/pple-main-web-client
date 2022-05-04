import {customAxios} from "../customAxios";

export const getOneDonationByEncodedParameter = (encoded: string) => {
    return customAxios(`/api/v1/donation/detail/${encoded}`);
}

export const getShareUrl = (donationUuid: string, accessToken: string): string=>{
    const url = "";
    const body = {
        donationUuid : donationUuid,
    }
    customAxios.post('/api/v1/donation/url/test',body,{
     headers:{
         'X-AUTH-TOKEN': `${accessToken}`,
     }
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
    return url;
}