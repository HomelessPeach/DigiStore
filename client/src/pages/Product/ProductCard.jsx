import * as React from "react";
import styled from "styled-components"
import {useParams} from "react-router-dom";
import {productAPI} from "../../services/ProductService";
import {baseUrl} from "../../services";
import {NotFound} from "../NotFound";
import {Carousel} from "../../components/Carousel";
import {priceFormat} from "../../utils";
import {Basket, Heart, Star} from "../../components/Icons";

export const ProductCard = () => {

    const {id} = useParams()
    const {data, isLoading} = productAPI.useGetProductQuery(id, {refetchOnFocus: true})

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotFound/>

    console.log(data)

    return (
        <ProductContainer>
            <ProductCardBlock>
                <MainBlock>
                    <NameImageContainer>
                        <CarouselBlock>
                            <Carousel
                                carouselWidth={750}
                                aspect={16/9}
                                button={true}
                                infinity={true}
                                dots={true}
                                scroll={true}
                                scrollSpeed={10}
                                itemsToShow={1}
                            >
                                {
                                    data.product_images.map((item, index) =>
                                        <ImageBlock key={index}>
                                            <Img src={`${baseUrl}${item.image_path}`}/>
                                        </ImageBlock>
                                    )
                                }
                            </Carousel>
                        </CarouselBlock>
                        <NameBlock>
                            {data.product_name}
                        </NameBlock>
                    </NameImageContainer>
                    <MainInfo>
                        <MainInfoBlock>
                            <RatingProduct>
                                <RatingIcon>
                                    <Star/>
                                </RatingIcon>
                                <ProductRating>
                                    {data.product_rating.toFixed(1)}
                                </ProductRating>
                            </RatingProduct>
                            <AddToFavorite>
                                <ButtonIcon>
                                    <Heart/>
                                </ButtonIcon>
                                <ButtonText>
                                    В избранное
                                </ButtonText>
                            </AddToFavorite>
                        </MainInfoBlock>
                        <MainInfoBlock>
                            <AddToBasket>
                                <ButtonIcon>
                                    <Basket/>
                                </ButtonIcon>
                                <ButtonText>
                                    Добавить в корзину
                                </ButtonText>
                            </AddToBasket>
                            <ProductPrice>
                                Цена: {priceFormat(data.product_price)}р
                            </ProductPrice>
                        </MainInfoBlock>
                    </MainInfo>
                </MainBlock>
                <DescriptionBlock>
                    {data.product_description}
                </DescriptionBlock>
                <FeaturesBlock>
                    {
                        data.product_feature_values.map((item, index) =>
                            <FeaturesRow key={index}>
                                <FeatureName>
                                    {item.product_feature.product_feature_name}
                                </FeatureName>
                                <Diver/>
                                <FeatureValue>
                                    {item.product_features_values_value}
                                </FeatureValue>
                            </FeaturesRow>
                        )
                    }
                </FeaturesBlock>
            </ProductCardBlock>
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const ProductCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 1200px;
  gap: 20px;
  padding: 50px;
  background-color: #ffffff;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #888888;
`

const MainBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`

const NameImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const NameBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1.5;
  font-size: 40px;
  color: #888888;
`

const CarouselBlock = styled.div`
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 10px;
`

const ImageBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  border-radius: 10px;
  width: 300px;
  background-color: #dcdcdc;
  padding: 30px 20px;
  margin-bottom: 90px;
`

const MainInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
`

const RatingProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  background-color: #f3f3f3;
  padding: 10px;
  user-select: none;
`

const RatingIcon = styled.div`
  width: 50px;
  height: 50px;
  fill: #fac917;
`

const ProductRating = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  line-height: 1.5;
  font-size: 30px;
  color: #000000;
`

const AddToFavorite = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #ff0000;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 0 10px 0 #888888;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const AddToBasket = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 0 10px 0 #888888;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const ButtonIcon = styled.div`
  width: 25px;
  height: 25px;
  fill: #000000;
`

const ButtonText = styled.div`
  text-align: center;
  padding: 5px 5px 5px 15px;
  font-size: 16px;
`

const ProductPrice = styled.div`
  border-radius: 10px;
  background-color: #f3f3f3;
  font-size: 30px;
  padding: 10px;
`

const DescriptionBlock = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: #dcdcdc;
`

const FeaturesBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  border: 1px solid #888888;
  border-radius: 10px;
`

const FeaturesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  line-height: 1.5;
  color: #000000;
  height: 40px;
  padding: 10px 0;
  flex-shrink: 2;
`

const FeatureName = styled.div`
  white-space: nowrap;
  padding: 0 30px 0 0;
`

const FeatureValue = styled.div`
  white-space: nowrap;
  padding: 0 0 0 30px;
`

const Diver = styled.div`
  height: 100%;
  width: 100%;
  min-width: 100px;
  border-bottom: 3px dotted #000000;
`