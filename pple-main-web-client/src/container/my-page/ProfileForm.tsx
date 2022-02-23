import React, { useEffect, useState } from 'react';
import Profile from '../../components/mypage/Profile';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';

const ProfileForm = () => {
  const jwt = getCookie();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bloodType, setBloodType] = useState('');
  useEffect(() => {
    customAxios
      .get('/api/v1/account/profile', {
        headers: { 'X-AUTH-TOKEN': `${jwt}` },
      })
      .then(res => {
        setProfileImageUrl(res.data.profileImageUrl);
        setDisplayName(res.data.displayName);
        if (res.data.bloodType.rh == 'POSITIVE') {
          setBloodType(`${res.data.bloodType.abo}+`);
        } else if (res.data.bloodType.rh == 'NEGATIVE') {
          setBloodType(`${res.data.bloodType.abo}-`);
        }
      });
  }, []);
  return (
    <Profile
      profileImageUrl={profileImageUrl}
      displayName={displayName}
      bloodType={bloodType}
    />
  );
};

export default ProfileForm;
