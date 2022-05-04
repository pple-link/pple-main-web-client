import {NavigateFunction} from "react-router-dom";

export const errorNoExistDonation = (router: NavigateFunction): void=>{
    alert("존재하지 않는 게시물입니다.");
    router('/intro');
}
