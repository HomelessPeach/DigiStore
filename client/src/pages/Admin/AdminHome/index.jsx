import * as React from "react";
import styled from "styled-components";
import {attributeFilesUrl} from "../../../services";

export const AdminHome = () => {
    return (
        <AdminHomeContainer>
            <Container>
                <ImgContainer>
                    <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
                </ImgContainer>
                <TextContainer>
                    Добро пожаловать в панель администратора
                </TextContainer>
            </Container>
        </AdminHomeContainer>
    )
}

const AdminHomeContainer = styled.div`
  padding: 100px 100px 0;
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
  height: 45vh;
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
  line-height: 1.5;
`