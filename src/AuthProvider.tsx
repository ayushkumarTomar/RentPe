import React, { useEffect, ReactNode } from 'react';
import useAuthStore from './store/auth';
import AppwriteService from './services/appwrite';
import Loader from './components/Loader';
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const {toggleLoading , login , loading} = useAuthStore()

	useEffect(() => {
        const fetchData = async () => {

            console.log("Fetching login status    ")
          const appwrite = new AppwriteService();
          const loggedIn = await appwrite.getCurrentUser();
    
          if (loggedIn) {
            console.log("Auth provider logged in ")
            login(loggedIn);
          }
          toggleLoading();
        };
    
        fetchData();
      }, [login, toggleLoading]);


      console.log("Loading state:", loading);

    
      return loading ?<Loader /> : <>{children}</>;
    };
    
    export default AuthProvider;