import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {baseUrl, attributeFilesUrl} from "../../../../services";
import {Carousel} from "../../../Carousel";
import {Cross} from "../../../Icons";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

const mimeTypes = 'image/jpeg, image/png';

export const ImagesInput = (props) => {

    const {
        value,
        label,
        size: {h = 540, w = 960, br = 20} = {h: 540, w: 960, br: 20},
        onChange,
    } = props

    const [activeImage, setActiveImage] = useState(null)
    const [images, setImages] = useState([])

    useEffect(setItems, [value])

    useEffect(() => {
        if (images.length && (!activeImage || activeImage.is_delete)) {
            setActiveImage(images[0])
        }
        if (!images.length) {
            setActiveImage(null)
        }
    }, [images])

    function setItems() {
        if (value) {
            setImages(value.filter((item) => !item.is_delete))
        }
    }

    async function downloadImageHandler(item) {
        const files = item.target.files;
        const images = []
        for (let file of files) {
            const imagePath = await new Promise((resolve) => {
                let reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    resolve(reader.result);
                }
            })
            images.push({image_path: imagePath})
        }
        onChange(images)
    }

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ContentBlock
                br={br}
                w={w}
            >
                <ImgBlock h={h} w={w} br={br}>
                    <Block h={h} w={w} br={br}>
                        <TextBlock>
                            Нажмите для загрузки изображения
                        </TextBlock>
                    </Block>
                    {(activeImage)?
                        <Img src={(/^\//.test(activeImage.image_path))? `${baseUrl}${activeImage.image_path}` : activeImage.image_path}/>
                        : <NoImg src={`${attributeFilesUrl}/no-image.png`}/>
                    }
                    <Input
                        type={'file'}
                        accept={mimeTypes}
                        multiple={true}
                        onChange={downloadImageHandler}
                    />
                </ImgBlock>
                {(images.length)?
                    <CarouselContainer
                        br={br}
                    >
                        <Carousel
                            carouselWidth={w}
                            aspect={w/h}
                            roundButton={true}
                            buttonIn={false}
                            infinity={false}
                            dots={false}
                            scroll={false}
                            itemsToShow={4}
                        >
                            {
                                images.map((item, index) =>
                                    (
                                        <ImgCarouselContainer
                                            key={index}
                                        >
                                            <ImgCarousel
                                                br={br}
                                                onClick={() => setActiveImage(item)}
                                                src={(/^\//.test(item.image_path))? `${baseUrl}${item.image_path}` : item.image_path}
                                            />
                                            <PreviewImageBlock
                                                onClick={() => {
                                                    value.forEach((item) => {
                                                        if (item.is_preview) {
                                                            delete item.is_preview
                                                        }
                                                    })
                                                    item.is_preview = true
                                                    setItems()
                                                }}
                                            >
                                                {(item.is_preview)?
                                                    <IsPreviewImageBlock/>
                                                    :null}
                                            </PreviewImageBlock>
                                            <DeleteImageBlock
                                                onClick={() => {
                                                    item.is_delete = true
                                                    setItems()
                                                }}
                                            >
                                                <Cross/>
                                            </DeleteImageBlock>
                                        </ImgCarouselContainer>
                                    )
                                )
                            }
                        </Carousel>
                    </CarouselContainer>
                    :null
                }
            </ContentBlock>
        </ContainerBlock>
    )

}

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${({br}) => br + 5}px;
  width: ${({w}) => w + 20}px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #000000;
`

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 10px;
  height: ${({h}) => h}px;
  width: ${({w}) => w}px;
  border-radius: ${({br}) => br}px;
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
  align-items: center;
  height: ${({h}) => h}px;
  width: ${({w}) => w}px;
  border-radius: ${({br}) => br}px;
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

const CarouselContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  border-radius: ${({br}) => br}px;
`

const ImgCarouselContainer = styled.div`
  position: relative;
  padding: 10px 5px;
`

const DeleteImageBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 5px;
  z-index: 1;
  fill: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 1%;
  background-color: #ff0000;
  cursor: pointer;
  box-shadow: 0 0 5px 0 #727171;
`

const ImgCarousel = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({br}) => br}px;;
`

const PreviewImageBlock = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 5px;
  right: 30px;
  z-index: 1;
  fill: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 1%;
  background-color: #a8a8a8;
  box-shadow: 0 0 5px 0 #727171;
  cursor: pointer;
`

const IsPreviewImageBlock = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: #0da400;
`