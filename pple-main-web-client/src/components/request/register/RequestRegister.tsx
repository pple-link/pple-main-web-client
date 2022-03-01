import { IconButton } from '@mui/material';
import React, { MouseEventHandler } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import RadiusButton from '../../common/buttons/RadiusButton';
import { TextField, styled } from '@mui/material';
import BloodTypeGroup from '../../common/input/BloodTypeGroup';
import BloodDonationType from '../../common/input/BloodDonationType';
import SquareButton from '../../common/buttons/SquareButton';
import palette from '../../../lib/styles/palette';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../../common/input/PhoneInput';
import { RequestState } from '../../../container/post/RequestRegisterForm';

const Divider = styled('div')({
  width: '100%',
  height: '9px',
  backgroundColor: '#F4F4F4',
});

const RequestRegisterBlock = styled('div')({
  width: '100%',
  height: '100%',
});
const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '14px 17px 8px 10px',
  '& .column': {
    display: 'flex',
    alignItems: 'center',
    width: '33%',
  },
  '& .title': {
    color: '#767676',
    transform: 'translateX(50%)',
    fontWeight: 'bold',
  },
  '& .button': {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

const Body = styled('div')({
  width: '100%',
});

const BodyTextBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '0px 17px',
  '& .MuiTextField-root': {
    borderBottom: '1px solid #E6E6E6',
    '& .MuiInput-root::before': {
      borderBottom: '1px solid #E6E6E6',
    },
    '& .MuiInput-root::after': {
      borderBottom: '1px solid red',
    },
  },
  '& #title': {
    fontSize: 'large',
    color: 'black',
    padding: '20px 0px 10px 0px',
    border: 'red',
  },

  '& #title::placeholder': {
    color: '#AEAEAE',
  },
  '& #content': {
    color: 'black',
    paddingTop: '20px',
  },
  '& #content::placeholder': {
    color: '#AEAEAE',
  },
});

const BodyPatientInfoBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: '0px 17px',
});

const Footer = styled('div')({
  backgroundColor: 'white',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: '2rem 17px',
  '& .MuiButton-root': {
    padding: '15px 0px',
    width: '48%',
  },
});

type RequestRegisterType = {
  post: RequestState;
  onChange: any;
  handleRh: any;
  handleBloodType: any;
  handlePhoneNumber: any;
  handleBloodProduction: any;
};

const RequestRegister: React.FC<RequestRegisterType> = ({
  post,
  onChange,
  handleRh,
  handleBloodType,
  handlePhoneNumber,
  handleBloodProduction,
}) => {
  const navigate = useNavigate();
  const onClickExit: MouseEventHandler = () => {
    navigate(-1);
  };
  const { content, abo, rh, first, second, third, title } = post;

  return (
    <RequestRegisterBlock>
      <Header>
        <div className="column">
          <IconButton onClick={onClickExit}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="title">
          <span>요청하기</span>
        </div>

        {/* <div className="button">
          <RadiusButton text="내정보 불러오기" />
        </div> */}
      </Header>
      <Divider />
      <Body>
        <BodyTextBox>
          <TextField
            id="title"
            variant="standard"
            name="title"
            placeholder="제목"
            value={title}
            onChange={onChange}
            InputProps={{
              style: {
                borderColor: 'red !important',
              },
            }}
          />
          <TextField
            id="content"
            multiline
            rows={6}
            placeholder="내용을 입력하세요"
            variant="standard"
            name="content"
            value={content}
            onChange={onChange}
          />
        </BodyTextBox>

        <BodyPatientInfoBox>
          {/* name 값 데베랑 이름 맞추기 */}
          <BloodTypeGroup
            onChange={handleBloodType}
            abo={abo}
            rh={rh}
            handleRh={handleRh}
          />
          <BloodDonationType handleBloodProduction={handleBloodProduction} />
          <PhoneInput
            first={first}
            second={second}
            third={third}
            handlePhoneNumber={handlePhoneNumber}
          />
        </BodyPatientInfoBox>
      </Body>

      <Footer>
        <SquareButton
          onClick={onClickExit}
          text="취소"
          textColor={palette.gray[1]}
          backgroundColor={palette.gray[0]}
          type="reset"
        />
        <SquareButton type="submit" text="등록" />
      </Footer>
    </RequestRegisterBlock>
  );
};

export default RequestRegister;
