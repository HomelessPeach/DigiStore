import {attributeFilesUrl} from "../../../services";
import styled from "styled-components";
import * as React from "react";

export const AdminNotSupported = () => {
    return (
        <AdminNotSupportedContainer>
            <Container>
                <ImgContainer>
                    <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
                </ImgContainer>
                <TextContainer>
                    Панель администратора не поддерживается на планшетах и мобильных устройствах.
                </TextContainer>
            </Container>
        </AdminNotSupportedContainer>
    )
}

const AdminNotSupportedContainer = styled.div`
  --padding-top: 50px;
  padding: var(--padding-top) 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (${({theme}) => theme.media.large}) {
   padding: var(--padding-top) 0 0;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 20% 5%;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
  width: 100%;
  height: 50%;
  @media (${({theme}) => theme.media.large}) {
    box-shadow: none;
  }
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
`

const Img = styled.img`
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
`

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  font-size: 30px;
  height: 30%;
  padding: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (${({theme}) => theme.media.large}) {
    font-size: 25px;
  }
`