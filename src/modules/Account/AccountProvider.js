import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import backend from '../../utils/api/axios';
import { LOCAL_STORAGE } from '../../utils/helpers/constants';
import { useNavigate } from "react-router-dom";


const AccountContext = React.createContext({
  signIn: () => {}
});

const AccountProvider = ({children}) => {
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: '', username: '', email: '' });

  const saveToken = (user_id, username, token) => {
    localStorage.setItem(LOCAL_STORAGE.USER_ID, user_id);
    localStorage.setItem(LOCAL_STORAGE.USER_NAME, username);
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
  }

  const fetchCurrentUser = useCallback(async () => {
    let isError;
    let response;
    try {
      response = await backend.get('/users/current');
      isError = !response.username;
    } catch (error) {
      isError = true;
    }
    if (isError) {
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.IS_AUTHENTICATED);
      navigate('/');
    } else {
      setCurrentUser({
        username: response.username,
        id: response.id,
        email: response.email
      });
    }
  }, [setCurrentUser, navigate]);

  const signIn = async ({ username, password, remember }) => {
    try{

      const response = await backend.post('signin', {
          username,
          password,
        });
      
      if (response && response.data && response.data.status === 'error') {
        console.log('Error logging in!');
        // TODO: Setup a function here
      } else {
        const { id ,username, email, token } = response;
        setCurrentUser({ id, username, email });
        saveToken(id, username, token);

        console.log('Success login!');
        navigate('/');
      }

      // Working
      // const baseURL = 'http://localhost:5001/backend/signin'
      // axios.post(baseURL, {username, password}).then((response) => {console.log(response)})
      
    } catch (error) {
      console.log(error)
    }
  }

  const value = {
    signIn,
    fetchCurrentUser
  }

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error('AccountProvider not found in parent components');
  }

  return context;
}

export default AccountProvider;