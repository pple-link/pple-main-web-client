export const getOneDonationByEncodedParameter = (encoded: string) => {
    return fetch(`/api/v1/donation/detail/${encoded}`, {
        method: 'GET',
        mode: "no-cors"
    });
}