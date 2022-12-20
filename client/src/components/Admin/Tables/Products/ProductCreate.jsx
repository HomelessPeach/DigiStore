import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {productAPI} from "../../../../services/ProductService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock} from "../TablesStyledBlocks";

export const ProductCreate = () => {

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