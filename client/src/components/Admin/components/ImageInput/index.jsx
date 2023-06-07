import * as React from "react";
import styled from "styled-components";
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

    async function downloadImageHandler(item) {
        const file = item.target.files[0];
        const imagePath = await new Promise((resolve) => {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                resolve(reader.result);
            }
        })
        onChange(imagePath)
    }

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ImgBlock h={h} w={w} br={br}>
                <Block h={h} w={w} br={br}>
                    <TextBlock>
                        Нажмите для загрузки изображения
                    </TextBlock>
                </Block>
                {(value !== '' && value)?
                    <Img src={(/^\//.test(value))? `${baseUrl}${value}` : value}/>
                    : <NoImg src={`${attributeFilesUrl}/no-image.png`}/>
                }
                <Input
                    type={'file'}
                    accept={mimeTypes}
                    onChange={downloadImageHandler}
                />
            </ImgBlock>
        </ContainerBlock>
    )

}

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 10px;
  height: ${({h}) => h};
  width: ${({w}) => w};
  border-radius: ${({br}) => br};
  color: #ffffff;
  background-color: rgba(112, 112, 112, 0.6);
  &:hover {
    background-color: rgb(77, 77, 77, 0.6);
  }
`

const TextBlock = styled.div`
  text-align: center;
`

const ImgBlock = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
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