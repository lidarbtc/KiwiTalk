import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const IconButton = styled.button`
  position: relative;
  width: 18px;
  height: 18px;
  background: none;
  border: none;

  :focus {
    outline:none;
  }
  cursor: pointer;
  user-select: none;
`

const Icon = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

interface ChatroomHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background: string
}

const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({background, style}) => {
  return (
    <IconButton style={style}>
      <Icon src={background} />
    </IconButton>
  );
};

export default ChatroomHeader;
