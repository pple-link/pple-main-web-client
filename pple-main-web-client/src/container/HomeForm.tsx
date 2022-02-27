import React, { useEffect, useState } from 'react';
import HomePageHeader from '../components/home/HomePageHeader';
import { getCookie, setCookie } from '../lib/hooks/CookieUtil';
import { checkUser } from '../lib/hooks/CookieUtil';
import HomeCardTemplateForm from './feed/HomeCardTemplateForm';
import { getAccountProfile } from '../lib/api/account';
import {
  getDonationsOfActiveStatus,
  getExpiredDonations,
} from '../lib/api/donation';
import StoryModal from '../components/common/modal/StoryModal';

const HomeForm = () => {
  setCookie();
  checkUser();
  const [displayName, setDisplayName] = useState<string>('피플');
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [expiredDonationUuid, setExpiredDonationUuid] = useState<string>('');
  const [contentArray, setContentArray] = useState([]);

  const jwt = getCookie();

  useEffect(() => {
    if (jwt) {
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

      getExpiredDonations(jwt).then(res => {
        console.log(res.data);
        if (res.data.length && res.data[0].status == 'ACTIVE') {
          setExtensionOpen(true);
          setExpiredDonationUuid(res.data[0].uuid);
        }
      });
    }
    getDonationsOfActiveStatus()
      .then(res => {
        const newArray = res.data.content;
        setContentArray(newArray);
      })
      .catch(err => {
        console.log(err);
        console.log('ERROR_DONATION');
      });
  }, [displayName]);
  return (
    <>
      <StoryModal
        open={extensionOpen}
        setOpen={setExtensionOpen}
        donationUuid={expiredDonationUuid}
      />
      <HomePageHeader name={displayName} />
      <HomeCardTemplateForm contentArray={contentArray} />
    </>
  );
};

export default HomeForm;
