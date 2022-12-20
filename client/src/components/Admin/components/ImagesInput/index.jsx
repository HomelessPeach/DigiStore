import * as React from "react";
import styled from "styled-components";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const CarouselImageInput = (props) => {

    const {
        value,
        label,
        size: {h = '440px', w = '960px', br = '10px'} = {h: '440px', w: '960px', br: '10px'},
        onChange
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }

        </ContainerBlock>
    );
}

const Carousel = styled.div`
  border: 1px solid ${({theme}) => theme.colors.primary};
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
`

const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
`