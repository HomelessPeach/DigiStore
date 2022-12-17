import * as React from "react";
import styled from "styled-components";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const CarouselImageInput = (props) => {

    const {
        value,
        label,
        size: {h = '440px', w = '960px', br = '10px'} = {h: '440px', w: '960px', br: '10px'},
        // onChange
    } = props

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const data = [{
        image_path: 'https://www.meme-arsenal.com/memes/1a0d126c09ef9859f5946bde0c3a79ef.jpg'
    }, {
        image_path: 'https://abrakadabra.fun/uploads/posts/2021-12/1640388888_5-abrakadabra-fun-p-kosmos-na-rabochii-stol-telefona-5.jpg'
    }]

    return (
        <ContainerBlock>
            {
                (label)?
                    <LabelBlock>{label}</LabelBlock>
                    :null
            }
            <Carousel {...settings} h={h} w={w} br={br}>
                {data.map((item) =>

                        <Img src={item.image_path} alt={''}/>

                )}
            </Carousel>
        </ContainerBlock>
    );
}

const Carousel = styled(Slider)`
  border: 1px solid ${({theme}) => theme.colors.primary};
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
`

const Img = styled.img`
  height: inherit;
  width: inherit;
  border-radius: inherit;
`