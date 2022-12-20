import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {productAPI} from "../../../../services/ProductService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock} from "../TablesStyledBlocks";
import {ImagesInput} from "../../components/ImagesInput";

export const ProductCreate = () => {

    // const data = [
    //     {
    //         image_path: 'https://www.meme-arsenal.com/memes/1a0d126c09ef9859f5946bde0c3a79ef.jpg'
    //     },
    //     {
    //         image_path: 'https://abrakadabra.fun/uploads/posts/2021-12/1640388888_5-abrakadabra-fun-p-kosmos-na-rabochii-stol-telefona-5.jpg'
    //     },
    //     {
    //         image_path: 'https://images.wallpaperscraft.ru/image/single/siluet_gorod_art_142434_1600x900.jpg'
    //     },
    //     {
    //         image_path: 'https://images.wallpaperscraft.ru/image/single/siluet_gorod_ulitsa_123496_1600x900.jpg'
    //     },
    //     {
    //         image_path: 'https://images.wallpaperscraft.ru/image/single/siluet_gorod_art_143985_1600x900.jpg'
    //     }
    // ]

    const navigate = useNavigate();
    const [createProduct] = productAPI.useProductCreateMutation()
    const [productData, setProductData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_name: (name) => name?.length > 0,
        checkValidate: () =>
            validation.product_name(productData.product_name) &&
            validation.product_name(productData.product_name)
    }

    async function createProductHandler() {
        console.log(productData)
        // if (validation.checkValidate()) {
        //     const res = await createProduct(productData)
        //         .unwrap()
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //     if (res) {
        //         navigate(`${AdminRouteNames.ADMIN_PRODUCT}/${res.product_id}`)
        //     }
        // } else {
        //     setIsNotValid(true)
        // }
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_USERS}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <ImagesInput
                        value={productData.images}
                        size={{h: 540, w: 960, br: 20}}
                        onChange={(value) => setProductData({...productData, images: [...(productData.images)? productData.images: [], ...value]})}
                        label={'Изображения'}
                    />
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createProductHandler}>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
            </EditBlock>
        </EditContainer>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch
`