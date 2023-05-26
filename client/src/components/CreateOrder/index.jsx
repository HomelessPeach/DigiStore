import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {orderAPI} from "../../services/OrderService";
import {TextInput} from "../TextInput";
import {useSelector} from "react-redux";
import {PhoneNumberInput} from "../PhoneNumberInput";
import {emailValidate, userNameValidate} from "../../utils";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../Router";
import {UserSlice} from "../../store/reducers/UserSlice";
import {userAPI} from "../../services/UserService";

export const CreateOrder = (props) => {

    const {
        basketContent,
        sum
    } = props

    const navigate = useNavigate();

    const [createOrder] = orderAPI.useAddOrderMutation()
    const [orderData, setOrderData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)
    const {data: user, basket, wishList} = useSelector(state => state.user)
    const [getUserProduct] = userAPI.useGetUserProductsMutation()
    const {clearUserProductData} = UserSlice.actions

    const validation = {
        client_email: (email) => email && emailValidate(email),
        client_name: (name) => name && userNameValidate(name),
        client_phone_number: (phoneNumber) => {
            return phoneNumber?.length === 10
        },
        checkValidate: () =>
            validation.client_email(orderData.client_email) &&
            validation.client_phone_number(orderData.client_phone_number) &&
            validation.client_name(orderData.client_name)
    }

    async function createOrderHandler() {
        if (validation.checkValidate()) {
            const res = await createOrder(orderData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                if (orderData.user_id) {
                    await getUserProduct(user.id)
                }
                navigate(RouteNames.PROFILE)
            }
        } else {
            setIsNotValid(true)
        }
    }

    useEffect(() => {
        setOrderData({products: basketContent.filter((item) => item.in_stock !== 0), sum: sum, user_id: user?.id, client_name: user?.name, client_email: user?.email, client_phone_number: user?.phoneNumber})
    }, [basketContent, sum])

    return(
        <CreateOrderContainer>
            <CreateOrderForm>
                <InputBlock>
                    <TextInput
                        value={user?.name}
                        onChange={(value) => setOrderData({...orderData, client_name: value})}
                        validation={{
                            validate: validation.client_name,
                            validationError: isNotValid,
                            validationMessage: 'Введите имя (от 2-х символов)'
                        }}
                        label={'Имя'}
                    />
                    <TextInput
                        value={user?.email}
                        onChange={(value) => setOrderData({...orderData, client_email: value})}
                        validation={{
                            validate: validation.client_email,
                            validationError: isNotValid,
                            validationMessage: 'Некорректный e-mail'
                        }}
                        label={'e-mail'}
                    />
                    <PhoneNumberInput
                        value={user?.phoneNumber}
                        onChange={(value) => setOrderData({...orderData, client_phone_number: value})}
                        validation={{
                            validate: validation.client_phone_number,
                            validationError: isNotValid,
                            validationMessage: 'Заполните номер телефона'
                        }}
                        label={'Номер телефона'}
                    />
                </InputBlock>
                <ButtonBlock>
                    <Button onClick={createOrderHandler}>
                        Оформить заказ
                    </Button>
                </ButtonBlock>
            </CreateOrderForm>
        </CreateOrderContainer>
    )
}

const CreateOrderContainer = styled.div`
  width: 100%;
  padding: 50px 0;
`

const CreateOrderForm = styled.div`
  width: 100%;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 0 3px 0 #888888;
  display: flex;
  flex-direction: column;
`

const InputBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonBlock = styled.div`
  padding: 25px 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`