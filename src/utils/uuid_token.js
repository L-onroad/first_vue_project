import { v4 as uuidv4 } from 'uuid';
// 生成游客随机字符串，并且存储在本地，每次执行不变化
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}