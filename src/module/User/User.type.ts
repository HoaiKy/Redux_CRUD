export interface IUser {
    id: number
    name: string
    email: string
}
export interface IUserForm {
    name: string
    email: string
}
export interface IUpdateUserForm {
    id: number
    data: IUserForm
}
export enum ApiStatus {
    "loading",
    "ideal",
    "error",
    "success",
}
export interface IUserState {
    list : IUser[]
    listStatus: ApiStatus;
    addUserFormStatus: ApiStatus
    delUserFormStatus: ApiStatus
    updateUserFormStatus : ApiStatus
}
