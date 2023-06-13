import * as React from "react";
import styled from "styled-components"
import {useParams} from "react-router-dom";
import {newsAPI} from "../../services/NewsService";
import {baseUrl} from "../../services";
import {formattedText} from "../../utils";

export const NewsCard = () => {

    const {id} = useParams()
    const {data, isLoading} = newsAPI.useGetNewsQuery(id, {refetchOnFocus: true})

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <NewsCardBlock>
            <ImageBlock>
                <Img src={`${baseUrl}${data.image?.image_path}`}/>
                <NewsNameBlock>
                    <NewsName>
                        {data.news_name}
                    </NewsName>
                </NewsNameBlock>
            </ImageBlock>
            <NewsShortDescriptionBlock>
                <NewsShortDescription>
                    {formattedText(data.news_short_description)}
                </NewsShortDescription>
            </NewsShortDescriptionBlock>
            <NewsDescriptionBlock>
                <NewsDescription dangerouslySetInnerHTML={{__html: data.news_description}}/>
            </NewsDescriptionBlock>
        </NewsCardBlock>
    )
}

const NewsCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ImageBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  background-color: #fde4f3;
`

const Img = styled.img`
  width: 100%;
`

const NewsNameBlock = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  height: 25%;
  padding: 0 15% 35px;
  width: 100%;
  background: linear-gradient(to top, #5e5e5e 0%, rgba(255, 255, 255, 0) 100%);
  @media (${({theme}) => theme.media.extraLarge}) {
    padding: 35px 15%;
  }
  @media (${({theme}) => theme.media.large}) {
    padding: 35px 10%;
  }
  @media (${({theme}) => theme.media.medium}) {
    padding: 35px 5%;
  }
`

const NewsName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 50px;
  color: #efefef;
  font-weight: bolder;
  @media (${({theme}) => theme.media.medium}) {
    font-size: 40px;
  }
  @media (${({theme}) => theme.media.small}) {
    font-size: 30px;
  }
`

const NewsShortDescriptionBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 20%;
  width: 100%;
  background-color: #e7e7e7;
  @media (${({theme}) => theme.media.extraLarge}) {
    padding: 35px 15%;
  }
  @media (${({theme}) => theme.media.large}) {
    padding: 35px 10%;
  }
  @media (${({theme}) => theme.media.medium}) {
    padding: 35px 5%;
  }
`

const NewsShortDescription = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 25px;
  color: #696969;
`

const NewsDescriptionBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 20%;
  width: 100%;
  background-color: #ffffff;
  @media (${({theme}) => theme.media.extraLarge}) {
    padding: 35px 15%;
  }
  @media (${({theme}) => theme.media.large}) {
    padding: 35px 10%;
  }
  @media (${({theme}) => theme.media.medium}) {
    padding: 35px 5%;
  }
`

const NewsDescription = styled.div`
  width: 100%;
`