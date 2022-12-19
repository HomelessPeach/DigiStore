import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {productCategoryAPI} from "../../../../services/ProductCategoryService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ImageInput} from "../../components/ImageInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock} from "../TablesStyledBlocks";

export const ProductCategoryCreate = () => {

    const navigate = useNavigate();
    const [createProductCategory] = productCategoryAPI.useProductCategoryCreateMutation()
    const [productCategoryData, setProductCategoryData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_category_name: (name) => name?.length > 0,
        checkValidate: () =>
            validation.product_category_name(productCategoryData.product_category_name)
    }

    async function createProductCategoryHandler() {
        if (validation.checkValidate()) {
            const res = await createProductCategory(productCategoryData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/${res.product_category_id}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT_CATEGORY}
                >
                    Список категорий
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <ImageInput
                        value={productCategoryData.image?.new_image || ''}
                        size={{h: "400px", w: "300px", br: '10px'}}
                        onChange={(value) => (value)?
                            setProductCategoryData({...productCategoryData, image: {...productCategoryData.image, new_image: value}})
                            :null}
                        label={'Изображение'}
                    />
                    <TextInputBlock>
                        <TextInput
                            value={productCategoryData.product_category_name}
                            onChange={(value) => setProductCategoryData({...productCategoryData, product_category_name: value})}
                            validation={{
                                validate: validation.product_category_name,
                                validationError: isNotValid,
                                validationMessage: 'Категория продукта обязательно должна иметь название.'
                            }}
                            label={'Название'}
                        />
                    </TextInputBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createProductCategoryHandler}>
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
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
`

const TextInputBlock = styled.div`
  width: 40%;
  min-width: 300px;
`