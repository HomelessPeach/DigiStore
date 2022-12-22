import * as React from "react";
import styled from "styled-components";
import {attributeFilesUrl} from "../../../services";

export const CarouselDefaultChild = () => {

    return (
        <Container>
            <ImgContainer>
                <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
            </ImgContainer>
            <TextContainer>
                Карусель пуста
            </TextContainer>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 20% 5%;
  background-color: #f5bee8;
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

