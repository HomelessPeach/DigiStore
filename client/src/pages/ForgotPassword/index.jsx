import * as React from "react";
import styled from "styled-components";
import {TextInput} from "../../components/TextInput";
import {useState} from "react";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {emailValidate} from "../../utils";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../Router";
import {authAPI} from "../../services/AuthService";

export const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [forgotPassword] = authAPI.useSendResetPasswordMutation()

    async function sendResetPassword() {
        if (emailValidate(email)) {
            const res = await forgotPassword({user_email: email})
            if (!res?.error) {
                setIsSuccess(true)
            }
        } else {
            setIsNotValid(true)
        }
    }

    return (
        <ForgotPasswordPage>
            <ForgotPasswordContainer>
                {(isSuccess)?
                    <>
                        <Title>
                            Восстановление пароля
                        </Title>
                        <Description>
                            На вашу почту отправлено письмо для изменения пароля
                        </Description>
                        <Button
                            style={{marginTop: 30}}
                            onClick={() => navigate(RouteNames.HOME)}
                        >
                            На главную
                        </Button>
                    </>
                    :
                    <>
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
                    </>
                }
            </ForgotPasswordContainer>
        </ForgotPasswordPage>
    )
}

const ForgotPasswordPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20%;
  @media (${({theme}) => theme.media.large}) {
    padding: 0;
  }
`

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  @media (${({theme}) => theme.media.small}) {
    padding: 0 20px;
  }
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
  @media (${({theme}) => theme.media.small}) {
    font-size: 27px;
  }
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