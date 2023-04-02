import * as React from "react";
import styled from "styled-components"
import {chatAPI} from "../../services/ChatService";
import {ImageField} from "../../components/ImageField";
import {EmailField} from "../../components/EmailField";
import {PhoneNumberField} from "../../components/PhoneNumberField";
import {useDispatch, useSelector} from "react-redux";
import {Carousel} from "../../components/Carousel";
import {RouteNames} from "../../Router";
import {baseUrl} from "../../services";
import {Basket, Heart} from "../../components/Icons";
import {UserSlice} from "../../store/reducers/UserSlice";
import {formattedText, priceFormat} from "../../utils";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Button} from "../../components/Admin/TablesStyledBlocks";

export const Profile = () => {

    const {data, basket, wishList} = useSelector(state => state.user)
    const {addToBasket, addToFavorite} = UserSlice.actions
    const dispatch = useDispatch()
    const [favorite, setFavorite] = useState([...wishList])
    const [profile, setProfile] = useState(true)
    const [message, setMessage] = useState('')
    const {data: chatData, isLoading: chatLoading} = chatAPI.useGetUserChatQuery(data.id, {refetchOnFocus: true})
    const [createMessage] = chatAPI.useMessageCreateMutation()
    const [createChat] = chatAPI.useCreateChatMutation()

    async function sendMessage() {
        const sendMessage = message.replace(/^\s*|\s*$/g, '');
        if (sendMessage.length > 0) {
            await createMessage({
                fk_chat: chatData.chat_id,
                is_user: true,
                chat_message_content: sendMessage
            })
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
        }
        setMessage('');
    }

    async function sendFirstMessage() {
        const sendMessage = message.replace(/^\s*|\s*$/g, '');
        if (sendMessage.length > 0) {
            const res = await createChat({fk_user: data.id})
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            await createMessage({
                fk_chat: res.chat_id,
                is_user: true,
                chat_message_content: sendMessage
            })
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
        }
        setMessage('');
    }

    useEffect(() => {
        setFavorite([...wishList])
    }, [])

    return (
        <PageContainer>
            <ProfileMenu>
                <ProfileMenuItem
                    select={profile}
                    onClick={() => setProfile(!profile)}
                >
                    Профиль
                </ProfileMenuItem>
                <ProfileMenuItem
                    select={!profile}
                    onClick={() => setProfile(!profile)}
                >
                    Чат с поддержкой
                    {(chatData?.is_answer)? <Notification/> : null}
                </ProfileMenuItem>
            </ProfileMenu>
            {(profile)?
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
                    <ItemsContainer>
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
                            : <EmptyBlock>Здесь ничего нет</EmptyBlock>
                        }
                    </ItemsContainer>
                    <ItemsContainer>
                        <Title>Заказы</Title>
                        {(false)?
                            <OrdersContainer>

                            </OrdersContainer>
                            :<EmptyBlock>Здесь ничего нет</EmptyBlock>
                        }
                    </ItemsContainer>
                </ProfilePage>
                :
                <ChatPage>
                    {(chatLoading) ?
                        <h1>LOADING...</h1>
                        :
                        <>
                            <MessageWrap>
                                <MessageContainer>
                                    {(chatData) ?
                                        chatData.chat_messages.map((item) =>
                                            (item.is_user == true) ?
                                                <UserMessageBlock>
                                                    <MessageBlock isUser={true}>
                                                        <TextField>
                                                            {formattedText(item.chat_message_content)}
                                                        </TextField>
                                                    </MessageBlock>
                                                </UserMessageBlock>
                                                :
                                                <AdminMessageBlock>
                                                    <MessageBlock isUser={false}>
                                                        <TextField>
                                                            {formattedText(item.chat_message_content)}
                                                        </TextField>
                                                    </MessageBlock>
                                                </AdminMessageBlock>
                                        )
                                        :
                                        <EmptyChat>
                                            Отправьте первое сообщение
                                        </EmptyChat>
                                    }
                                </MessageContainer>
                            </MessageWrap>
                            <MessageInputContainer>
                                <MessageInputBlock>
                                    <MessageInput
                                        value={message}
                                        rows={4}
                                        onChange={(event) => setMessage(event.target.value)}
                                    />
                                </MessageInputBlock>
                                <ButtonBlock>
                                    <Button
                                        onClick={(chatData) ? sendMessage : sendFirstMessage}
                                    >
                                        Отправить
                                    </Button>
                                </ButtonBlock>
                            </MessageInputContainer>
                        </>
                    }
                </ChatPage>
            }

        </PageContainer>
    )
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 30px 300px 60px;
`

const ProfileMenu = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e3e3e3;
  padding: 7px;
  border-radius: 50px;
  gap: 5px;
`

const ProfileMenuItem = styled.div`
  position: relative;
  width: 150px;
  text-align: center;
  flex-wrap: nowrap;
  background-color: ${({select}) => (select)? '#fdc6ff' : 'none'};
  border-radius: 50px;
  padding: 3px;
  cursor: pointer;
`

const Notification = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 30px;
  
  background-color: red;
`

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
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

const ItemsContainer = styled.div`
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

const EmptyBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  font-size: 25px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
`

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
  width: 100%;
`

const ChatPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
`

const MessageWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 600px;
  overflow-y: auto;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UserMessageBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: end;
  padding: 10px 0;
`

const AdminMessageBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: end;
  padding: 10px 10px 0;
`

const MessageBlock = styled.div`
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  background-color: ${({theme, isUser}) => (isUser)? '#ffffff' : theme.colors.tertiary};
  color: ${({isUser}) => (isUser)? '#000000' : '#ffffff'};
  border-radius: ${({isUser}) => (isUser)? '15px 15px 0 15px' : '15px 15px 15px 0'};;
  max-width: 70%;
  padding: 10px 15px;
`

const TextField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  font-size: 20px;
`

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  padding: 15px 0;
`

const MessageInputBlock = styled.div`
  width: 90%;
`

const MessageInput = styled.textarea`
  width: 100%;
  font-size: 16px;
  background-color: rgba(158, 0, 182, 0.3);
  border-radius: 10px;
  padding: 25px 15px 15px;
  border: none;
  outline: none;
  color: #414141;
  resize: none;
  &:focus {
    box-shadow: 0 0 3px 0 #888888;
  }
`

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 10%;
`

const EmptyChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 600px;
  font-size: 20px;
`