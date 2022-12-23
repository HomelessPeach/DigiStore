import * as React from "react";
import styled from "styled-components";
import {baseUrl} from "../../services";

export const Basket = () => {
    return (
        <BasketContainer>
            <div style={{fontSize: 50, color: '#989797'}}>
                Корзина
            </div>
            <BasketCard>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div style={{fontSize: 30}}>MacBook 16, 2021</div>
                    <div style={{fontSize: 30, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div style={{fontSize: 30, color: '#989797'}}>300.000р</div>
                        <div style={{display: "flex", justifyContent: "space-between", width: 200}}>
                            <div style={{fontSize: 30, padding: '20px 30px', boxShadow: '0 0 5px 0', backgroundColor: '#989797', borderRadius: 30}}>+</div>
                            <div style={{fontSize: 30, padding: '20px 30px', boxShadow: '0 0 5px 0', backgroundColor: '#989797', borderRadius: 30}}>-</div>
                        </div>
                    </div>
                </TextBlock>
            </BasketCard>
            <div style={{fontSize: 30, width: '50%', margin:"auto", boxShadow: '0 0 5px 0', backgroundColor: 'pink', padding: '10px 20px', textAlign: "center", borderRadius: 50}}>
                Оформить заказ
            </div>
        </BasketContainer>
    )
}

const BasketContainer = styled.div`
  padding: 0 200px;
`

const BasketCard = styled.div`
  height: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 0 5px 0;
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0;
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

const TextBlock = styled.div`
  width: 70%;
  height: 100%;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`