import { useContext, useState } from 'react'

import AuthContext from '../context/AuthContextProvider';

import { Button } from '../components/Button';
import classes from './Payment.module.css';
import ErrorGeneric from './ErrorGeneric';
import { Link } from 'react-router-dom';


export const AdminPanel = () => {
  const authCtx = useContext(AuthContext);


  return (<>
    <Button> <Link to="/users">Users</Link></Button>
  </>)
}
