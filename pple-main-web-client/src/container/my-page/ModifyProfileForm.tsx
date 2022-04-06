import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModifyProfile from '../../components/mypage/ModifyProfile';
import { getAccountProfile, patchUserDisplayName } from '../../lib/api/account';
import { getCookie, getUuid } from '../../lib/hooks/CookieUtil';
import { notifyError } from '../../lib/util/error';
import { RootState } from '../../models';
import { setUuid } from '../../models/auth/account';

const ModifyProfileForm = () => {
  const [displayName, setDisplayName] = useState<string>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState<File>(null);
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
    if (displayName.length == 0) {
      alert('닉네임을 입력해주세요');
      return;
    }
    patchUserDisplayName(uuid, jwt, displayName, newProfileImage)
      .then(res => {
        if (res.status == 202) {
          alert('이미 등록된 닉네임입니다. 다른 닉네임으로 변경해주세요');
          return;
        }
        navigate('/page');
      })
      .catch(err => {
        notifyError(err);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <ModifyProfile
          profileImageUrl={profileImageUrl}
          displayName={displayName}
          onChange={onChange}
          setNewProfileImage={setNewProfileImage}
          setProfileImageUrl={setProfileImageUrl}
        />
      </form>
    </>
  );
};

export default ModifyProfileForm;
