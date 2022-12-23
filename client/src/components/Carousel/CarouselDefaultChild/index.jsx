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
                Здесь должен быть элемент
            </TextContainer>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5bee8;
`

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
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
  font-size: 20px;
  height: 30%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

