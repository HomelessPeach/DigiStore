import * as React from "react";
import styled from "styled-components"
import {NavLink} from "react-router-dom";
import {productCategoryAPI} from "../../services/ProductCategoryService";
import {baseUrl} from "../../services";
import {RouteNames} from "../../Router";
import {NotFound} from "../NotFound";

export const ProductCategory = () => {

    const {data, isLoading} = productCategoryAPI.useGetProductCategoriesQuery({refetchOnFocus: true})

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotFound/>

    return(
        <ProductCategoryContainer>
            <HeaderTitle>
                Категории товаров
            </HeaderTitle>
            <ProductCategoriesWrapper>
                {
                    data.map((item, index) =>
                        <ProductCategoryCard
                            key={index}
                            to={`${RouteNames.PRODUCT}/category/${item.product_category_id}`}
                        >
                            <ImageBlock>
                                <Img src={`${baseUrl}${item?.image?.image_path}`}/>
                            </ImageBlock>
                            <TextBlock>
                                {item.product_category_name}
                            </TextBlock>
                        </ProductCategoryCard>
                    )
                }
            </ProductCategoriesWrapper>
        </ProductCategoryContainer>
    )
}

const ProductCategoryContainer = styled.div`
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (${({theme}) => theme.media.extraLarge}) {
    padding: 0 150px;
  }
  @media (${({theme}) => theme.media.large}) {
    padding: 0 80px;
  }
  @media (${({theme}) => theme.media.medium}) {
    padding: 0 30px;
  }
`

const HeaderTitle = styled.div`
  line-height: 1.5;
  font-size: 40px;
  color: #888888;
  font-weight: bolder;
  padding: 50px 8% 25px;
  @media (${({theme}) => theme.media.medium}) {
    font-size: 30px;
  }
`

const ProductCategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 100px;
  padding: 25px 0 100px;
  background-color: #ffffff;
  width: 100%;
  @media (${({theme}) => theme.media.medium}) {
    gap: 70px;
  }
  @media (${({theme}) => theme.media.small}) {
    gap: 50px;
  }
`

const ProductCategoryCard = styled(NavLink)`
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 20px;
  padding: 30px;
  background-color: #ffffff;
  text-decoration: none;
  @media (${({theme}) => theme.media.extraLarge}) {
    height: 320px;
    width: 240px;
  }
  @media (${({theme}) => theme.media.medium}) {
    height: 280px;
    width: 210px;
  }
  @media (${({theme}) => theme.media.small}) {
    height: 200px;
    width: 150px;
  }
`

const ImageBlock = styled.div`
  max-width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const TextBlock = styled.div`
  width: 100%;
  height: 20%;
  padding: 20px 30px;
  font-size: 24px;
  color: #888888;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  @media (${({theme}) => theme.media.medium}) {
    padding: 10px 20px;
    font-size: 20px;
  }
  @media (${({theme}) => theme.media.small}) {
    padding: 10px 20px;
    font-size: 16px;
  }
`
