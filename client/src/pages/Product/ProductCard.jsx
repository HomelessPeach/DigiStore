import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {useParams} from "react-router-dom";
import {productAPI} from "../../services/ProductService";
import {attributeFilesUrl, baseUrl} from "../../services";
import {NotFound} from "../NotFound";
import {Carousel} from "../../components/Carousel";
import {priceFormat} from "../../utils";
import {Basket, Heart, Star} from "../../components/Icons";
import {UserSlice} from "../../store/reducers/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {ProductReview} from "../../components/ProductReview";
import {MarkField} from "../../components/MarkField";
import {TextField} from "../../components/TextField";
import {ProductReviewsList} from "../../components/ProductReviewsList";
import {Breadcrumb} from "../../components/Breadcrumb";
import {RouteNames} from "../../Router";
import {userAPI} from "../../services/UserService";

export const ProductCard = () => {

    const {id} = useParams()
    const {data, isLoading} = productAPI.useGetProductQuery(id, {refetchOnFocus: true})
    const {data: reviewData, isLoading: reviewIsLoading} = productAPI.useGetProductReviewsQuery({id: id, offset: 0, limit: 2}, {refetchOnFocus: true})
    const {addToBasket, addToFavorite, removeFromBasket, removeFromFavorite} = UserSlice.actions
    const {data: user, basket, wishList} = useSelector(state => state.user)
    const [deleteReview] = productAPI.useDeleteProductReviewMutation()
    const dispatch = useDispatch()
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [setFavoriteProduct] = userAPI.useSetUserFavoriteProductMutation()

    async function handleSetBasket(isBasket) {
        if (user) {
            await setFavoriteProduct({fk_product: id, fk_user: user.id, is_basket: isBasket})
        }
    }

    async function handleSetFavorite(isFavorite) {
        if (user) {
            await setFavoriteProduct({fk_product: id, fk_user: user.id, is_favorite: isFavorite})
        }
    }

    async function deleteReviewHandler(reviewId) {
        await deleteReview({productId: id, reviewId: reviewId})
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    if (isLoading || reviewIsLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotFound/>

    return (
        <ProductContainer>
            <ProductCardBlock>
                <BreadcrumbWrapper>
                    <Breadcrumb links={[
                        {link: RouteNames.HOME, name: 'Главная страница'},
                        {link: RouteNames.PRODUCT, name: 'Категории продукции'},
                        {link: `${RouteNames.PRODUCT}${RouteNames.CATEGORY}/${data?.product_category?.product_category_id}`, name: `${data?.product_category?.product_category_name || ''}`},
                        {link: null, name: `${data.product_name || ''}`}
                    ]}/>
                </BreadcrumbWrapper>
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
                                            <Img src={`${baseUrl}${item?.image_path}`}/>
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
                            {(user)?
                                <AddToFavorite
                                    onClick={() => {
                                        const product = {
                                            id: data.product_id,
                                            image: data.product_images[0]?.image_path,
                                            name: data.product_name,
                                            price: data.product_price,
                                        }
                                        if (!wishList.filter((product) => product.id === data.product_id).length) {
                                            dispatch(addToFavorite(product))
                                            handleSetFavorite(true)
                                        } else {
                                            dispatch(removeFromFavorite(product))
                                            handleSetFavorite(false)
                                        }
                                    }}
                                    inWishList={wishList.filter((product) => product.id === data.product_id).length}
                                >
                                    <ButtonIcon>
                                        <Heart/>
                                    </ButtonIcon>
                                    <ButtonText>
                                        В избранное
                                    </ButtonText>
                                </AddToFavorite>
                                :null
                            }
                        </MainInfoBlock>
                        <MainInfoBlock>
                            {(data?.in_stock)?
                                <>
                                    <AddToBasket
                                        onClick={() => {
                                            const product = {
                                                id: data.product_id,
                                                image: data.product_images[0]?.image_path,
                                                name: data.product_name,
                                                price: data.product_price,
                                                in_stock: data.in_stock || 0,
                                                count: 1
                                            }
                                            if (!basket.filter((product) => product.id === data.product_id).length) {
                                                dispatch(addToBasket(product))
                                                handleSetBasket(true)
                                            } else {
                                                dispatch(removeFromBasket(product))
                                                handleSetBasket(false)
                                            }
                                        }}
                                        inBasket={basket.filter((product) => product.id === data.product_id).length}
                                    >
                                        <ButtonIcon>
                                            <Basket/>
                                        </ButtonIcon>
                                        <ButtonText>
                                            Добавить в корзину
                                        </ButtonText>
                                    </AddToBasket>
                                    <InStockBlock>В наличии: {data.in_stock}</InStockBlock>
                                </>
                                :
                                <InStockBlock>Нет в наличии</InStockBlock>
                            }
                            <ProductPrice>
                                Цена: {priceFormat(data.product_price)}р
                            </ProductPrice>
                        </MainInfoBlock>
                    </MainInfo>
                </MainBlock>
                <InfoBlock>
                    <DescriptionBlock>
                        {data.product_description}
                    </DescriptionBlock>
                    <ProductInfoBlock>
                        <ProductInfoTitle>
                            Характеристики
                        </ProductInfoTitle>
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
                    </ProductInfoBlock>
                    <ProductInfoBlock>
                        <ProductInfoTitle>
                            Отзывы
                        </ProductInfoTitle>
                        <ProductReview productId={data.product_id}/>
                        <ProductReviewContainer>
                            {reviewData.map((item, index) =>
                                <ProductReviewBlock key={index} my={item.fk_user === user?.id}>
                                    <HeaderLineReview>
                                        <UserInfo>
                                            <UserAvatar>
                                                <Img src={(item.users?.image?.image_path)? `${baseUrl}${item.users?.image?.image_path}`:`${attributeFilesUrl}/mask-1.svg`}/>
                                            </UserAvatar>
                                            <UserName>
                                                {item.users?.user_name}
                                            </UserName>
                                        </UserInfo>
                                        <ReviewRatingBlock>
                                            <MarkField value={item.review_rating}/>
                                        </ReviewRatingBlock>
                                    </HeaderLineReview>
                                    <TextField value={item.review_description}/>
                                    {(item.fk_user === user?.id)?
                                        <DeleteButton
                                            onClick={() => {
                                                deleteReviewHandler(item.review_id)
                                            }}
                                        >
                                            Удалить отзыв
                                        </DeleteButton>
                                        :null
                                    }
                                </ProductReviewBlock>
                            )
                            }
                            <ShowAllReview>
                                <ShowCommentButton
                                    onClick={() => setShowAllReviews(true)}
                                >
                                    Показать все отзывы
                                </ShowCommentButton>
                            </ShowAllReview>
                        </ProductReviewContainer>
                        {showAllReviews &&
                            <ProductReviewsList productId={data.product_id} closeProductReviewsList={() => setShowAllReviews(false)}/>
                        }
                    </ProductInfoBlock>
                </InfoBlock>
            </ProductCardBlock>
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const BreadcrumbWrapper = styled.div`
  padding: 0 0 20px;
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
  width: 750px;
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
  padding: 35px 30px;
  margin-bottom: 90px;
`

const MainInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  background-color: ${({inWishList}) => (inWishList)? '#888888' : '#ff0000'};
  fill: ${({inWishList}) => (inWishList)? '#ff0000' : '#000000'};
  color:  ${({inWishList}) => (inWishList)? '#b70000' : '#000000'};;
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
  background-color: ${({theme, inBasket}) => (inBasket)? '#888888' : theme.colors.tertiary};
  fill: ${({theme, inBasket}) => (inBasket)? theme.colors.tertiary: '#000000'};
  color: ${({inBasket}) => (inBasket)? '#840088': '#000000'};
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
  line-height: 1.5;
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

const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ProductInfoTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1.5;
  font-size: 25px;
  padding: 0 30px;
  color: #888888;
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const ProductReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px 0;
`

const ProductReviewBlock = styled.div`
  width: 100%;
  box-shadow: 0 0 3px 0 #888888;
  border-radius: 10px;
  padding: 30px 50px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  background-color: ${({my}) => (my)? 'rgba(177, 58, 142, 0.1)' : '#ffffff'};
`

const HeaderLineReview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
`

const UserAvatar = styled.div`
  width: 70px;
  height: 70px;
  border: 1px solid black;
  border-radius: 50%;
  overflow: hidden;
`

const UserName = styled.div`
  font-size: 23px;
  padding: 20px 0 0;
`

const ReviewRatingBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0 0;
`

const ShowAllReview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ShowCommentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 35px;
  background-color: #bdbdbd;
  border-radius: 10px;
  color: #4b4b4b;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  margin: 10px 0;
  user-select: none;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 35px;
  background-color: #d31515;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  user-select: none;
  &:active {
    box-shadow: none;
  }
`

const InStockBlock = styled.div`
  font-size: 20px;
  padding: 0 10px;
`