import React from 'react';
import styled from 'styled-components';
import { createBloodTypeString } from '../../lib/util';

const BloodTypeBox = styled.div`
  font-family: 'Pretendard Variable';
  color: #b7b7b7;
  border: 1px solid #b7b7b7;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0px 5px;
  text-align: center;
  font-weight: 700;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: -0.03em;
  margin-left: 3px;
  height: fit-content;
`;

interface Props {
  bloodType: {
    abo: 'A' | 'B' | 'O' | 'AB';
    rh: 'POSITIVE' | 'NEGATIVE';
  };
}

const BloodTypeBlock: React.FC<Props> = ({ bloodType }) => {
  const bloodTypeString = createBloodTypeString(bloodType.abo, bloodType.rh);
  return <BloodTypeBox>{bloodTypeString}</BloodTypeBox>;
};

export default BloodTypeBlock;
