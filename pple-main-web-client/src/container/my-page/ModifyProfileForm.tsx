import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModifyProfile from '../../components/mypage/ModifyProfile';
import { getAccountProfile, patchUserDisplayName } from '../../lib/api/account';
import { customAxios } from '../../lib/customAxios';
import { getCookie, getUuid } from '../../lib/hooks/CookieUtil';
import { RootState } from '../../models';
import { setUuid } from '../../models/auth/account';

const ModifyProfileForm = () => {
  const [displayName, setDisplayName] = useState<string>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const uuid = useSelector((state: RootState) => state.account.uuid);
  const jwt = getCookie();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAccountProfile(jwt)
      .then(res => {
        if (uuid == '' || uuid == null) {
          dispatch(setUuid(res.data.uuid));
        }
        setDisplayName(res.data.displayName);
        setProfileImageUrl(res.data.profileImageUrl);
      })
      .catch(() => {
        console.log('Get Account Profile Error');
        console.log('ERROR');
      });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setDisplayName(value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    patchUserDisplayName(uuid, jwt, displayName)
      .then(res => {
        navigate('/page');
      })
      .catch(err => {
        console.log(err);
        console.log('Patch User DisplayName Error');
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <ModifyProfile
          profileImageUrl={profileImageUrl}
          displayName={displayName}
          onChange={onChange}
        />
      </form>
    </>
  );
};

export default ModifyProfileForm;
