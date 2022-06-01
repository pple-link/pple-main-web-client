import React, {useEffect, useState} from 'react';
import intro1 from '../static/images/intro/introPage1.svg';
import intro2 from '../static/images/intro/introPage2.svg';
import {ButtonBase, styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {clickIntroButton} from '../lib/ampli';
import {getUserAgent} from "../lib/util";
import {DOWNLOAD_URL, USER_AGENT} from "../lib/util/Constant";

const LinkButton = styled(ButtonBase)({
    display: 'block',
    color: 'white',
    background: '#FF6363',
    marginTop: '-80px',
    fontSize: '12px',
    borderRadius: '34px',
    padding: '15px 35px',
    fontWeight: 'bold',
    margin: 'auto',
    width: '190px',
    transform: 'translate(0,-40px)',
});

const LinkButton2 = styled(ButtonBase)({
    display: 'block',
    color: 'white',
    background: '#3E3E3E',
    marginTop: '-80px',
    fontSize: '12px',
    borderRadius: '34px',
    padding: '15px 35px',
    fontWeight: 'bold',
    margin: 'auto',
    width: '190px',
    transform: 'translate(0,-40px)',
});

const DIV = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
});

const Introduce: React.FC = () => {
    const [userAgent, setUserAgent] = useState<string>("");
    const imageStyle = {
        background: 'white',
        width: '100%',
    };
    const navigate = useNavigate();
    const goMain = () => {
        clickIntroButton();
        navigate('/');
    };

    const redirectToStore = (): void => {
        switch (userAgent) {
            case USER_AGENT.ANDROID:
                window.open(DOWNLOAD_URL.PLAY_STORE)
                break;
            case USER_AGENT.IOS:
                window.open(DOWNLOAD_URL.APPLE)
                break;
            default:
                window.open(DOWNLOAD_URL.APPLE)
                break;
        }
    }

    useEffect(() => {
        const os = getUserAgent();
        setUserAgent(os);
        console.log(os);
    }, [])

    return (
        <div style={{background: 'white'}}>
            <div style={{background: 'white'}}>
                <img src={intro1} alt="" style={imageStyle}/>
            </div>
            <LinkButton onClick={redirectToStore}>피플 서비스로 도움주기</LinkButton>
            <div style={{background: '#222222'}}>
                <img src={intro2} alt="" style={imageStyle}/>
                <LinkButton2 onClick={redirectToStore}>지금 시작하기</LinkButton2>
            </div>
        </div>
    );
};

export default Introduce;
