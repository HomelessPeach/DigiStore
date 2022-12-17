import * as React from "react";
import styled from "styled-components"
import {baseUrl} from "../../services";

export const Product = () => {
    return(
        <ProductContainer>
            <div style={{fontSize: 50, color: '#989797'}}>
                Ноутбуки
            </div>
            <ProductCard>
                <ImageBlock>
                    <Img src={`${baseUrl}/files/product/macbook162021.png`}/>
                </ImageBlock>
                <TextBlock>
                    <div style={{fontSize: 30}}>MacBook 16, 2021</div>
                    <div style={{fontSize: 30, color: '#989797'}}>
                        300.000р
                    </div>
                </TextBlock>
            </ProductCard>
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
  padding: 0 200px;
`

const ProductCard = styled.div`
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
