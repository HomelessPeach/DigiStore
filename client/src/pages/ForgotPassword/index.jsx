import * as React from "react";
import styled from "styled-components";
import {TextInput} from "../../components/TextInput";
import {useEffect, useState} from "react";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {emailValidate} from "../../utils";

export const ForgotPassword = () => {

    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState(false)
    const [codeIsTrue, setCodeIsTrue] = useState(false)

    return (
        <ForgotPasswordPage>
            <ForgotPasswordContainer>
                <Title>
                    Восстановление пароля
                </Title>
                {(sendEmail) ?
                    (codeIsTrue) ?
                        <PasswordContainer>
                            <Description>
                                Введите новый пароль
                            </Description>
                                <TextInput
                                    value={password}
                                    onChange={(value) => setPassword(value)}
                                    label={'Пароль'}
                                    w={'100%'}
                                />
                                <TextInput
                                    value={repeatPassword}
                                    onChange={(value) => setRepeatPassword(value)}
                                    label={'Повторите пароль'}
                                    w={'100%'}
                                />
                            <Toolbar>
                                <Button>
                                    Сохранить
                                </Button>
                            </Toolbar>
                        </PasswordContainer>
                        :
                        <CodeContainer>
                            <Description>
                                Введите код отправленный на вашу почту
                            </Description>
                            <TextInput
                                value={code}
                                onChange={(value) => setCode(value)}
                                label={'Код'}
                                w={'100%'}
                            />
                            <CodeToolbar>
                                <Button
                                    onClick={() => setSendEmail(false)}
                                >
                                    Назад
                                </Button>
                                <Button
                                    onClick={() => {
                                        setCodeIsTrue(true)
                                    }}
                                >
                                    Далее
                                </Button>
                            </CodeToolbar>
                        </CodeContainer>
                    :
                    <EmailContainer>
                        <Description>
                            Укажите вашу почту
                        </Description>
                        <TextInput
                            value={email}
                            onChange={(value) => setEmail(value)}
                            label={'e-mail'}
                            w={'100%'}
                        />
                        <Toolbar>
                            <Button
                                onClick={() => {
                                    if (email && emailValidate(email)) {
                                        setSendEmail(true)
                                    }
                                }}
                            >
                                Далее
                            </Button>
                        </Toolbar>
                    </EmailContainer>
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
  padding: 0 400px;
`

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`

const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
`

const PasswordContainer = styled.div`
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

const CodeToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 0;
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