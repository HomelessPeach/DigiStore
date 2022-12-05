import styled from "styled-components";
import * as React from "react";
import {baseUrl, attributeFilesUrl} from "../../../../services";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

const mimeTypes = 'image/jpeg, image/png';

export const ImageInput = (props) => {

    const {
        value,
        label,
        size: {h = '100%', w = '100%', br = '20px'} = {h: '100%', w: '100%', br: '20px'},
        onChange
    } = props

    function clickHandler(item) {
        const files = item.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
            onChange(reader.result)
        };
    }

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
                        <Img src={(/^\//.test(value))? `${baseUrl}${value}` : value}/>
                        : <NoImg src={`${attributeFilesUrl}/no-image.png`}/>
                }
                <Input
                    type={'file'}
                    accept={mimeTypes}
                    onChange={clickHandler}
                />
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

const Input = styled.input`
  width: inherit;
  height: inherit;
  border-radius: inherit;
  position: absolute;
  opacity: 0;
`