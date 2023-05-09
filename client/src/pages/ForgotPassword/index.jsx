import * as React from "react";
import styled from "styled-components";
import {TextInput} from "../../components/TextInput";
import {useEffect, useState} from "react";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {emailValidate} from "../../utils";

export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)

    async function sendResetPassword() {
        if (emailValidate(email)) {

        } else {
            setIsNotValid(true)
        }
    }

    return (
        <ForgotPasswordPage>
            <ForgotPasswordContainer>
                <Title>
                    Восстановление пароля
                </Title>
                <Description>
                    Укажите почту привязанную к аккаунту
                </Description>
                <EmailContainer>
                    <TextInput
                        value={email}
                        onChange={(value) => setEmail(value)}
                        validation={{
                            validate: emailValidate,
                            validationError: isNotValid,
                            validationMessage: 'Некорректный e-mail'
                        }}
                        label={'e-mail'}
                        w={'100%'}
                    />
                    <Toolbar>
                        <Button
                            onClick={sendResetPassword}
                        >
                            Отправить
                        </Button>
                    </Toolbar>
                </EmailContainer>
            </ForgotPasswordContainer>
        </ForgotPasswordPage>
    )
}

const ForgotPasswordPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 400px;
`

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`

const ForgotPasswordContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  box-shadow: 0 0 10px 0 #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 10px 20px;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`

const Description = styled.div`
  padding: 10px;
  line-height: 1.5;
`