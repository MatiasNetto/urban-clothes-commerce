import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
  //retorna el contexto de auth
  return useContext(AuthContext);
};

export default useAuth;
