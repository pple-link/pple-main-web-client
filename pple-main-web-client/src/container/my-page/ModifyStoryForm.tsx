import { useNavigate, useParams } from 'react-router-dom';
import ModifyStory from '../../components/mypage/my-story/ModifyStory';
import { customAxios } from '../../lib/customAxios';
import { getCookie } from '../../lib/hooks/CookieUtil';
import React, { useEffect, useMemo, useState } from 'react';
import produce from 'immer';
import { updateDonation } from '../../lib/api/donation';
import OwnDonation from '../../lib/interface/OwnDonation';
import { clickModifyDonationPost } from '../../lib/ampli';

const ModifyStoryForm: React.FC = () => {
  const navigator = useNavigate();
  const donationUuid = useParams().donationUuid;
  const jwt = getCookie();
  const [phone, setPhone] = useState({
    first: '',
    second: '',
    third: '',
  });
  const [tempPhone, setTempPhone] = useState<string>('');
  const [ownDonation, setOwnDonation] = useState<OwnDonation>({
    bloodProduct: '',
    content: '',
    writer: {
      bloodType: {
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
      bloodType: {
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
          const newPhoneValue = produce(phone, draft => {
            if (ownDonation.phoneNumber.length == 12) {
              phone.first = own[0].phoneNumber.slice(0, 4);
              phone.second = own[0].phoneNumber.slice(4, 8);
              phone.third = own[0].phoneNumber.slice(8, 12);
            } else {
              phone.first = own[0].phoneNumber.slice(0, 3);
              phone.second = own[0].phoneNumber.slice(3, 7);
              phone.third = own[0].phoneNumber.slice(7, 11);
            }
          });
          setPhone(newPhoneValue);
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
      draft.patient.bloodType.abo = value;
    });
    setOwnDonation(nextState);
  };

  const handleRh = (e: any) => {
    const nextState = produce(ownDonation, draft => {
      if (ownDonation.patient.bloodType.rh == 'POSITIVE') {
        draft.patient.bloodType.rh = 'NEGATIVE';
      } else {
        draft.patient.bloodType.rh = 'POSITIVE';
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
      const newState = produce(phone, draft => {
        draft.first = onlyNumber;
      });
      setPhone(newState);
    }
    // ??? ?????? ??????
    else if (name === 'second' && onlyNumber.length <= 4) {
      const newState = produce(phone, draft => {
        draft.second = onlyNumber;
      });
      setPhone(newState);
    }
    // ??? ?????? ??????
    else if (name == 'third' && onlyNumber.length <= 4) {
      const newState = produce(phone, draft => {
        draft.third = onlyNumber;
      });
      setPhone(newState);
    }
  };

  const isFilledUserInfo = () => {
    if (
      phone.first == '' ||
      phone.first.length < 3 ||
      phone.second == '' ||
      phone.second.length < 4 ||
      phone.third == '' ||
      phone.third.length < 4 ||
      ownDonation.title == '' ||
      ownDonation.content == ''
    ) {
      return false;
    }

    return true;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (isFilledUserInfo()) {
      clickModifyDonationPost();
      const body = {
        bloodProduct: ownDonation.bloodProduct,
        content: ownDonation.content,
        phoneNumber: `${phone.first}${phone.second}${phone.third}`,
        title: ownDonation.title,
        uuid: donationUuid,
        patient: {
          bloodType: {
            abo: ownDonation.patient.bloodType.abo,
            rh: ownDonation.patient.bloodType.rh,
          },
        },
      };

      updateDonation(donationUuid, body, jwt)
        .then(res => {
          navigator(-1);
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }
    alert('????????? ????????????.');
  };

  return (
    <>
      <form method="PATCH" onSubmit={onSubmit}>
        <ModifyStory
          phone={phone}
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
