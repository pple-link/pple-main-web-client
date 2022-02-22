import React, { useEffect, useState } from 'react';
import HomePageHeader from '../components/home/HomePageHeader';
import { getCookie, setCookie } from '../lib/hooks/CookieUtil';
import { checkUser } from '../lib/hooks/CookieUtil';
import HomeCardTemplateForm from './feed/HomeCardTemplateForm';
import { getAccountProfile } from '../api/account';

const HomeForm = () => {
  setCookie();
  checkUser();
  const [displayName, setDisplayName] = useState<string>('피플');
  const jwt = getCookie();
  useEffect(() => {
    getAccountProfile(jwt)
      .then(res => {
        setDisplayName(res.data.displayName);
      })
      .catch(err => {
        console.log('Token is undefined');
        console.log(err);
      });
  }, []);
  return (
    <>
      <HomePageHeader name={displayName} />
      <HomeCardTemplateForm />
    </>
  );
};

export default HomeForm;
