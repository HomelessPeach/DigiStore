import * as React from "react";
import styled from "styled-components"
import {Cross} from "../Icons";
import {PhoneNumberField} from "../PhoneNumberField";
import {OrderProductComponent} from "../OrderProductComponent";
import {TextField} from "../TextField";

export const OrderDetails = (props) => {

    const {orderData, setClose} = props

    return (
        <OrderDetailsContainer
            onClick={setClose}
        >
            <OrderDetailsBlock
                onClick={(event) => event.stopPropagation()}
            >
                <CloseButton
                    onClick={setClose}
                >
                    <Cross/>
                </CloseButton>
                <TextBlock>
                    Детали заказа {orderData.order_number}
                </TextBlock>
                <ShowContent>
                    <TextField value={orderData.client_name} label={'Имя заказчика'}/>
                    <TextField value={orderData.client_email} label={'e-mail'}/>
                    <PhoneNumberField value={orderData.client_phone_number} label={'Номер телефона'}/>
                    <OrderProductComponent products={orderData.order_products} label={'Продукты'}/>
                </ShowContent>
            </OrderDetailsBlock>
        </OrderDetailsContainer>
    )

}

const OrderDetailsContainer = styled.div`
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

const OrderDetailsBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 900px;
  height: 600px;
  margin: 0 0 150px;
  padding: 50px;
  border-radius: 20px;
  background-color: white;
  overflow: scroll;
  @media (${({theme}) => theme.media.large}) {
    padding: 30px;
  }
  @media (${({theme}) => theme.media.medium}) {
    padding: 20px;
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

const TextBlock = styled.div`
  font-size: 23px;
  user-select: none;
`

const ShowContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: overlay;
`