import * as React from "react";
import styled from "styled-components";
import {attributeFilesUrl} from "../../../services";

export const AdminNotFound = () => {
    return (
        <NotFoundContainer>
            <Container>
                <ImgContainer>
                    <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
                </ImgContainer>
                <TextContainer>
                    Здесь ничего нет
                </TextContainer>
            </Container>
        </NotFoundContainer>
    )
}

const NotFoundContainer = styled.div`
  --padding-top: 50px;
  padding: var(--padding-top) 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: calc(100vh - var(--padding-top) * 3 - ${({theme}) => theme.size.footer.height + theme.size.header.height}px);;
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
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
`