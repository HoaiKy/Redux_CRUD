import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus, IUpdateUserForm, IUserForm, IUserState } from './User.type';
import { addUserList, delUserList, getUserList, updateUserList } from './UserService';

const initialState : IUserState = {
    list : [],
    listStatus: ApiStatus.ideal,
    addUserFormStatus: ApiStatus.ideal,
    delUserFormStatus: ApiStatus.ideal,
    updateUserFormStatus: ApiStatus.ideal,
}

export const getUserListAction = createAsyncThunk("user/getUserListAction", async () => {
    // api to get list
    const response = await getUserList()
    //return response data
    return response.data
})

export const addUserListAction = createAsyncThunk("user/addUserListAction", async (data: IUserForm) => {
    // api to add list
   const response = await addUserList(data)
   return response.data
})

export const delUserListAction = createAsyncThunk("user/delUserListAction", async (id: number) => {
    // api to del a record
    await delUserList(id)
    return id
})

export const udateUserListAction = createAsyncThunk("user/updateUserListAction", async ({data, id}: IUpdateUserForm) => {
    // api to update a record
    const response = await updateUserList(data,id)
    return response.data
})

const UserSlice = createSlice ({
    name: "user",
    initialState,
    reducers: {
        resetAddUserListStatus : (state) => {
            state.addUserFormStatus = ApiStatus.ideal
        },
        resetUpdateUserListStatus : (state) => {
            state.updateUserFormStatus = ApiStatus.ideal
        }
    },
    extraReducers: (builder) => {
        //get
        builder.addCase(getUserListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading
        })
        builder.addCase(getUserListAction.fulfilled, (state, action)=>{
            state.listStatus = ApiStatus.ideal
            state.list = action.payload
        })
        builder.addCase(getUserListAction.rejected, (state)=>{
            state.listStatus = ApiStatus.error
        })

        //add
        builder.addCase(addUserListAction.pending, (state) => {
            state.addUserFormStatus = ApiStatus.loading
        })
        builder.addCase(addUserListAction.fulfilled, (state)=>{
            state.addUserFormStatus = ApiStatus.ideal
        })
        builder.addCase(addUserListAction.rejected, (state)=>{
            state.addUserFormStatus = ApiStatus.error
        })

        //del

        builder.addCase(delUserListAction.fulfilled, (state, action)=>{
            const newList = state.list.filter((x)=> x.id !== action.payload)
            state.list = newList
        })

        //update
        builder.addCase(udateUserListAction.pending, (state) => {
            state.updateUserFormStatus = ApiStatus.loading
        })
        builder.addCase(udateUserListAction.fulfilled, (state)=>{
            state.updateUserFormStatus = ApiStatus.ideal
        })
        builder.addCase(udateUserListAction.rejected, (state)=>{
            state.updateUserFormStatus = ApiStatus.error
        })
    }
})

export default UserSlice.reducer
export const { resetAddUserListStatus, resetUpdateUserListStatus } = UserSlice.actions
