import React from 'react'
import Loader from '../Loader/Loader'
import {useSelector} from "react-redux"
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

function AuthLayout({children} : {children : React.ReactNode},authentication : boolean = true) {
    const isAuthenticate = useSelector((state : RootState) => state.auth.authenticate);
    const navigate = useNavigate();
    if(authentication && isAuthenticate !== authentication){
        navigate("/login")
    } else if(!authentication && isAuthenticate !== authentication){
        navigate("/")
    }
    return !isAuthenticate ? <Loader /> : { children };
}

export default AuthLayout