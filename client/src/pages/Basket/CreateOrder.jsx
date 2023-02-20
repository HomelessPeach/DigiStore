import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {orderAPI} from "../../services/OrderService";
import {TextInput} from "../../components/TextInput";
import {useSelector} from "react-redux";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {emailValidate, userNameValidate} from "../../utils";
import {AdminRouteNames} from "../../Router";
import {useNavigate} from "react-router-dom";

export const CreateOrder = (props) => {

    const {
        basketContent,
        sum
    } = props

    const navigate = useNavigate();
    const [createOrder] = orderAPI.useAddOrderMutation()
    const [orderData, setOrderData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)
    const {data: user} = useSelector(state => state.user)

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

    useEffect(() => {
        setOrderData({products: basketContent, sum: sum, user_id: user.id, client_name: user.name, client_email: user.email, client_phone_number: user.phoneNumber})
    }, [basketContent, sum])

    async function createOrderHandler() {
        if (validation.checkValidate()) {
            const res = await createOrder(orderData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate('/')
            }
        } else {
            setIsNotValid(true)
        }
    }

    return(
        <CreateOrderContainer>
            <CreateOrderForm>
                <InputBlock>
                    <TextInput
                        value={user.name}
                        onChange={(value) => setOrderData({...orderData, client_name: value})}
                        label={'Имя'}
                    />
                    <TextInput
                        value={user.email}
                        onChange={(value) => setOrderData({...orderData, client_email: value})}
                        label={'e-mail'}
                    />
                    <PhoneNumberInput
                        value={user.phoneNumber}
                        onChange={(value) => setOrderData({...orderData, client_phone_number: value})}
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