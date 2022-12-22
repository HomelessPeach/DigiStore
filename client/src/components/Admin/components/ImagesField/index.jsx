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
                w={w}
                br={br}
            >
                <ImgBlock h={h} w={w} br={br}>
                    {(activeImage)?
                        <Img src={`${baseUrl}${activeImage.image_path}`}/>
                        : <NoImg src={`${attributeFilesUrl}/mask-1.svg`}/>
                    }
                </ImgBlock>
                {(value.length)?
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
                                value.map((item, index) =>
                                    (
                                        <ImgCarouselContainer
                                            key={index}
                                        >
                                            <ImgCarousel
                                                br={br}
                                                onClick={() => setActiveImage(item)}
                                                src={`${baseUrl}${item.image_path}`}
                                            />
                                        </ImgCarouselContainer>
                                    )
                                )
                            }
                        </Carousel>
                    </CarouselContainer>
                    :null
                }
            </ValueBlock>
        </ContainerBlock>
    )

}

const ValueBlock = styled.div`
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

const CarouselContainer = styled.div`
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  border-radius: ${({br}) => br}px;
`

const ImgCarouselContainer = styled.div`
  position: relative;
  padding: 10px 5px;
`

const ImgCarousel = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${({br}) => br}px;;
`