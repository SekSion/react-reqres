import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  loginUserStore: (email: string, token: string) => void;
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

  const loginUserStore = (email: string, token: string) => {
    const authData = { email, token };
    localStorage.setItem("authData", JSON.stringify(authData));
    setToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem("authData");
    setToken(null);
  };

  const isAuthenticated = () => !!token;

  const authContextValue: AuthContextType = {
    token,
    loginUserStore,
    logoutUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
