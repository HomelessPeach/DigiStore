import * as React from "react";
import styled from "styled-components";
import {productAPI} from "../../services/ProductService";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {MarkInput} from "../MarkInput";
import {MarkField} from "../MarkField";
import {TextField} from "../TextField";

export const ProductReview = (props) => {

    const {
        productId,
    } = props

    const {data: user} = useSelector(state => state.user)
    const {data: review, isLoading} = productAPI.useGetProductReviewQuery({id: productId, userId: user?.id}, {refetchOnFocus: true})
    const [edit, setEdit] = useState(true)
    const [addComment, setAddComment] = useState(false)
    const [createReview] = productAPI.useCreateProductReviewMutation()
    const [updateReview] = productAPI.useUpdateProductReviewMutation()
    const [deleteReview] = productAPI.useDeleteProductReviewMutation()
    const [reviewData, setReviewData] = useState({fk_product: productId, fk_user: user?.id})

    async function createReviewHandler() {
        await createReview(reviewData)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    async function updateReviewHandler() {
        await updateReview(reviewData)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    async function deleteReviewHandler() {
        setEdit(true)
        setReviewData({fk_product: productId, fk_user: user?.id})
        await deleteReview({productId: productId, reviewId: review.review_id})
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (review) {
            setEdit(false)
            setReviewData({...reviewData, ...review})
        }
        if (review?.review_description) {
            setAddComment(true)
        }
    }, [review])

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ProductReviews>
            {(user)?
                (edit)?
                    <AddReview>
                        <ProductMark>
                            <ReviewText>
                                Оценка:
                            </ReviewText>
                            <MarkInput
                                value={reviewData.review_rating}
                                onChange={(value) => setReviewData({...reviewData, review_rating: value})}
                            />
                        </ProductMark>
                        {(addComment)?
                            <>
                                <ProductComment>
                                    <ReviewText>
                                        Отзыв
                                    </ReviewText>
                                    <MessageInput
                                        value={reviewData.review_description}
                                        rows={4}
                                        onChange={(event) => setReviewData({...reviewData, review_description: event.target.value})}
                                    />
                                </ProductComment>
                            </>
                            : null
                        }
                        {(addComment)?
                            <ButtonBlock>
                                <Button
                                    onClick={(review)? updateReviewHandler : createReviewHandler}
                                >
                                    Отправить
                                </Button>
                                {(review)?
                                    <DeleteButton
                                        onClick={deleteReviewHandler}
                                    >
                                        Удалить отзыв
                                    </DeleteButton>
                                    :null
                                }
                                <EditButton
                                    onClick={() => {
                                        setReviewData({...reviewData, review_description: ''})
                                        setAddComment(false)
                                    }}
                                >
                                    Отменить отзыв
                                </EditButton>
                            </ButtonBlock>
                            :
                            <ButtonBlock>
                                <AddCommentButton
                                    onClick={() => setAddComment(true)}>
                                    Добавить комментарий
                                </AddCommentButton>
                                <Button
                                    onClick={(review)? updateReviewHandler : createReviewHandler}
                                >
                                    Оценить
                                </Button>
                                {(review)?
                                    <DeleteButton
                                        onClick={deleteReviewHandler}
                                    >
                                        Удалить оценку
                                    </DeleteButton>
                                    :null
                                }
                            </ButtonBlock>
                        }

                    </AddReview>
                    :
                    <AddReview>
                        {(review?.review_description)?
                            <ProductReviewBlock>
                                <TextBlock>
                                    Ваш отзыв:
                                </TextBlock>
                                <MarkField value={review.review_rating}/>
                                <TextField value={review.review_description}/>
                                <ButtonBlock>
                                    <Button
                                        onClick={() => setEdit(true)}
                                    >
                                        Редактировать
                                    </Button>
                                    <DeleteButton
                                        onClick={deleteReviewHandler}
                                    >
                                        Удалить отзыв
                                    </DeleteButton>
                                </ButtonBlock>
                            </ProductReviewBlock>
                            :
                            <ProductReviewBlock>
                                <TextBlock>
                                    Ваша оценка:
                                </TextBlock>
                                <MarkField value={review?.review_rating}/>
                                <ButtonBlock>
                                    <Button
                                        onClick={() => setEdit(true)}
                                    >
                                        Редактировать
                                    </Button>
                                    <DeleteButton
                                        onClick={deleteReviewHandler}
                                    >
                                        Удалить оценку
                                    </DeleteButton>
                                </ButtonBlock>
                            </ProductReviewBlock>
                        }
                    </AddReview>
                : null
            }
        </ProductReviews>
    )
}

const ProductReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const AddReview = styled.div`
  width: 100%;
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 10px;
  padding: 30px 50px;
`

const ProductMark = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px 0;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
  }
`

const ReviewText = styled.div`
  font-size: 20px;
  line-height: 1.6;
`

const ProductComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`

const MessageInput = styled.textarea`
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 15px;
  line-height: 1.5;
  outline: none;
  width: 100%;
  resize: none;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 35px;
  background-color: ${({theme}) => theme.colors.tertiary};
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
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
  @media (${({theme}) => theme.media.medium}) {
    width: 100px;
    font-size: 13px;
  }
`

const AddCommentButton = styled.div`
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
  user-select: none;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
  @media (${({theme}) => theme.media.medium}) {
    width: 100px;
    font-size: 13px;
  }
`

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const ProductReviewBlock = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  background-color: #ffffff;
`

const TextBlock = styled.div`
  font-size: 23px;
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
  @media (${({theme}) => theme.media.medium}) {
    width: 100px;
    font-size: 13px;
  }
`

const EditButton = styled.div`
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
  user-select: none;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
  @media (${({theme}) => theme.media.medium}) {
    width: 100px;
    font-size: 13px;
  }
`