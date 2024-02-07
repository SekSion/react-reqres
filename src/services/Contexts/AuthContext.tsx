import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  loginUserStore: (email: string, token: string, first_name: string) => void;
  registerUserStore: (id: number, token: string) => void;
  logoutUser: () => void;
  isAuthenticated: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  const loginUserStore = (email: string, token: string, first_name: string) => {
    const authData = { email, token, first_name };
    localStorage.setItem("authData", JSON.stringify(authData));
    setToken(token);
  };

  const registerUserStore = (id: number, token: string) => {
    const authData = { id, token };
    localStorage.setItem("authDataRegister", JSON.stringify(authData));
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("authDataRegister");
    setToken(null);
  };

  const isAuthenticated = () => !!localStorage.getItem("authData");

  const authContextValue: AuthContextType = {
    token,
    loginUserStore,
    logoutUser,
    isAuthenticated,
    registerUserStore,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
