// components/Authenticated.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useValidateTokenQuery } from '../../config/Api';
import { setLogin, setLogout } from '../../state/authSlice';
import { RootState } from '../../store/store';
import Loader from '../Loader/Loader';

const Authenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.authenticate);

  const { data, isLoading, isError } = useValidateTokenQuery(undefined, {
    skip: isAuthenticated,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.isValid && data.user) {
      dispatch(setLogin({data:data.user}));
      navigate('/home');
    } else if (isError) {
      dispatch(setLogout());
    }
  }, [data, isLoading, isError, dispatch, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default Authenticated;
