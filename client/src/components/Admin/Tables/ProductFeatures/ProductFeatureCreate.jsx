import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {productFeatureAPI} from "../../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock} from "../TablesStyledBlocks";

export const ProductFeatureCreate = () => {

    const navigate = useNavigate();
    const [createProductFeature] = productFeatureAPI.useProductFeatureCreateMutation()
    const [productFeatureData, setProductFeatureData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_feature_name: (name) => name?.length > 0,
        checkValidate: () => validation.product_feature_name(productFeatureData.product_feature_name)
    }

    async function createProductFeatureHandler() {
        if (validation.checkValidate()) {
            const res = await createProductFeature(productFeatureData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/${res.product_feature_id}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}`}
                >
                    Список характеристик
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <TextInputBlock>
                        <TextInput
                            onChange={(value) => setProductFeatureData({...productFeatureData, product_feature_name: value})}
                            validation={{
                                validate: validation.product_feature_name,
                                validationError: isNotValid,
                                validationMessage: 'Характеристика обязательно должна иметь название.'
                            }}
                            label={'Название'}
                        />
                    </TextInputBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createProductFeatureHandler}>
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

const TextInputBlock = styled.div`
  width: 40%;
  min-width: 300px;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
`
