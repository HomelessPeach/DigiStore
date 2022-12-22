import * as React from "react";
import styled from "styled-components"
import {baseUrl} from "../../services";
import {Carousel} from "../../components/Carousel";

export const Home = () => {

    return(
        <Container>
            <CarouselBlock>
                <Carousel
                    carouselWidth={1000}
                    aspect={16/9}
                    button={true}
                    infinity={true}
                    dots={true}
                    scroll={true}
                    scrollSpeed={10}
                    itemsToShow={1}
                >
                </Carousel>
            </CarouselBlock>
            <Card>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div>MacBook 16, 2021</div>
                    <div>Новинка</div>
                </TextBlock>
            </Card>
            <Card>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div>MacBook 16, 2021</div>
                    <div>Новинка</div>
                </TextBlock>
            </Card>
            <Card>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div>MacBook 16, 2021</div>
                    <div>Новинка</div>
                </TextBlock>
            </Card>
            <Card>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div>MacBook 16, 2021</div>
                    <div>Новинка</div>
                </TextBlock>
            </Card>
        </Container>
    )
}

const Container = styled.div`
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const Card = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 0 5px 0;
  border-radius: 20px;
  padding: 30px;
`

const ImageBlock = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const TextBlock = styled.div`
  width: 70%;
  height: 100%;
  padding: 0 30px;
`

const CarouselBlock = styled.div`
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 10px;
  margin: 50px auto;
`