export const getOneDonationByEncodedParameter = (encoded: string) =>{
    return fetch(`http://ppledevtest-env.eba-9fa279up.ap-northeast-2.elasticbeanstalk.com/api/v1/donation/detail/${encoded}`,{
        mode: 'cors',
        method: 'GET',
    });
}