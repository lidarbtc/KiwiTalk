import React, { useState, ChangeEvent, InputHTMLAttributes } from 'react';
import Color from '../../assets/colors/theme';
import styled from 'styled-components';
import logo from '../../assets/images/text_logo.svg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-left: 47px;
  padding-top: 80px;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  margin-bottom: 50px;
  color: #000000;
  user-select: none;
`;

const Logo = styled.img`
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  margin-left: 10px;
  padding: 0;
  background: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const InputWrapper = styled.div`
  width: 280px;
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 16px 38px;
  background: #FFFFFF;
  box-shadow: 0 4px 20px rgba(26, 60, 68, 0.07);
`;

const Button = styled.button`
  width: 280px;
  height: 45px;
  box-shadow: 0px 4px 20px rgba(26, 60, 68, 0.07);
  border: none;
  border-radius: 12px;
  background: ${Color.BUTTON};
  color: #FFFFFF;
  font-weight: 600;
  font-size: 12px;
  user-select: none;

  :hover {
    background: ${Color.BUTTON_HOVER};
  }

  :focus {
    outline:none;
  }
`;

const PreviousLink = styled(Link)`
  font-family: NanumBarunGothic;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 11px;
  width: 280px;
  align-items: center;
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  margin-top: 16px;
  user-select: none;
`;

const Icon = styled.i((props: {focus: boolean}) => `
  color: ${props.focus ? '#000000' : '#B3B3B3'};
`)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  icon: string
}

const Input: React.FC<InputProps> = ({placeholder, icon, ...args}) => {
  const [focus, setFocus] = useState(false);

  return (
    <InputWrapper>
      <Icon className={icon} focus={focus}/>
      <StyledInput placeholder={placeholder} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...args}/>
    </InputWrapper>
  );
};

const VerifyCode: React.FC<{ onSubmit: (passcode: string) => any }> = ({ onSubmit }) => {
  const [passcode, setPasscode] = useState('');
  return (
    <Wrapper>
      <TitleWrapper>
        <Logo src={logo} alt={'logo'}/>
      </TitleWrapper>
      <Form onSubmit={(e) => {
        onSubmit(passcode);
        e.preventDefault();
      }}>
        <Input placeholder={'인증 번호를 입력해주세요.'} icon={'fas fa-shield-alt'} value={passcode} onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPasscode(event.target.value);
        }}/>
        <Button>인증하기</Button>
        <PreviousLink to='/login'>처음으로 돌아가기</PreviousLink>
      </Form>
    </Wrapper>
  )
};

export default VerifyCode;