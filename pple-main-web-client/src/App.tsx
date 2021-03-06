import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import './static/fonts/fonts.css';
import Introduce from './pages/Introduce';
import { isMobile } from 'react-device-detect';
import amplitude from 'amplitude-js';
import 'react-virtualized/styles.css';
import DetailForm from './container/feed/DetailForm';

const GlobalStyles = createGlobalStyle`
  ${reset};
  font-family: "Pretendard";

`;

const PCBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  font-family: 'Pretendard';
`;

const AppBlock = styled.div`
  width: 100%;
  height: auto;
  font-family: 'Pretendard';
`;

const PCBox = styled.div`
  width: 28rem;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
  font-family: 'Pretendard';
`;

const ContentBlock = styled.div`
  width: auto;
  height: 100%;
`;

const App: React.FC = () => {
  useEffect(() => {
    amplitude.getInstance().init(`${process.env.REACT_APP_AMPLITUDE_API}`);
  });
  return (
    <>
      <GlobalStyles />
      {isMobile ? (
        <AppBlock style={{ background: 'white' }}>
          <Routes>
            <Route path="/" element={<Introduce />} />
            {/*<Route path="/ login" element={<LoginPage />} />*/}
            {/*<Route path="/register" element={<RegisterPage />} />*/}
            {/*<Route path="/post" element={<RequestPostPage />} />*/}
            <Route path="/post/:donationUuid" element={<DetailForm />} />
            {/*<Route path="/post/register" element={<RequestRegisterPage />} />*/}
            {/*<Route path="/page" element={<MyPage />} />*/}
            {/*<Route path="/page/modify" element={<ModifyProfileForm />} />*/}
            {/*<Route path="/page/faq" element={<FAQ />} />*/}
            {/*<Route path="/page/helper" element={<Helped />} />*/}
            {/*<Route path="/page/story" element={<MyStoryForm />} />*/}
            {/*<Route path="/etc/1" element={<DesignatedBloodDonation />} />*/}
            {/*<Route path="/etc/2" element={<PrivacyPolicy />} />*/}
            {/*<Route path="/etc/3" element={<TermsOfService />} />*/}
            <Route path="/intro" element={<Introduce />} />
            {/*<Route*/}
            {/*  path="/page/story/modify/:donationUuid"*/}
            {/*  element={<ModifyStoryForm />}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path="/login/oauth2/kakao/callback"*/}
            {/*  element={<HandleOAuthRedirectUrl />}*/}
            {/*/>*/}
          </Routes>
        </AppBlock>
      ) : (
        <PCBlock>
          <PCBox style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Introduce />} />
              {/*<Route path="/login" element={<LoginPage />} />*/}
              {/*<Route path="/register" element={<RegisterPage />} />*/}
              {/*<Route path="/post" element={<RequestPostPage />} />*/}
              <Route path="/post/:donationUuid" element={<DetailForm />} />
              {/*<Route path="/post/register" element={<RequestRegisterPage />} />*/}
              {/*<Route path="/page" element={<MyPage />} />*/}
              {/*<Route path="/page/modify" element={<ModifyProfileForm />} />*/}
              {/*<Route path="/page/faq" element={<FAQ />} />*/}
              {/*<Route path="/page/helper" element={<Helped />} />*/}
              {/*<Route path="/page/story" element={<MyStoryForm />} />*/}
              <Route path="/intro" element={<Introduce />} />
              {/*<Route path="/etc/1" element={<DesignatedBloodDonation />} />*/}
              {/*<Route*/}
              {/*  path="/page/story/modify/:donationUuid"*/}
              {/*  element={<ModifyStoryForm />}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*  path="/login/oauth2/kakao/callback"*/}
              {/*  element={<HandleOAuthRedirectUrl />}*/}
              {/*/>*/}
            </Routes>
          </PCBox>
        </PCBlock>
      )}
    </>
  );
};

export default App;
