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

export const Basket = () => {

    const {data: user, basket} = useSelector(state => state.user)
    const {setCountInBasket, removeFromBasket} = UserSlice.actions
    const [setFavoriteProduct] = userAPI.useSetUserFavoriteProductMutation()
    const dispatch = useDispatch()

    async function handleSetBasket(count) {
        if (user) {
            if (count > 0) {
                await setFavoriteProduct({basket_count: count})
            } else {
                await setFavoriteProduct({is_basket: false})
            }
        }
    }

    function getAllSum() {
        return basket.reduce((result, item) => result + (item.price * item.count), 0)
    }

    return (
        <BasketContainer>
            <HeaderTitle>
                Корзина
            </HeaderTitle>
            <BasketContent>
                {(basket?.length)?
                    <>
                    {
                        basket.map((item, index) =>
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
                                        <CountBlock>
                                            <DecreaseButton
                                                onClick={(event) => {
                                                    const count = item.count - 1
                                                        dispatch(setCountInBasket({
                                                        id: item.id,
                                                        count: count
                                                    }))
                                                    handleSetBasket(count)
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
                                                    handleSetBasket(count)
                                                    event.preventDefault();
                                                }}
                                            >
                                                +
                                            </AddButton>
                                            <DeleteButton
                                                onClick={(event) => {
                                                    dispatch(removeFromBasket({
                                                        id: item.id,
                                                        image: item.image,
                                                        name: item.name,
                                                        price: item.price,
                                                        count: item.count
                                                    }))
                                                    handleSetBasket(0, false)
                                                    event.preventDefault();
                                                }}
                                            >
                                                <Delete/>
                                            </DeleteButton>
                                        </CountBlock>
                                        <SumProductBlock>
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
            {(basket.length)?
                <CreateOrder basketContent={basket} sum={getAllSum()}/>
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

