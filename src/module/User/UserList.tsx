import React , {useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { ApiStatus, IUser } from './User.type';
import { getUserListAction, delUserListAction } from './UserSlice';
import Modal from '../../component/Modal';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
    const {list, listStatus} = useAppSelector((state: RootState)=> state.user)
    //dispatch
    const dispatch = useAppDispatch()
    //modal action
    const [data, setDataToView] = useState<IUser | null>(null)
    //navigate
    const navigate = useNavigate()

    const view = (user: IUser) =>{
        setDataToView(user)
    }

    useEffect(()=>{
        dispatch(getUserListAction())
    },[])
    
    
    return (
        <><table>
            <tr>
                <th>Sr . No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            {listStatus === ApiStatus.ideal &&
                list.map((user: IUser, index: number) => {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <input type="button" value="View" onClick={()=> view(user)}/>
                                <input type="button" value="Edit" onClick={() => navigate(`/edit/${user.id}`)}/>
                                <input type="button" value="Delete" onClick={()=> dispatch(delUserListAction(user.id))} />
                            </td>
                        </tr>
                    );

                })}
        </table>
        {data &&
        <Modal label="Detail" onClose={ () => {setDataToView(null)} }>
            <div>
                <label>Name: {data.name}</label>
                <br/>
                <label>Email: {data.email}</label>
            </div>
            </Modal>
        }
        </>
  )
}

export default UserList