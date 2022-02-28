import React from 'react';
import { styled } from '@mui/material';
import bar from '../../../static/images/bar.png';
import RadiusButton from '../buttons/RadiusButton';
import A from '../../../static/images/bloodType/A.svg';
import An from '../../../static/images/bloodType/A-.svg';
import B from '../../../static/images/bloodType/B.svg';
import Bn from '../../../static/images/bloodType/B-.svg';
import O from '../../../static/images/bloodType/O.svg';
import On from '../../../static/images/bloodType/O-.svg';
import AB from '../../../static/images/bloodType/AB.svg';
import ABn from '../../../static/images/bloodType/AB-.svg';

interface FeedHeaderBlockProp {
  noBorderRadius?: boolean;
}

const FeedHeaderBlock = styled('div')({
  width: '100%',
  '& .header': {
    backgroundColor: '#EEEEEE',
    padding: '0 22px 10px 22px',
    borderRadius: '14px 14px 0px 0px',
  },
  borderBottom: '1px solid rgba(0,0,0,0.02)',
});

const TimeBox = styled('div')({
  fontFamily:
    "'Pretendard', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",

  fontSize: 'x-small',
  width: '100%',
  textAlign: 'right',
  boxSizing: 'border-box',
  color: '#B7B7B7',
  transform: 'translate(0, 10px)',
});

const CardComponentHeader = styled('div')({
  display: 'flex',
  alignItems: ' center',
  justifyContent: 'space-between',
  '& .left': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .middle': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .middle .bar': {
    marginRight: '8px',
  },
  '& .middle .header-text .header-text-title': {
    color: 'gray',
    fontSize: 'smaller',
  },
});

const CardComponentHeaderColumn = styled('div')({
  '& .blood-icon': {
    position: 'relative',
    marginRight: '10px',
  },
  '& .blood-icon .card-text': {
    position: 'absolute',
    left: '25%',
    bottom: '35%',
    color: 'white',
    fontWeight: 'bold',
  },
});

const createBloodProduct = (bloodProduct: string) => {
  if (bloodProduct == 'WHOLE') {
    return '전혈';
  } else if (bloodProduct == 'PLATELET') {
    return '성분채혈 혈소판';
  } else if (bloodProduct == 'LEUKOCYTE') {
    return '성분채혈 백혈구';
  } else if (bloodProduct == 'PACKED_RED_BLOOD_CELL') {
    return '농축 적혈구';
  } else if (bloodProduct == 'LEUKOCYTE_REDUCED_RED_BLOOD_CELL') {
    return '백혈구제거 적혈구';
  } else {
    return '오타있습니다';
  }
};

const createTimeFormat = (time: string) => {
  return `${time.slice(0, 4)}년 ${time.slice(5, 7)}월 ${time.slice(
    8,
    10,
  )}일 등록`;
};

interface CardProps {
  bloodType: string;
  sort: string;
  buttonText: string;
  time?: string;
  onClick?: any;
  status?: string;
}

const FeedHeader: React.FC<CardProps> = ({
  bloodType,
  sort,
  buttonText,
  onClick,
  time,
  status,
}) => {
  const bloodTypeImg = (bloodType: string) => {
    if (bloodType == 'A+') {
      return <img src={A} alt="A+" width={60} height={60} />;
    } else if (bloodType == 'A-') {
      return <img src={An} alt="A-" width={60} height={60} />;
    } else if (bloodType == 'B+') {
      return <img src={B} alt="B+" width={60} height={60} />;
    } else if (bloodType == 'B-') {
      return <img src={Bn} alt="B-" width={60} height={60} />;
    } else if (bloodType == 'O+') {
      return <img src={O} alt="O+" width={60} height={60} />;
    } else if (bloodType == 'O-') {
      return <img src={On} alt="O-" width={60} height={60} />;
    } else if (bloodType == 'AB+') {
      return <img src={AB} alt="AB+" width={60} height={60} />;
    } else if (bloodType == 'AB-') {
      return <img src={ABn} alt="AB-" width={60} height={60} />;
    }
  };

  return (
    <FeedHeaderBlock>
      <div className="header">
        <TimeBox>
          <div> {time ? createTimeFormat(time) : ''}</div>
        </TimeBox>
        <CardComponentHeader>
          <div className="left">
            <CardComponentHeaderColumn>
              <div className="blood-icon">{bloodTypeImg(bloodType)}</div>
            </CardComponentHeaderColumn>

            <CardComponentHeaderColumn className="middle">
              <div className="bar">
                <img src={bar} alt="체온계이미지"></img>
              </div>
              <div className="header-text">
                <div className="header-text-title">헌혈 종류</div>
                <div
                  style={{
                    color: '#FF6969',
                    fontWeight: 'bold',
                    marginTop: '5px',
                  }}
                >
                  {sort ? createBloodProduct(sort) : 'none'}
                </div>
              </div>
            </CardComponentHeaderColumn>
          </div>
          <CardComponentHeaderColumn sx={{ transform: 'translate(0,5px)' }}>
            <RadiusButton status={status} onClick={onClick} text={buttonText} />
          </CardComponentHeaderColumn>
        </CardComponentHeader>
      </div>
    </FeedHeaderBlock>
  );
};

export default FeedHeader;
