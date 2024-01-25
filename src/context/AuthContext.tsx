import React, {
    ReactNode,
    useContext,
    useEffect,
    useState,
    createContext,
} from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { centralize } from "@/app/login/page";
import { Box } from "@mui/material";

const auth = getAuth(firebase_app);

// Definindo a interface para o valor do contexto
interface AuthContextType {
    user: User | null;
}

// Criando o contexto com um valor padrão
export const AuthContext = createContext<AuthContextType>({ user: null });

// Hook para usar o AuthContext
export const useAuthContext = () => useContext(AuthContext);

// Definindo as props para AuthContextProvider
interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FunctionComponent<
    AuthContextProviderProps
> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <Box sx={centralize()}>Loading...</Box> : children}
        </AuthContext.Provider>
    );
};
