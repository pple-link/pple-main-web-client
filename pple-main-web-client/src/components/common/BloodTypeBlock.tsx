import React from 'react';
import styled from 'styled-components';

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
  text: string;
}

const BloodTypeBlock: React.FC<Props> = ({ text }) => {
  return <BloodTypeBox>{text}</BloodTypeBox>;
};

export default BloodTypeBlock;
