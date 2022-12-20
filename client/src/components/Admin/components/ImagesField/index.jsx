import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {baseUrl, attributeFilesUrl} from "../../../../services";
import {Carousel} from "../../../Carousel";
import {Cross} from "../../../Icons";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ImagesField = (props) => {

    const {
        value = [],
        label,
        size: {h = 540, w = 960, br = 20} = {h: 540, w: 960, br: 20},
    } = props

    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        if (value) {
            setActiveImage(value[0])
        }
    }, [value])

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock
                br={br}
            >
                <ImgBlock h={h} w={w} br={br}>
                    {(activeImage)?
                        <Img src={`${baseUrl}${activeImage.image_path}`}/>
                        : <NoImg src={`${attributeFilesUrl}/mask-1.svg`}/>
                    }
                </ImgBlock>
                {(value.length)?
                    <ImgCarousel
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
                            value.map((item) =>
                                (
                                    <ImgCarouselContainer>
                                        <ImgCarouselBlock
                                            br={br}
                                            onClick={() => setActiveImage(item.image_path)}
                                            src={`${baseUrl}${item.image_path}`}
                                        />
                                        <DeleteImageBlock
                                            onClick={() => setActiveImage(item)}
                                        >
                                            <Cross/>
                                        </DeleteImageBlock>
                                    </ImgCarouselContainer>
                                )
                            )
                        }
                    </ImgCarousel>
                    :null
                }
            </ValueBlock>
        </ContainerBlock>
    )

}

const ValueBlock = styled.div`
  border-radius: ${({br}) => br}px;
  padding: 5px;
`

const ImgBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({h}) => h}px;
  width: ${({w}) => w}px;
  border-radius: ${({br}) => br}px;
  border: 1px solid ${({theme}) => theme.colors.tertiary};
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

const ImgCarousel = styled(Carousel)`
  border-radius: ${({br}) => br}px;
  border: 1px solid #000000;
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
  background-color: red;
  cursor: pointer;
`

const ImgCarouselBlock = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({br}) => br}px;;
`