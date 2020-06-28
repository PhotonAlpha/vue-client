import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const tokenKey = 'admin_token'
const commenterTokenKey = 'commenter_token'
const accessToken = '00B2D5204EB85A1E9381CF162ACE18599353D35C5D7F3B1E5F58B3F9B3818755F13DEEE0B7E2A0403E6EAB810C57A7C0'
const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF')
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412')

export function getToken() {
  let token = Cookies.get(tokenKey)
  if (!token) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(accessToken)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    Cookies.set(tokenKey, decryptedStr)
    token = decryptedStr
  }
  return token
}

export function getCommenterToken() {
  return Cookies.get(commenterTokenKey)
}

export function setToken(token) {
  return Cookies.set(commenterTokenKey, token)
}

export function removeToken() {
  return Cookies.remove(commenterTokenKey)
}
