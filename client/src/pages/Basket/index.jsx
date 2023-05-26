import * as React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../Router";
import {baseUrl} from "../../services";
import {Delete} from "../../components/Icons";
import {CreateOrder} from "../../components/CreateOrder";
import {UserSlice} from "../../store/reducers/UserSlice"
import {priceFormat} from "../../utils";
import {userAPI} from "../../services/UserService";
import {productAPI} from "../../services/ProductService";
import {useEffect, useState} from "react";

export const Basket = () => {

    const {data: user, basket} = useSelector(state => state.user)
    const {setCountInBasket, removeFromBasket} = UserSlice.actions
    const [getBasket, {data: basketData}] = productAPI.useGetProductsByIdMutation()
    const [setFavoriteProduct] = userAPI.useSetUserFavoriteProductMutation()
    const [basketProduct, setBasketProduct] = useState([])
    const dispatch = useDispatch()

    async function handleSetBasket(productId, count) {
        if (user) {
            if (count > 0) {
                await setFavoriteProduct({fk_product: productId, fk_user: user.id, basket_count: count})
            } else {
                await setFavoriteProduct({fk_product: productId, fk_user: user.id, is_basket: false})
            }
        }
    }

    function getAllSum() {
        return basketProduct.reduce((result, item) => result + (item.price * item.count), 0)
    }

    useEffect(() => {
        if (basket.length) {
            getBasket(basket.map((item) => item.id))
        }
    }, [basket])

    useEffect(() => {
        if (basketData?.length) {
            const newBasketData = basket.map((product) => {
                const basketProduct = basketData.filter((item) => item.id === product.id)
                return {
                    ...basketProduct[0],
                    count: (basketProduct[0].in_stock < product.count)? basketProduct[0].in_stock : (product.count === 0)? 1 : product.count
                }
            })
            setBasketProduct(newBasketData)
        }
    }, [user?.id, basketData, basket])

    return (
        <BasketContainer>
            <HeaderTitle>
                Корзина
            </HeaderTitle>
            <BasketContent>
                {(basketProduct?.length)?
                    <>
                    {
                        basketProduct.map((item, index) =>
                            <BasketItem
                                key={index}
                                to={`${RouteNames.PRODUCT}/show/${item.id}`}
                            >
                                <ImageBlock>
                                    <Img src={`${baseUrl}${item.image}`}/>
                                </ImageBlock>
                                <DataBlock>
                                    <ProductTitle>
                                        {item.name}
                                    </ProductTitle>
                                    <ValueBlock>
                                        <ProductPrice>
                                            Цена: {priceFormat(item.price)}р
                                        </ProductPrice>
                                        {(item.in_stock === 0)?
                                            <CountBlock>
                                                <CountValue>
                                                    Нет в наличии
                                                </CountValue>
                                                <DeleteButton
                                                    onClick={(event) => {
                                                        dispatch(removeFromBasket({
                                                            id: item.id,
                                                            count: item.count
                                                        }))
                                                        handleSetBasket(item.id, 0)
                                                        event.preventDefault();
                                                    }}
                                                >
                                                    <Delete/>
                                                </DeleteButton>
                                            </CountBlock>
                                            :
                                            <CountBlock>
                                                <DecreaseButton
                                                    onClick={(event) => {
                                                        const count = item.count - 1
                                                            dispatch(setCountInBasket({
                                                            id: item.id,
                                                            count: count
                                                        }))
                                                        handleSetBasket(item.id, count)
                                                        event.preventDefault();
                                                    }}
                                                >
                                                    -
                                                </DecreaseButton>
                                                <CountValue>
                                                    {item.count}
                                                </CountValue>
                                                <AddButton
                                                    onClick={(event) => {
                                                        const count = (item.count + 1 > item.in_stock)? item.count : item.count + 1
                                                        dispatch(setCountInBasket({
                                                            id: item.id,
                                                            count: count
                                                        }))
                                                        handleSetBasket(item.id, count)
                                                        event.preventDefault();
                                                    }}
                                                >
                                                    +
                                                </AddButton>
                                                <DeleteButton
                                                    onClick={(event) => {
                                                        dispatch(removeFromBasket({
                                                            id: item.id,
                                                            count: item.count
                                                        }))
                                                        handleSetBasket(item.id, 0)
                                                        event.preventDefault();
                                                    }}
                                                >
                                                    <Delete/>
                                                </DeleteButton>
                                            </CountBlock>
                                        }

                                        <SumProductBlock
                                            style={{
                                                visibility: (!item.in_stock)? 'hidden' : null
                                            }}
                                        >
                                            Итог: {priceFormat(item.price * item.count)}р
                                        </SumProductBlock>
                                    </ValueBlock>
                                </DataBlock>
                            </BasketItem>
                        )
                    }
                    <AllSumBlock>
                        <AllSumText>
                            Итог:
                        </AllSumText>
                        <AllSumText>
                            {priceFormat(getAllSum())}р
                        </AllSumText>
                    </AllSumBlock>
                    </>
                    :
                    <EmptyBasketBlock>
                        Корзина пуста
                    </EmptyBasketBlock>
                }
            </BasketContent>
            {(basketProduct?.length && getAllSum() > 0)?
                <CreateOrder basketContent={basketProduct} sum={getAllSum()}/>
                :null
            }
        </BasketContainer>
    )
}

const BasketContainer = styled.div`
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const HeaderTitle = styled.div`
  line-height: 1.5;
  font-size: 40px;
  color: #888888;
  font-weight: bolder;
  padding: 50px 0 25px;
`

const BasketContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 30px;
  padding: 25px 50px;
  background-color: #e8e8e8;
`

const BasketItem = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  color: #000000;
  height: 150px;
  padding: 25px;
  border-bottom: 1px solid #888888;
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

const DataBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
`

const ProductTitle = styled.div`
  text-decoration: none;
  line-height: 1.5;
  font-size: 25px;
  color: #888888;
  height: 40%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`

const ValueBlock = styled.div`
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const ProductPrice = styled.div`
  max-width: 30%;
  line-height: 1.5;
  font-size: 18px;
  color: #000000;
`

const CountBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  max-width: 30%;
  user-select: none;
`

const DecreaseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  background-color: #888888;
  box-shadow: 0 0 5px 0 #888888;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const CountValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
`

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  background-color: #888888;
  box-shadow: 0 0 5px 0 #888888;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 5px;
  border-radius: 5px;
  background-color: #ff0000;
  box-shadow: 0 0 5px 0 #888888;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const SumProductBlock = styled.div`
  max-width: 30%;
  line-height: 1.5;
  font-size: 20px;
  color: #000000;
`

const AllSumBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
`

const AllSumText = styled.div`
  font-size: 30px;
  font-weight: bolder;
  color: #888888;
  cursor: default;
`

const EmptyBasketBlock = styled.div`
  width: 100%;
  text-align: center;
  line-height: 1.5;
  font-size: 25px;
  color: #888888;
  font-weight: bolder;
  padding: 15px;
`

