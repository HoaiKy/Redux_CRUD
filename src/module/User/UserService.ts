import httpService from "../../service/HttpService"
import ApiConfig from "../../service/ApiConfig"
import { IUser,IUserForm  } from './User.type';
export const getUserList = async () => {
    return await httpService.get<IUser[]>(ApiConfig.user)
}

export const addUserList = async (data: IUserForm) => {
    return await httpService.post<IUser>(ApiConfig.user, data)
}

export const delUserList = async (id: number) => {
    const baseUrl =`${ApiConfig.user}/${id}`
    return await httpService.delete(baseUrl)
}

export const updateUserList = async (data: IUserForm, id: number) => {
    const baseUrl =`${ApiConfig.user}/${id}`
    return await httpService.put<IUser>(baseUrl, data)
}
