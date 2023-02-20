import * as React from "react";
import bcrypt from 'bcryptjs';
import {useEffect} from "react";
import {useLocation} from "react-router-dom";


export const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export function base64StringToFile(base64String, filename) {
    let arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

export async function passwordHook(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function checkPassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword)
}

export function passwordValidate(password) {
    const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-z])^[0-9a-z!@#$%^&*:().;<>'"{}[\]?/|\-_\\~`]{5,25}$/ig
    return PASSWORD_REGEXP.test(password)
}

export function emailValidate(email) {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
}

export function userNameValidate(userName) {
    const USERNAME_REGEXP = /(?=(?:.*?[a-zа-я]){2})(?=(?!.*?\s{2}))^[0-9a-zа-я\s#*.():_\-]{2,30}$/ig
    return USERNAME_REGEXP.test(userName);
}

export function priceFormat(text) {
    const newText = String(text)
    const result = []
    let str = ''
    for (let i = newText.length - 1; i >= 0; i--) {
        str += newText[i]
        if (i === 0 || str.length%3 === 0) {
            result.push(str.split('').reverse().join(''))
            str = ''
        }
    }
    return result.reverse().join('.')
}

export const formattedText = (text) => {
    const lines = String(text).split('\\n')
    const lastLineIndex = lines.length - 1
    return lines.map((item, index) => (lastLineIndex !== index)? <>{item}<br/></> : item)
}