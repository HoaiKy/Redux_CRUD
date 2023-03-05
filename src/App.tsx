import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './module/Layout';
import UserForm from './module/User/UserForm';
import UserList from './module/User/UserList';

function App() {
  return (
    <BrowserRouter>
      <Layout/>
      <Routes>
      <Route path='/' element={<Layout/>}></Route>
        <Route index element={<UserList/>}></Route>
        <Route path='/add' element={<UserForm/>}></Route>
        <Route path='/edit/:id' element={<UserForm isEditForm={true}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
