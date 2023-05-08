import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {productAPI} from "../../services/ProductService";
import {newsAPI} from "../../services/NewsService";
import {attributeFilesUrl, baseUrl} from "../../services";
import {Carousel} from "../../components/Carousel";
import {RouteNames} from "../../Router";
import {New} from "../../components/Icons";


export const Home = () => {

    const navigate = useNavigate()
    const {
        data: productData,
        isLoading: productIsLoading
    } = productAPI.useGetProductForCarouselQuery({refetchOnFocus: true})
    const {data: newsData, isLoading: newsIsLoading} = newsAPI.useGetAllNewsQuery({refetchOnFocus: true})
    const [muteVideo, setMuteVideo] = useState(true)

    if (productIsLoading || newsIsLoading)
        return (
            <>
                <HeaderLargeContainer>
                    <ImageHeaderBlock>
                        <Img src={`${attributeFilesUrl}/logo2.svg`}/>
                    </ImageHeaderBlock>
                </HeaderLargeContainer>
                <h1>LOADING...</h1>
            </>
        )

    return (
        <>
            <HeaderLargeContainer>
                <ImageHeaderBlock>
                    <Img src={`${attributeFilesUrl}/logo2.svg`}/>
                </ImageHeaderBlock>
            </HeaderLargeContainer>
            <HomePage>
                {(productData) ?
                    <CarouselWrapper>
                        <CarouselBlock>
                            <Carousel
                                carouselWidth={1000}
                                aspect={16 / 9}
                                button={true}
                                infinity={true}
                                dots={true}
                                scroll={true}
                                scrollSpeed={10}
                                itemsToShow={1}
                            >
                                {
                                    productData.map((item, index) =>
                                        <ProductCardBlock
                                            onClick={() => {
                                                navigate(`${RouteNames.PRODUCT}/show/${item.product_id}`)
                                            }}
                                            key={index}
                                        >
                                            <Img src={`${baseUrl}${item.product_images[0]?.image.image_path}`}/>
                                            <BlockForIcon>
                                                <IconBlock>
                                                    <New/>
                                                </IconBlock>
                                            </BlockForIcon>
                                            <NameProduct>
                                                {item.product_name}
                                            </NameProduct>
                                        </ProductCardBlock>
                                    )
                                }
                            </Carousel>
                        </CarouselBlock>
                    </CarouselWrapper>
                    : null
                }
                {(newsData) ?
                    <NewsContainer>
                        <NewsTitle>
                            Блог
                        </NewsTitle>
                        <NewsBlock>
                            <Carousel
                                carouselWidth={window.innerWidth}
                                aspect={3 / 4}
                                roundButton={true}
                                infinity={true}
                                dots={false}
                                scroll={true}
                                scrollSpeed={15}
                                itemsToShow={5}
                            >
                                {
                                    newsData.map((item, index) =>
                                        <NewsCardWrapper key={index}>
                                            <NewsCard
                                                onClick={() => {
                                                    navigate(`${item.news_id}${RouteNames.NEWS}`)
                                                }}
                                            >
                                                <NewsNameImg>
                                                    <NewsImageBlock>
                                                        <ImgNews src={`${baseUrl}${item.image?.image_path}`}/>
                                                    </NewsImageBlock>
                                                    <NewsNameBlock>
                                                        <NewsName>
                                                            {item.news_name}
                                                        </NewsName>
                                                    </NewsNameBlock>
                                                </NewsNameImg>
                                                <NewsShortDescription>
                                                    <TextBlock>
                                                        {item.news_short_description}
                                                    </TextBlock>
                                                </NewsShortDescription>
                                            </NewsCard>
                                        </NewsCardWrapper>
                                    )
                                }
                            </Carousel>
                        </NewsBlock>
                    </NewsContainer>
                    : null
                }
                <VideoBlock>
                    <Video
                        autoPlay={true}
                        muted={muteVideo}
                        onEnded={(event) => {
                            setMuteVideo(true)
                            event.target.play()
                        }}
                        onClick={(event) => {
                            if (muteVideo) event.target.currentTime = 0;
                            setMuteVideo(!muteVideo)
                        }}
                    >
                        <source src={`${attributeFilesUrl}/dg-video.mp4`}/>
                    </Video>
                </VideoBlock>
            </HomePage>
        </>
    )
}

const HeaderLargeContainer = styled.div`
  height: ${({theme}) => theme.size.header.maxHeight}px;
  background-color: ${({theme}) => theme.colors.primary};
  transition: 0s;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageHeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({theme}) => theme.size.header.maxHeight}px;
  width: 1000px;
  color: #ffffff;
`


const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const HomePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 75px 0;
  width: 100%;
  background-color: #ffffff;
`

const CarouselBlock = styled.div`
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 10px;
  background-color: #ffffff;
`

const IconBlock = styled.div`
  width: 250px;
  padding: 30px;
  display: flex;
  transform: rotate(-30deg);
  align-items: center;
  fill: #f5bee8;
`

const BlockForIcon = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`

const ProductCardBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const NameProduct = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 120px;
  padding: 30px 50px;
  display: flex;
  align-items: center;
  color: #e0e0e0;
  font-size: 40px;
  background: linear-gradient(to right, ${({theme}) => theme.colors.tertiary} 0%, rgba(255, 255, 255, 0) 80%);
`

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px 0;
  background-color: #d3d3d3;
`

const NewsTitle = styled.div`
  line-height: 1.5;
  font-size: 40px;
  color: #888888;
  font-weight: bolder;
  padding: 0 150px 30px;
`

const NewsBlock = styled.div`
  background-color: #d3d3d3;
`

const NewsCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: default;
`

const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
`

const NewsNameImg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
`

const NewsImageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ImgNews = styled.img`
  height: 100%;
`

const NewsNameBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  height: 100px;
  padding: 0 20px 15px;
  background: linear-gradient(to top, ${({theme}) => theme.colors.tertiary} 0%, rgba(255, 255, 255, 0) 100%);
`

const NewsName = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  color: #efefef;
  font-size: 25px;
`

const NewsShortDescription = styled.div`
  width: 100%;
  height: 35%;
  background-color: #ececec;
  padding: 10px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextBlock = styled.div`
  height: 100%;
  width: 100%;
  font-size: 18px;
  line-height: 1.5;
  overflow: hidden;
  color: #000000;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

const VideoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 75px 0;
  background-color: #fde4f3;
  width: 100%;
`

const Video = styled.video`
  width: 1000px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #888888;
`