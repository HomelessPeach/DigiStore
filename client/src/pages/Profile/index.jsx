import * as React from "react";
import styled from "styled-components"
import {ImageField} from "../../components/ImageField";
import {TextField} from "../../components/TextField";
import {EmailField} from "../../components/EmailField";
import {PhoneNumberField} from "../../components/PhoneNumberField";
import {useDispatch, useSelector} from "react-redux";
import {Carousel} from "../../components/Carousel";
import {RouteNames} from "../../Router";
import {baseUrl} from "../../services";
import {Basket, Heart, New} from "../../components/Icons";
import {UserSlice} from "../../store/reducers/UserSlice";
import {priceFormat} from "../../utils";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

export const Profile = () => {

    const {data, basket, wishList} = useSelector(state => state.user)
    const {addToBasket, addToFavorite} = UserSlice.actions
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState([...wishList])

    useEffect(() => {
        setFavorite([...wishList])
    }, [])

    return (
        <ProfilePage>
            <ProfileContainer>
                <Title>Профиль</Title>
                <ProfileCard>
                    <ProfileInfo>
                        <ImageBlock>
                            <ImageField value={data?.avatar} size={{h: "300px", w: "300px", br: '150px'}}/>
                        </ImageBlock>
                        <Block>
                            <EmailField value={data.email} label={'e-mail'}/>
                            <TextField value={data.name} label={'Имя'}/>
                            <PhoneNumberField value={data.phoneNumber} label={'Номер телефона'}/>
                        </Block>
                    </ProfileInfo>
                </ProfileCard>
            </ProfileContainer>
            <FavoriteContainer>
                <Title>Избранное</Title>
                {(favorite.length)?
                    <CarouselWrapper>
                        <Carousel
                            carouselWidth={window.innerWidth - 600}
                            aspect={3/4}
                            button={false}
                            roundButton={favorite.length > 3}
                            infinity={favorite.length > 3}
                            dots={false}
                            scroll={favorite.length > 3}
                            itemsToShow={4}
                        >
                            {
                                favorite.map((item, index) =>
                                    <FavoriteCardWrapper key={index}>
                                        <FavoriteCard
                                            key={index}
                                            to={`${RouteNames.PRODUCT}/show/${item.id}`}
                                        >
                                            <FavoriteImageBlock>
                                                <ImgFavorite src={`${baseUrl}${item.image}`}/>
                                            </FavoriteImageBlock>
                                            <FavoriteInfoBlock>
                                                <ProductName>
                                                    {item.name}
                                                </ProductName>
                                                <ActionPriceBlock>
                                                    <PriceContainer>
                                                        <PriceBlock>
                                                            Цена:
                                                        </PriceBlock>
                                                        <PriceBlock>
                                                            {priceFormat(item.price)}р
                                                        </PriceBlock>
                                                    </PriceContainer>
                                                    <ActionsBlock>
                                                        <AddToBasket
                                                            onClick={(event) => {
                                                                dispatch(addToBasket({
                                                                    id: item.id,
                                                                    image: item.image,
                                                                    name: item.name,
                                                                    price: item.price,
                                                                    count: 1
                                                                }))
                                                                event.preventDefault();
                                                            }}
                                                            inBasket={basket.filter((product) => product.id === item.id).length}
                                                        >
                                                            <Basket/>
                                                        </AddToBasket>
                                                        <AddToFavorite
                                                            onClick={(event) => {
                                                                dispatch(addToFavorite({
                                                                    id: item.id,
                                                                    image: item.image,
                                                                    name: item.name,
                                                                    price: item.price,
                                                                }))
                                                                event.preventDefault();
                                                            }}
                                                            inWishList={wishList.filter((product) => product.id === item.id).length}
                                                        >
                                                            <Heart/>
                                                        </AddToFavorite>
                                                    </ActionsBlock>
                                                </ActionPriceBlock>
                                            </FavoriteInfoBlock>
                                        </FavoriteCard>
                                    </FavoriteCardWrapper>
                                )
                            }
                        </Carousel>
                    </CarouselWrapper>
                    : <EmptyWishList>Пусто</EmptyWishList>
                }
            </FavoriteContainer>
        </ProfilePage>
    )
}

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 30px 300px 60px;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
  width: 100%;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
`

const ImageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
`

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 50px;
`

const CarouselWrapper = styled.div`
`

const FavoriteCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: default;
`

const FavoriteCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 0 #888888;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
`

const FavoriteImageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 100%;
  height: 55%;
  padding: 10px 10px 0;
`

const ImgFavorite = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const FavoriteInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45%;
  padding: 10px 20px;
`

const ProductName = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
  max-width: 100%;
  line-height: 1.5;
  font-size: 27px;
  color: #000000;
  overflow: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const ActionPriceBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50%;
  width: 100%;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PriceBlock = styled.div`
  max-width: 60%;
  line-height: 1.5;
  font-size: 18px;
  color: #000000;
`

const ActionsBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;
  gap: 10px
`

const AddToFavorite = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({inWishList}) => (inWishList)? '#888888' : '#ff0000'};
  fill: ${({inWishList}) => (inWishList)? '#ff0000' : '#000000'};
  border-radius: 5px;
  padding: 5px;
`

const AddToBasket = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({theme, inBasket}) => (inBasket)? '#888888' : theme.colors.tertiary};
  fill: ${({theme, inBasket}) => (inBasket)? theme.colors.tertiary: '#000000'};
  border-radius: 5px;
  padding: 5px;
`

const EmptyWishList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 25px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
`