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

    console.log(data)

    return (
        <NewsCardBlock>
            <ImageBlock>
                <Img src={`${baseUrl}${data.image.image_path}`}/>
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
  height: 600px;
  background-color: #fde4f3;
`

const Img = styled.img`
  height: 100%;
`

const NewsNameBlock = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  height: 25%;
  padding: 0 150px 35px 350px;
  width: 100%;
  background: linear-gradient(to top, #5e5e5e 0%, rgba(255, 255, 255, 0) 100%);
`

const NewsName = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 50px;
  color: #000000;
`

const NewsShortDescriptionBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 35px 350px;
  width: 100%;
  background-color: #e7e7e7;
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
  padding: 35px 350px;
  width: 100%;
  background-color: #ffffff;
`

const NewsDescription = styled.div`
  width: 100%;
`