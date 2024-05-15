import { getUser, loginWithEmailAndPassword, logout } from "@/api/users";
import { User } from "@/api/users/users.model";
import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  userData: User | null;
  loading: boolean;
  login: (email: string, password: string, callback: () => void) => Promise<void>;
  userLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  userData: null,
  loading: true,
  login: (email: string, password: string, callback: () => void) => Promise.resolve(),
  userLogout: () => Promise.resolve(),
});

function AuthProvider({children}: {children: ReactNode}): JSX.Element {
    const toast = useToast();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true);
        const user = await getUser();
        setUserData(user);
        setLoading(false);
      }
  
      fetchUserData();
    }, []);

    const login = async (email: string, password: string, callback: () => void) => {
      setLoading(true);
      try{
        const user = await loginWithEmailAndPassword(email, password);
        console.log(user);
        setUserData(user);
        callback();
      }catch(error){
        toast({
          title: 'Error',
          description: "Verifica tus credenciales.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    }

    const userLogout = async () => {
      setLoading(true);
      const status = await logout();

      if(status == 200){
        setUserData(null);
      }
  
      setLoading(false);
    }
  
    return (
      <AuthContext.Provider value={{userData, loading, login, userLogout}}>
        {children}
      </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
