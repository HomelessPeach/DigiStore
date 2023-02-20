import * as React from "react";
import styled from "styled-components";
import {attributeFilesUrl, baseUrl} from "../../services";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ImageField = (props) => {

    const {
        value = '',
        label,
        size: {h = '100%', w = '100%', br = '20px'} = {h: '100%', w: '100%', br: '20px'}
    } = props


    return (
        <ContainerBlock>
            {label &&
                <LabelBlock>{label}</LabelBlock>
            }
            <ImgBlock h={h} w={w} br={br}>
                {(value !== '' && value)?
                    <Img src={`${baseUrl}${value}`}/>
                    : <NoImg src={`${attributeFilesUrl}/mask-1.svg`}/>
                }
            </ImgBlock>
        </ContainerBlock>
    )

}

const ImgBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  overflow:hidden
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const NoImg = styled.img`
  max-width: 70%;
  max-height: 70%;
`