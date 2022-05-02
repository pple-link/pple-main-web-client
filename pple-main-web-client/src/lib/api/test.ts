import {customAxios} from "../customAxios";

export const testDonationRenewURL = (donationUuid: string, jwt: string)=>{
    return customAxios
        .post(`/api/v1/account/donation/renew/${donationUuid}`, {
            headers: { 'X-AUTH-TOKEN': `${jwt}` },
        })
        .then(res=>{
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
}