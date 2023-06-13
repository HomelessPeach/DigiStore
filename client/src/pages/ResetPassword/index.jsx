import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {passwordHook, passwordValidate} from "../../utils";
import {useNavigate, useParams} from "react-router-dom";
import {RouteNames} from "../../Router";
import {PasswordInput} from "../../components/PasswordInput";
import {authAPI} from "../../services/AuthService";
import {useResponsive} from "../../hook/responsive";

export const ResetPassword = () => {

    const {smallMobile, tablet, mobile} = useResponsive()
    const navigate = useNavigate()
    const {token} = useParams()
    const [userData, setUserData] = useState({user_password: ''})
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [reset] = authAPI.useResetPasswordMutation()

    const validation = {
        user_password: (password) => password && passwordValidate(password),
        repeat_password: (resetPassword, password) => resetPassword === password,
        checkValidate: () =>
            validation.user_password(userData.user_password) &&
            validation.repeat_password(repeatPassword, userData.user_password)
    }

    async function resetPassword() {
        if (validation.checkValidate()) {
            const res = await reset({data: {user_password: await passwordHook(userData.user_password)}, token})
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
                            Пароль изменён
                        </Title>
                        <Description>
                            Пароль успешно изменён. Вернитесь на главную страницу и войдите в аккаунт
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
                            Изменение пароля
                        </Title>
                        <Description>
                            Введите новый пароль
                        </Description>
                        <EmailContainer>
                            <PasswordInput
                                value={userData?.user_password}
                                onChange={(value) => setUserData({...userData, user_password: value})}
                                validation={{
                                    validate: validation.user_password,
                                    validationError: isNotValid,
                                    validationMessage: 'Некорректный пароль. Пароль должен содержать не менее 1-ой буквы и цифры и быть от 5 до 25 символов'
                                }}
                                label={'Пароль'}
                                w={(smallMobile)? '80%': (tablet)? '60%' : (mobile)? '50%' : '40%'}
                            />
                            <PasswordInput
                                value={repeatPassword}
                                onChange={(value) => setRepeatPassword(value)}
                                validation={{
                                    validate: (pass) => validation.repeat_password(pass, userData.user_password || ''),
                                    validationError: isNotValid,
                                    validationMessage: 'Пароль не совпадает'
                                }}
                                label={'Повторите пароль'}
                                w={(smallMobile)? '80%': (tablet)? '60%' : (mobile)? '50%' : '40%'}
                            />
                            <Toolbar>
                                <Button
                                    onClick={resetPassword}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  @media (${({theme}) => theme.media.large}) {
    padding: 0;
  }
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