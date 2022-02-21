import { useParams } from 'react-router-dom';
import ModifyStory from '../../components/mypage/my-story/ModifyStory';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';
import React, { useEffect, useMemo, useState } from 'react';
import produce from 'immer';
import { updateDonation } from '../../api/donation';

export type OwnDonationType = {
  bloodProduct: string;
  donationContent: string;
  createdAccount: {
    blood: {
      abo: string;
      rh: string;
    };
    displayName: string;
    profileImageUrl: string;
    uuid: string;
  };
  createdAt: string;
  lastRenewedAt: string;
  modifiedAt: string;
  modifiedBy: number;
  patient: {
    blood: {
      abo: string;
      rh: string;
    };
  };
  phoneNumber: string;
  renewedCount: number;
  status: string;
  title: string;
  uuid: string;
};

const ModifyStoryForm: React.FC = () => {
  const donationUuid = useParams().donationUuid;
  const jwt = getCookie();
  const [tempPhone, setTempPhone] = useState<string>('');
  const [ownDonation, setOwnDonation] = useState<OwnDonationType>({
    bloodProduct: '',
    donationContent: '',
    createdAccount: {
      blood: {
        abo: '',
        rh: '',
      },
      displayName: '',
      profileImageUrl: '',
      uuid: '',
    },
    createdAt: '',
    lastRenewedAt: '',
    modifiedAt: '',
    modifiedBy: 0,
    patient: {
      blood: {
        abo: '',
        rh: '',
      },
    },
    phoneNumber: '',
    renewedCount: 0,
    status: '',
    title: '',
    uuid: '',
  });
  useEffect(() => {
    if (ownDonation.title == '') {
      customAxios
        .get(`/api/v1/donation/own`, {
          headers: { 'X-AUTH-TOKEN': `${jwt}` },
        })
        .then(async res => {
          const own = await res.data.content.filter(
            (content, idx) => content.uuid == donationUuid,
          );
          setOwnDonation(own[0]);
        });
    }
  }, []);

  const handleText = (e: any) => {
    const { name, value } = e.target;
    setOwnDonation({
      ...ownDonation,
      [name]: value,
    });
  };

  const handleBloodType = (e: any) => {
    const { value } = e.target;
    const nextState = produce(ownDonation, draft => {
      draft.patient.blood.abo = value;
    });
    setOwnDonation(nextState);
  };

  const handleRh = (e: any) => {
    const nextState = produce(ownDonation, draft => {
      if (ownDonation.patient.blood.rh == 'POSITIVE') {
        draft.patient.blood.rh = 'NEGATIVE';
      } else {
        draft.patient.blood.rh = 'POSITIVE';
      }
    });
    setOwnDonation(nextState);
  };

  const handleBloodProduction = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const { value } = e.target;
    const newState = produce(ownDonation, draft => {
      draft.bloodProduct = value;
    });
    setOwnDonation(newState);
  };

  const handlePhoneNumber = (e: any) => {
    const { name, value } = e.target;
    const onlyNumber: string = value.replace(/[^0-9]/g, '');
    if (name == 'first' && onlyNumber.length <= 3) {
      setTempPhone(value);
      const newState = produce(ownDonation, draft => {
        draft.phoneNumber = `${tempPhone}${ownDonation.phoneNumber.slice(
          3,
          11,
        )}`;
      });
    }
    // 두 번째 자리
    else if (name === 'second' && onlyNumber.length <= 4) {
      setTempPhone(value);
      const newState = produce(ownDonation, draft => {
        draft.phoneNumber = `${ownDonation.phoneNumber.slice(
          0,
          3,
        )}${tempPhone}${ownDonation.phoneNumber.slice(7, 11)}`;
      });
    }
    // 세 번쨰 자리
    else {
      if (onlyNumber.length <= 4) {
        setTempPhone(value);
        const newState = produce(ownDonation, draft => {
          draft.phoneNumber = `${ownDonation.phoneNumber.slice(
            0,
            7,
          )}${tempPhone}`;
        });
      }
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    updateDonation(donationUuid, {
      bloodProduct: ownDonation.bloodProduct,
      donationContent: ownDonation.donationContent,
      phoneNumber: ownDonation.phoneNumber,
      title: ownDonation.title,
      uuid: ownDonation.uuid,
    });
  };

  return (
    <>
      <form method="PATCH" onSubmit={onSubmit}>
        <ModifyStory
          handlePhoneNumber={handlePhoneNumber}
          handleBloodType={handleBloodType}
          handleText={handleText}
          ownDonation={ownDonation}
          handleRh={handleRh}
          handleBloodProduction={handleBloodProduction}
        />
      </form>
    </>
  );
};

export default ModifyStoryForm;
