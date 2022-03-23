import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequestPostPage from './pages/RequestPostPage';
import RequestRegisterPage from './pages/RequestRegisterPage';
import MyPage from './pages/MyPage';
import FAQ from './components/mypage/faq/FAQ';
import Helped from './components/mypage/help/Helped';
import ModifyProfileForm from './container/my-page/ModifyProfileForm';
import MyStoryForm from './container/my-page/MyStoryForm';
import DesignatedBloodDonation from './components/mypage/etc/DesignatedBloodDonation';
import PrivacyPolicy from './components/mypage/etc/PrivacyPolicy';
import TermsOfService from './components/mypage/etc/TermsOfService';
import ModifyStoryForm from './container/my-page/ModifyStoryForm';
import HandleOAuthRedirectUrl from './container/auth/HandleOAuthRedirectUrl';
import './static/fonts/fonts.css';
import Introduce from './pages/Introduce';
import { isMobile } from 'react-device-detect';
import amplitude from 'amplitude-js';
import 'react-virtualized/styles.css';
import DetailForm from './container/feed/DetailForm';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import createAdminStore from './createAdminStore';

const App: React.FC = () => {
  useEffect(() => {
    amplitude.getInstance().init(`${process.env.REACT_APP_AMPLITUDE_API}`);
  });
  const [admin, setAdmin] = useState<boolean>(true);
  const dataProvider = jsonServerProvider(
    `${process.env.REACT_APP_BASE_URL}/api/v1/account/all`,
  );
  return (
    <>
      <GlobalStyles />
      {admin ? (
        <Admin dataProvider={dataProvider}>
          <Resource name="user" list={ListGuesser} />
        </Admin>
      ) : isMobile ? (
        <AppBlock style={{ background: 'white' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/post" element={<RequestPostPage />} />
            <Route path="/post/:donationUuid" element={<DetailForm />} />
            <Route path="/post/register" element={<RequestRegisterPage />} />
            <Route path="/page" element={<MyPage />} />
            <Route path="/page/modify" element={<ModifyProfileForm />} />
            <Route path="/page/faq" element={<FAQ />} />
            <Route path="/page/helper" element={<Helped />} />
            <Route path="/page/story" element={<MyStoryForm />} />
            <Route path="/etc/1" element={<DesignatedBloodDonation />} />
            <Route path="/etc/2" element={<PrivacyPolicy />} />
            <Route path="/etc/3" element={<TermsOfService />} />
            <Route path="/intro" element={<Introduce />} />
            <Route
              path="/page/story/modify/:donationUuid"
              element={<ModifyStoryForm />}
            />
            <Route
              path="/login/oauth2/kakao/callback"
              element={<HandleOAuthRedirectUrl />}
            />
          </Routes>
        </AppBlock>
      ) : (
        <PCBlock>
          <PCBox style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/post" element={<RequestPostPage />} />
              <Route path="/post/:donationUuid" element={<DetailForm />} />
              <Route path="/post/register" element={<RequestRegisterPage />} />
              <Route path="/page" element={<MyPage />} />
              <Route path="/page/modify" element={<ModifyProfileForm />} />
              <Route path="/page/faq" element={<FAQ />} />
              <Route path="/page/helper" element={<Helped />} />
              <Route path="/page/story" element={<MyStoryForm />} />
              <Route path="/intro" element={<Introduce />} />
              <Route path="/etc/1" element={<DesignatedBloodDonation />} />
              <Route
                path="/page/story/modify/:donationUuid"
                element={<ModifyStoryForm />}
              />
              <Route
                path="/login/oauth2/kakao/callback"
                element={<HandleOAuthRedirectUrl />}
              />
            </Routes>
          </PCBox>
        </PCBlock>
      )}
    </>
  );
};

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

export default App;
