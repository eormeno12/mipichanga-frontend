import { getUser, loginWithEmailAndPassword, logout } from "@/api/users";
import { User } from "@/api/users/users.model";
import { validateEmailAndPassword } from "@/utils/validate";
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
        const user = await getUser();
        setUserData(user);
      }
  
      setLoading(true);
      fetchUserData();
      setLoading(false);
    }, []);

    const errorToast = (title: string, description: string) => {
      toast({
        title,
        description,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    const login = async (email: string, password: string, callback: () => void) => {
      setLoading(true);
      
      const errors = validateEmailAndPassword(email, password);
      if (errors.length > 0) {
        errorToast('Error', errors.join('. '));
        setLoading(false);
        return;
      }

      try{
        const user = await loginWithEmailAndPassword(email, password);
        setUserData(user);
        callback();
      }catch(error){
        errorToast('Error', "Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.");
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
