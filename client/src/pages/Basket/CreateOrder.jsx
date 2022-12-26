import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {TextInput} from "../../components/TextInput";
import {useSelector} from "react-redux";

export const CreateOrder = (props) => {

    const {
        basketContent,
        sum
    } = props

    const [orderData, setOrderData] = useState({})
    const {data: user} = useSelector(state => state.user)

    useEffect(() => {
        setOrderData({products: basketContent, sum: sum})
    }, [basketContent, sum])

    console.log(user)

    return(
        <CreateOrderContainer>
            <CreateOrderForm>
                <InputBlock>
                    <TextInput
                        value={user.name}
                        onChange={(value) => setOrderData({...orderData, userData: {...orderData.userData, user_name: value}})}
                        label={'Имя'}
                    />
                    <TextInput
                        value={user.phoneNumber}
                        onChange={(value) => setOrderData({...orderData, userData: {...orderData.userData, user_phone_number: value}})}
                        label={'Номер телефона'}
                    />
                    <TextInput
                        value={user.email}
                        onChange={(value) => setOrderData({...orderData, userData: {...orderData.userData, user_email: value}})}
                        label={'e-mail'}
                    />
                </InputBlock>
                <ButtonBlock>
                    <Button>
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