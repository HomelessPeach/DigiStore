import * as React from "react";
import styled from "styled-components"
import {NavLink, useParams} from "react-router-dom";
import {productAPI} from "../../services/ProductService";
import {productCategoryAPI} from "../../services/ProductCategoryService";
import {RouteNames} from "../../Router";
import {NotFound} from "../NotFound";
import {baseUrl} from "../../services";
import {Basket, Heart, Star} from "../../components/Icons";
import {priceFormat} from "../../utils";

export const Product = () => {

    const {categoryId} = useParams()
    const {data, isLoading} = productAPI.useGetProductsQuery({productCategoryId: categoryId}, {refetchOnFocus: true})
    const {data: productCategory, isLoading: titleIsLoading} = productCategoryAPI.useGetProductCategoryNameQuery(categoryId, {refetchOnFocus: true})

    if (isLoading || titleIsLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading || !data.length)
        return <NotFound/>

    return (
        <ProductContainer>
            <CategoryName>
                {productCategory?.product_category_name}
            </CategoryName>
            <ProductWrapper>
                {
                    data.map((item, index) =>
                        <ProductCard
                            key={index}
                            to={`${RouteNames.PRODUCT}/show/${item.product_id}`}
                        >
                            <ImageBlock>
                                <Img src={`${baseUrl}${item.product_images[0].image.image_path}`}/>
                            </ImageBlock>
                            <InfoBlock>
                                <ProductTitle>
                                    {item.product_name}
                                </ProductTitle>
                                <ProductInfo>
                                    {item.product_description}
                                </ProductInfo>
                                <ProductPriceAndActionsBlock>
                                    <ProductPrice>
                                        {priceFormat(item.product_price)}р
                                    </ProductPrice>
                                    <ProductActions>
                                        <ActionsBlock>
                                            <RatingBlock>
                                                <RatingIconBlock>
                                                    <Star/>
                                                </RatingIconBlock>
                                                <RatingTextBlock>
                                                    {item.product_rating.toFixed(1)}
                                                </RatingTextBlock>
                                            </RatingBlock>
                                            <AddToBasket>
                                                <Basket/>
                                            </AddToBasket>
                                            <AddToFavorite>
                                                <Heart/>
                                            </AddToFavorite>
                                        </ActionsBlock>
                                    </ProductActions>
                                </ProductPriceAndActionsBlock>
                            </InfoBlock>
                        </ProductCard>
                    )
                }
            </ProductWrapper>
        </ProductContainer>
    )

}

const ProductContainer = styled.div`
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const CategoryName = styled.div`
  line-height: 1.5;
  font-size: 40px;
  color: #888888;
  font-weight: bolder;
  padding: 50px 0 25px;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  padding: 25px 0 100px;
  background-color: #ffffff;
  width: 100%;
`

const ProductCard = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  height: 15vw;
  min-width: 600px;
  min-height: 150px;
  padding: 1.5vw;
  background-color: #ffffff;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 20px;
`

const ImageBlock = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const InfoBlock = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  padding: 0 0 0 2vw;
`

const ProductTitle = styled.div`
  line-height: 1.5;
  font-size: 30px;
  color: #888888;
  height: 30%;
`

const ProductInfo = styled.div`
  height: 60%;
  line-height: 1.5;
  font-size: 15px;
  color: #000000;
  overflow: hidden;
`

const ProductPriceAndActionsBlock = styled.div`
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ProductPrice = styled.div`
  height: 100%;
  max-width: 40%;
  line-height: 1.5;
  font-size: 25px;
  color: #000000;
`

const ProductActions = styled.div`
  height: 100%;
  max-width: 50%;
`

const RatingBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
`

const RatingIconBlock = styled.div`
  width: 20px;
  height: 20px;
  fill: #fac917;
`

const RatingTextBlock = styled.div`
  line-height: 1.5;
  font-size: 18px;
  color: #000000;
`

const ActionsBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;
  gap: 10px
`

const AddToBasket = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({theme}) => theme.colors.tertiary};
  fill: #000000;
  border-radius: 5px;
  padding: 5px;
`

const AddToFavorite = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ff0000;
  fill: #000000;
  border-radius: 5px;
  padding: 5px;
`