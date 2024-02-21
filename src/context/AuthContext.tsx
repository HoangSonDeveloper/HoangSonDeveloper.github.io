import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (values: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider: FC<any> = ({ children, history }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify the token with your backend here
      setIsAuthenticated(true);
    }
  }, []);

  const login = (values: any) => {
    if (values?.data?.access_token) {
      localStorage.setItem('token', values?.data?.access_token);
      setIsAuthenticated(true);
    }
  };
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
