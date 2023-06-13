import * as React from "react";
import styled from "styled-components";
import {productAPI} from "../../services/ProductService";
import {useSelector} from "react-redux";
import {attributeFilesUrl, baseUrl} from "../../services";
import {MarkField} from "../MarkField";
import {TextField} from "../TextField";
import {Cross} from "../Icons";

export const ProductReviewsList = (props) => {

    const {
        productId,
        closeProductReviewsList
    } = props

    const {data: reviewData, isLoading: reviewIsLoading} = productAPI.useGetProductReviewsQuery({id: productId}, {refetchOnFocus: true})
    const {data: user} = useSelector(state => state.user)
    const [deleteReview] = productAPI.useDeleteProductReviewMutation()

    async function deleteReviewHandler(reviewId) {
        await deleteReview({productId: productId, reviewId: reviewId})
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    if (reviewIsLoading)
        return (
            <ProductReviewsListContainer>
                <ProductReviewsListBlock>
                    Loading...
                </ProductReviewsListBlock>
            </ProductReviewsListContainer>
        )

    return (
        <ProductReviewsListContainer
            onClick={closeProductReviewsList}
        >
            <ProductReviewsListBlock
                onClick={(event) => event.stopPropagation()}
            >
                <CloseButton
                    onClick={closeProductReviewsList}
                >
                    <Cross/>
                </CloseButton>
                <TextBlock>
                    Отзывы
                </TextBlock>
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
                                onClick={() => deleteReviewHandler(item.review_id)}
                            >
                                Удалить отзыв
                            </DeleteButton>
                            :null
                        }
                    </ProductReviewBlock>
                )
                }
            </ProductReviewsListBlock>
        </ProductReviewsListContainer>
    )
}

const ProductReviewsListContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background-color: rgba(150, 150, 150, 0.52);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ProductReviewsListBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 900px;
  height: 500px;
  padding: 50px;
  border-radius: 20px;
  background-color: white;
  overflow: scroll;
  @media (${({theme}) => theme.media.extraLarge}) {
    width: 600px;
    height: 400px;
    margin: 0 0 40px;
    padding: 35px;
  }
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
  @media (${({theme}) => theme.media.medium}) {
    align-items: flex-start;
    flex-direction: column-reverse;
  }
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


const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const TextBlock = styled.div`
  font-size: 23px;
  user-select: none;
`

const DeleteButton = styled.div`
  user-select: none;
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
  &:active {
    box-shadow: none;
  }
`

const CloseButton = styled.div`
  width: 30px;
  position: absolute;
  right: 20px;
  top: 25px;
  fill: #888888;
  &:hover {
    fill: #ff0000;
  }
`