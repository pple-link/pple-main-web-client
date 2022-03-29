import React, { useEffect, useState } from 'react';
import HomePageHeader from '../components/home/HomePageHeader';
import { getCookie, setCookie } from '../lib/hooks/CookieUtil';
import HomeCardTemplateForm from './feed/HomeCardTemplateForm';
import { getAccountProfile } from '../lib/api/account';
import {
  getDonationsOfActiveStatus,
  getExpiredDonations,
} from '../lib/api/donation';
import StoryModal from '../components/common/modal/StoryModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUuid } from '../models/auth/account';

const HomeForm = () => {
  const [displayName, setDisplayName] = useState<string>('피플');
  const [extensionOpen, setExtensionOpen] = useState(false);
  const [expiredDonationUuid, setExpiredDonationUuid] = useState<string>('');
  const [contentArray, setContentArray] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = getCookie();

  setCookie();
  useEffect(() => {
    if (jwt) {
      getAccountProfile(jwt)
        .then(res => {
          if (res.data.status == 'TEMP') {
            navigate('/register');
            return;
          }
          setDisplayName(res.data.displayName);
          dispatch(setUuid(res.data.uuid));
        })
        .catch(err => {
          console.log(err);
          // navigate('/login');
        });

      getExpiredDonations(jwt).then(res => {
        if (res.data.length && res.data[0].status == 'ACTIVE') {
          setExtensionOpen(true);
          setExpiredDonationUuid(res.data[0].uuid);
        }
      });
    }
    getDonationsOfActiveStatus()
      .then(res => {
        const newArray = res.data;
        setContentArray(newArray);
      })
      .catch(err => {
        console.log(err);
        console.log('ERROR_DONATION');
      });
  }, [jwt]);
  return (
    <>
      <StoryModal
        open={extensionOpen}
        setOpen={setExtensionOpen}
        donationUuid={expiredDonationUuid}
        jwt={jwt}
      />
      <HomePageHeader name={displayName} />
      <HomeCardTemplateForm contentArray={contentArray} />
    </>
  );
};

export default HomeForm;
