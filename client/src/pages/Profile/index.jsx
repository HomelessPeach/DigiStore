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
import {emailValidate, formattedText, passwordHook, passwordValidate, priceFormat, userNameValidate} from "../../utils";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {TextField} from "../../components/TextField";
import {TextInput} from "../../components/TextInput";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {UserChangePasswordForm} from "../../components/UserChangePasswordForm";
import {ImageInput} from "../../components/ImageInput";
import {userAPI} from "../../services/UserService";
import {authAPI} from "../../services/AuthService";
import {orderAPI} from "../../services/OrderService";
import {OrderDetails} from "../../components/OrderDetails";
import {productAPI} from "../../services/ProductService";
import {useResponsive} from "../../hook/responsive";

export const Profile = () => {

    const {data: user, basket, wishList} = useSelector(state => state.user)
    const {addToBasket, addToFavorite, removeFromBasket, removeFromFavorite} = UserSlice.actions
    const {desktop, laptop, tablet, mobile, smallMobile} = useResponsive()
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(true)
    const [message, setMessage] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [userData, setUserData] = useState({user_id: user.id ,image: {image_path: user.avatar}, user_name: user.name, user_phone_number: user.phoneNumber, user_email: user.email})
    const [password, setPassword] = useState('')
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const [isNotValid, setIsNotValid] = useState(false)
    const {data: chatData, isLoading: chatLoading} = chatAPI.useGetUserChatQuery(user.id, {refetchOnFocus: true})
    const [updateUserInfo] = userAPI.useUpdateUserInfoMutation()
    const [refresh] = authAPI.useRefreshMutation()
    const [createMessage] = chatAPI.useMessageCreateMutation()
    const [createChat] = chatAPI.useCreateChatMutation()
    const {data: userOrderData} = orderAPI.useGetUserOrderQuery(user.id)
    const [cancelOrder] = orderAPI.useOrderCancelMutation()
    const [getFavorite, {data: favoriteData}] = productAPI.useGetProductsByIdMutation()
    const [setFavoriteProduct] = userAPI.useSetUserFavoriteProductMutation()
    const [orderData, setOrderData] = useState({})
    const [isOrderOpen, setIsOrderOpen] = useState(false)

    const validation = {
        user_email: (email) => email && emailValidate(email),
        user_name: (name) => name && userNameValidate(name),
        user_phone_number: (phoneNumber) => {
            return phoneNumber?.length === 10
        },
        user_password: (password) => password && passwordValidate(password),
        checkValidate: () =>
            validation.user_email(userData.user_email) &&
            validation.user_phone_number(userData.user_phone_number) &&
            validation.user_name(userData.user_name) &&
            (!password || validation.user_password(password))
    }

    async function saveProfile() {
        if (validation.checkValidate()) {
            const res = await updateUserInfo((password.length > 0) ? {...userData, user_password: await passwordHook(password)} : userData)
            await refresh()
            if (res.data) {
                setIsEdit(false)
            }
        } else {
            setIsNotValid(true)
        }
    }

    async function handleSetBasket(productId, isBasket) {
        if (user) {
            await setFavoriteProduct({fk_product: productId, fk_user: user.id, is_basket: isBasket, basket_count: 1})
        }
    }

    async function handleSetFavorite(productId, isFavorite) {
        if (user) {
            await setFavoriteProduct({fk_product: productId, fk_user: user.id, is_favorite: isFavorite})
        }
    }

    async function handleCancelOrder(orderId) {
        await cancelOrder(orderId)
    }

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
            const res = await createChat({fk_user: user.id})
                .unwrap()
            await createMessage({
                fk_chat: res.chat_id,
                is_user: true,
                chat_message_content: sendMessage
            })
        }
        setMessage('');
    }

    useEffect(() => {
        if (wishList.length) {
            getFavorite(wishList.map((item) => item.id))
        }
    }, [wishList])

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
                            {(isEdit)?
                                <ProfileInfo>
                                    <ImageBlock style={(mobile || smallMobile)? {width: '100%'} : {width: '40%'}}>
                                        <ImageInput
                                            value={userData.image?.new_image || userData.image?.image_path || ''}
                                            onChange={(value) => (value) ?
                                                setUserData({...userData, image: {...userData.image, new_image: value}})
                                                : null}
                                            size={(mobile)? {h: "300px", w: "300px", br: '150px'} : {h: "200px", w: "200px", br: '150px'}}/>
                                    </ImageBlock>
                                    <Block style={(mobile || smallMobile)? {width: '100%'} : {width: '60%'}}>
                                        <RowBlock>
                                            <TextInput
                                                value={userData.user_email}
                                                onChange={(value) => setUserData({...userData, user_email: value})}
                                                validation={{
                                                    validate: validation.user_email,
                                                    validationError: isNotValid,
                                                    validationMessage: 'Некорректный e-mail'
                                                }}
                                                label={'e-mail'}
                                            />
                                            <TextInput
                                                value={userData.user_name}
                                                onChange={(value) => setUserData({...userData, user_name: value})}
                                                validation={{
                                                    validate: validation.user_name,
                                                    validationError: isNotValid,
                                                    validationMessage: 'Введите имя (от 2-х символов)'
                                                }}
                                                label={'Имя'}
                                            />
                                        </RowBlock>
                                        <PhoneNumberInput
                                            value={userData.user_phone_number}
                                            onChange={(value) => setUserData({...userData, user_phone_number: value})}
                                            validation={{
                                                validate: validation.user_phone_number,
                                                validationError: isNotValid,
                                                validationMessage: 'Заполните номер телефона'
                                            }}
                                            w={'100%'}
                                            label={'Номер телефона'}
                                        />
                                        <ChangePasswordButtonBlock>
                                            <Button
                                                onClick={() => setIsOpenPassword(true)}
                                            >
                                                Изменить пароль
                                            </Button>
                                        </ChangePasswordButtonBlock>
                                    </Block>
                                    <EditButton
                                        bottom
                                        onClick={saveProfile}
                                    >
                                        Сохранить
                                    </EditButton>
                                </ProfileInfo>
                                :
                                <ProfileInfo>
                                    <ImageBlock style={(mobile || smallMobile)? {width: '100%'} : undefined}>
                                        <ImageField value={user?.avatar} size={(mobile)? {h: "250px", w: "250px", br: '150px'} : (smallMobile)? {h: "200px", w: "200px", br: '150px'} : {h: "300px", w: "300px", br: '150px'}}/>
                                    </ImageBlock>
                                    <Block style={(mobile || smallMobile)? {width: '100%'} : undefined}>
                                        <EmailField value={user.email} label={'e-mail'}/>
                                        <TextField value={user.name} label={'Имя'}/>
                                        <PhoneNumberField value={user.phoneNumber} label={'Номер телефона'}/>
                                    </Block>
                                    <EditButton
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Редактировать
                                    </EditButton>
                                </ProfileInfo>
                            }
                            {(isOpenPassword) &&
                                <UserChangePasswordForm
                                    password={password}
                                    setIsOpen={setIsOpenPassword}
                                    setPassword={setPassword}
                                    validation={{
                                        validate: validation.user_password,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректный пароль. Пароль должен состоять из букв латинского алфавит (минимум 1), арабских цифр (минимум 1), длиной от 5 до 25 символов. Допускается содержание специальных символов: ' +
                                            '"!", "@", "#", "$", "%", "^", "&", "*", ":", "(", ")", ".", ";", "<", ">", "\'", """, "{", "}", "[", "]", "?", "\\", "/", "|", "-", "_", "~".'
                                    }}
                                />
                            }
                        </ProfileCard>
                    </ProfileContainer>
                    <ItemsContainer>
                        <Title>Избранное</Title>
                        {(favoriteData?.length)?
                            <CarouselWrapper>
                                <Carousel
                                    carouselWidth={(desktop || laptop)? window.innerWidth * 0.6 : (tablet || laptop)? window.innerWidth * 0.7: window.innerWidth * 0.86}
                                    aspect={3/4}
                                    button={false}
                                    roundButton={(desktop || laptop)? favoriteData.length > 3 : (tablet || laptop)? favoriteData.length > 2: (window.innerWidth > 400)? favoriteData.length > 1: true}
                                    infinity={(desktop || laptop)? favoriteData.length > 3 : (tablet || laptop)? favoriteData.length > 2: (window.innerWidth > 400)? favoriteData.length > 1: true}
                                    dots={false}
                                    scroll={(desktop || laptop)? favoriteData.length > 3 : (tablet || laptop)? favoriteData.length > 2: (window.innerWidth > 400)? favoriteData.length > 1: true}
                                    itemsToShow={(desktop || laptop)? 4 : (tablet || laptop)? 3: (window.innerWidth > 400)? 2: 1}
                                >
                                    {
                                        favoriteData.map((item, index) =>
                                            <CardWrapper key={index}>
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
                                                                {(item.in_stock !== 0) &&
                                                                    <AddToBasket
                                                                        onClick={(event) => {
                                                                            const product = {
                                                                                id: item.id,
                                                                                count: 1
                                                                            }
                                                                            if (!basket.filter((product) => product.id === item.id).length) {
                                                                                dispatch(addToBasket(product))
                                                                                handleSetBasket(item.id, true)
                                                                            } else {
                                                                                dispatch(removeFromBasket(product))
                                                                                handleSetBasket(item.id,false)
                                                                            }
                                                                            event.preventDefault();
                                                                        }}
                                                                        inBasket={basket.filter((product) => product.id === item.id).length}
                                                                    >
                                                                        <Basket/>
                                                                    </AddToBasket>
                                                                }
                                                                <AddToFavorite
                                                                    onClick={(event) => {
                                                                        const product = {
                                                                            id: item.id,
                                                                        }
                                                                        if (!wishList.filter((product) => product.id === item.id).length) {
                                                                            dispatch(addToFavorite(product))
                                                                            handleSetFavorite(item.id, true)
                                                                        } else {
                                                                            dispatch(removeFromFavorite(product))
                                                                            handleSetFavorite(item.id,false)
                                                                        }
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
                                            </CardWrapper>
                                        )
                                    }
                                </Carousel>
                            </CarouselWrapper>
                            : <EmptyBlock>Здесь ничего нет</EmptyBlock>
                        }
                    </ItemsContainer>
                    <ItemsContainer>
                        <Title>Заказы</Title>
                        {(userOrderData?.length)?
                            <CarouselWrapper>
                                <Carousel
                                    carouselWidth={(desktop || laptop)? window.innerWidth * 0.6 : (tablet || laptop)? window.innerWidth * 0.7: window.innerWidth * 0.86}
                                    aspect={5/3}
                                    button={false}
                                    roundButton={(desktop || laptop)? userOrderData.length > 3 : (tablet || laptop)? userOrderData.length > 2: (window.innerWidth > 400)? userOrderData.length > 1 : true}
                                    infinity={(desktop || laptop)? userOrderData.length > 3 : (tablet || laptop)? userOrderData.length > 2: (window.innerWidth > 400)? userOrderData.length > 1 : true}
                                    dots={false}
                                    scroll={(desktop || laptop)? userOrderData.length > 3 : (tablet || laptop)? userOrderData.length > 2: (window.innerWidth > 400)? userOrderData.length > 1 : true}
                                    itemsToShow={(desktop || laptop)? 4 : (tablet || laptop)? 3: (window.innerWidth > 400)? 2 : 1}
                                >
                                    {
                                        userOrderData.map((item, index) =>
                                            <CardWrapper key={index}>
                                                <OrderCard
                                                    key={index}
                                                    onClick={() => {
                                                        setOrderData(item)
                                                        setIsOrderOpen(true)
                                                    }}
                                                    isComplete={item.is_complete}
                                                    isCancel={item.is_cancel}
                                                >
                                                    <OrderTitleBlock>
                                                        Номер заказа: {item.order_number}
                                                    </OrderTitleBlock>
                                                    {(item.is_complete)?
                                                        <OrderBlock>
                                                            <CompleteBlock>
                                                                Завершён
                                                            </CompleteBlock>
                                                        </OrderBlock>
                                                        : (item.is_cancel)?
                                                            <OrderBlock>
                                                                <CancelBlock>
                                                                    Отменён
                                                                </CancelBlock>
                                                            </OrderBlock>
                                                            :
                                                            <OrderBlock
                                                                onClick={(event) => event.stopPropagation()}
                                                            >
                                                                <Button
                                                                    onClick={() => handleCancelOrder(item.order_id)}
                                                                >
                                                                    Отменить
                                                                </Button>
                                                            </OrderBlock>
                                                    }
                                                </OrderCard>
                                            </CardWrapper>
                                        )
                                    }
                                </Carousel>
                            </CarouselWrapper>
                            :<EmptyBlock>Здесь ничего нет</EmptyBlock>
                        }
                        {(isOrderOpen) &&
                            <OrderDetails orderData={orderData} setClose={() => setIsOrderOpen(false)}/>
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
                                                        <Text>
                                                            {formattedText(item.chat_message_content)}
                                                        </Text>
                                                    </MessageBlock>
                                                </UserMessageBlock>
                                                :
                                                <AdminMessageBlock>
                                                    <MessageBlock isUser={false}>
                                                        <Text>
                                                            {formattedText(item.chat_message_content)}
                                                        </Text>
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
  padding: 30px 20% 60px;
  @media (${({theme}) => theme.media.extraLarge}) {
    padding: 30px 15% 60px;
  }
  @media (${({theme}) => theme.media.large}) {
    padding: 30px 7% 60px;
  }
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
  width: 100%;
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
  @media (${({theme}) => theme.media.large}) {
    padding: 30px;
  }
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  width: 100%;
  @media (${({theme}) => theme.media.medium}) {
    flex-direction: column;
    align-items: center;
  }
`

const ImageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  @media (${({theme}) => theme.media.large}) {
    padding-top: 50px;
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  @media (${({theme}) => theme.media.medium}) {
    width: 100%;
    padding-bottom: 60px;
  }
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

const CardWrapper = styled.div`
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
  text-align: center;
  padding: 50px;
  font-size: 25px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
`

const OrderCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-color: ${({isComplete, isCancel}) => (isComplete)? 'rgba(0, 255, 34, 0.4)' : (isCancel)? 'rgba(255, 0, 0, 0.4)' : null};
  @media (${({theme}) => theme.media.small}) {
    padding: 10px;
  }
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

const Text = styled.div`
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
  gap: 15px;
  width: 100%;
  padding: 15px 0;
  @media (${({theme}) => theme.media.medium}) {
    flex-direction: column;
  }
`

const MessageInputBlock = styled.div`
  width: 90%;
  @media (${({theme}) => theme.media.extraLarge}) {
    width: 85%;
  }
  @media (${({theme}) => theme.media.medium}) {
    width: 100%;
  }
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
  height: 500px;
  font-size: 20px;
`

const Button = styled.div`
  user-select: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 10px 0 #5e5e5e;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
  @media (${({theme}) => theme.media.small}) {
    padding: 5px;
    font-size: 13px;
  }
`

const EditButton = styled.div`
  user-select: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 10px 0 #5e5e5e;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
  position: absolute;
  right: 0;
  bottom: ${({bottom}) => bottom? 0 : 'none'}
`

const RowBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChangePasswordButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  padding: 20px 0 0;
  @media (${({theme}) => theme.media.large}) {
    width: 100%;
  }
`

const OrderTitleBlock = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  font-size: 20px;
  @media (${({theme}) => theme.media.small}) {
    font-size: 15px;
  }
`

const OrderBlock = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: right;
  align-items: end;
`

const CompleteBlock = styled.div`
  font-weight: bold;
  background-color: #00FF22;
  padding: 7px 10px;
  border-radius: 10px;
  @media (${({theme}) => theme.media.small}) {
    padding: 3px 5px;
    font-size: 13px;
  }
`

const CancelBlock = styled.div`
  font-weight: bold;
  padding: 7px 10px;
  border-radius: 10px;
  background-color: #FF0000;
  @media (${({theme}) => theme.media.small}) {
    padding: 3px 5px;
    font-size: 13px;
  }
`