import React from 'react';
import styled from 'styled-components';
import ProfileMaskF7 from '../../assets/images/profile_mask_F7.svg';
import ProfileMaskFF from '../../assets/images/profile_mask_FF.svg';

const Wrapper = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;

const Image = styled.img`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const ProfileImage: React.FC<{src: string, focus: boolean}> = ({src, focus}) => {
  return (
    <Wrapper>
      <Image src={src}/>
      <Image src={focus ? ProfileMaskF7 : ProfileMaskFF}/>
    </Wrapper>
  );
};

export default ProfileImage;
