import React, {useState, useEffect, useRef } from 'react'
import Style from "./UserFormStyle.module.css"
import { TextField } from '../../component/TextField';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IUserForm, ApiStatus, IUpdateUserForm } from './User.type';
import { RootState } from '../../app/store';
import {useParams} from 'react-router-dom'
import { addUserListAction, resetAddUserListStatus, udateUserListAction, resetUpdateUserListStatus } from './UserSlice';


type IEditProps = {
  isEditForm?: boolean
}
const UserForm = (props: IEditProps) => {
  const {isEditForm} = props
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const { addUserFormStatus, updateUserFormStatus }  = useAppSelector((state: RootState)=> state.user)
  const dispatch = useAppDispatch()
  const {list} = useAppSelector((state: RootState)=> state.user)
  const params = useParams()
  const editId = useRef(parseInt(params.id || ""))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data: IUserForm = {name, email}
    if (isEditForm){
      const updateData : IUpdateUserForm = { id: editId.current, data}
      dispatch(udateUserListAction(updateData))
    }
    else {
      dispatch(addUserListAction(data))
    }
    
  }
  useEffect(()=>{
    if (isEditForm && editId.current){
      const userData = list.filter( x =>x.id === editId.current)
      if(userData.length === 1){
        setName(userData[0].name)
        setEmail(userData[0].email)
      }
    }
  },[isEditForm])
  return (
    <div className={Style.container}>
        <form  onSubmit={onSubmit}>
           <TextField onChange={(e: ChangeEvent<HTMLInputElement>)=>{setName(e.target.value)}} label="Name: " value={ name }/>
           <TextField onChange={(e: ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}  type="email" label="Email:" value={ email }/>
            <div>
                <input type="submit" value={isEditForm ?"Update user" : "Add"} disabled={addUserFormStatus === ApiStatus.loading || updateUserFormStatus === ApiStatus.loading}/>
            </div>
        </form>
    </div>
  )
}

export default UserForm