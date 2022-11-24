import styled from "styled-components";
import * as React from "react";
import {baseUrl, attributeFilesUrl} from "../../../../services";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ImageInput = (props) => {

    const {
        value,
        label,
        size: {h = '100%', w = '100%', br = '20px'} = {h: '100%', w: '100%', br: '20px'}
    } = props

    return (
        <ContainerBlock>
            {
                (label)?
                    <LabelBlock>{label}</LabelBlock>
                    :null
            }
            <ImgBlock h={h} w={w} br={br}>
                <Block h={h} w={w} br={br}>Нажмите чтобы загрузить изображение</Block>
                {
                    (value !== '' && value)?
                        <Img src={`${baseUrl}${value}`}/>
                        : <NoImg src={`${attributeFilesUrl}/no-image.png`}/>
                }
            </ImgBlock>
        </ContainerBlock>
    )

}

const Block = styled.div`
  position: absolute;
  padding: 10px;
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background-color: rgba(112, 112, 112, 0.6);
  &:hover {
    background-color: rgb(77, 77, 77, 0.6);
  }
`

const ImgBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  user-select: none;
  overflow:hidden
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const NoImg = styled.img`
  max-width: 50%;
  max-height: 50%;
`