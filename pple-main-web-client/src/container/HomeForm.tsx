import React, { useEffect, useState } from 'react';
import HomePageHeader from '../components/home/HomePageHeader';
import { getCookie, setCookie } from '../lib/hooks/CookieUtil';
import { checkUser } from '../lib/hooks/CookieUtil';
import HomeCardTemplateForm from './feed/HomeCardTemplateForm';
import { getAccountProfile } from '../lib/api/account';
import { getExpiredDonations } from '../lib/api/donation';
import StoryModal from '../components/common/modal/StoryModal';

const HomeForm = () => {
  setCookie();
  checkUser();
  const [displayName, setDisplayName] = useState<string>('피플');
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [expiredDonationUuid, setExpiredDonationUuid] = useState<string>('');
  const jwt = getCookie();

  useEffect(() => {
    getAccountProfile(jwt)
      .then(res => {
        if (res.data) {
          setDisplayName(res.data.displayName);
        }
      })
      .catch(err => {
        console.log('Token is undefined');
        console.log(err);
      });

    if (jwt) {
      getExpiredDonations().then(res => {
        console.log(res);
        if (res.data.length && res.data[0].status == 'ACTIVE') {
          setExtensionOpen(!extensionOpen);
          setExpiredDonationUuid(res.data[0].uuid);
        }
      });
    }
  }, [displayName]);
  return (
    <>
      <StoryModal
        open={extensionOpen}
        setOpen={setExtensionOpen}
        donationUuid={expiredDonationUuid}
      />
      <HomePageHeader name={displayName} />
      <HomeCardTemplateForm />
    </>
  );
};

export default HomeForm;
