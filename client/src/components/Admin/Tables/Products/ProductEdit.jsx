import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {productAPI} from "../../../../services/ProductService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ToolbarBlock, LinkButton, DeleteButton, ListContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";

export const ProductEdit = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const productId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT}/edit/`, '')
    const [deleteProduct] = productAPI.useProductDeleteMutation()
    const [updateProduct] = productAPI.useProductUpdateMutation()
    const {data, isLoading} = productAPI.useProductShowQuery(productId, {refetchOnFocus: true})
    const [productData, setProductData] = useState(data || {})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_name: (name) => name?.length > 0,
        checkValidate: () =>
            validation.product_name(productData.product_name) &&
            validation.product_name(productData.product_name)
    }

    useEffect(() => {
        if (data)
            setProductData(data)
    }, [data])

    async function updateProductHandler() {
        if (validation.checkValidate()) {
            const res = await updateProduct(productData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT}/${productData}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    async function deleteProductHandler() {
        const res = await deleteProduct(productId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_PRODUCT)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT}
                >
                    Список товаров
                </LinkButton>
                <DeleteButton>
                    Удалить товар
                </DeleteButton>
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
        </ListContainer>
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