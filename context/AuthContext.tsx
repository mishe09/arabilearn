'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  displayName: string;
  hasPremium: boolean;
  unitsCompleted: number;
};

type AuthContextType = {
  user: User | null;

  // Existing learning-app loading state
  loading: boolean;

  // Translator compatibility
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: '1',
  name: 'Musa Abdullahi',
  email: 'musa@example.com',
  displayName: 'Musa',
  hasPremium: false,
  unitsCompleted: 2,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('mock_user');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('mock_user');
        setUser(MOCK_USER);
        localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
      }
    } else {
      // Demo auto-login
      // Remove this block later when real authentication is connected.
      setUser(MOCK_USER);
      localStorage.setItem('mock_user', JSON.stringify(MOCK_USER));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      // Mock login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For now, any email/password logs in as MOCK_USER.
      // Replace this later with a real API call.
      const loggedInUser = {
        ...MOCK_USER,
        email: email || MOCK_USER.email,
      };

      setUser(loggedInUser);
      localStorage.setItem('mock_user', JSON.stringify(loggedInUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  // These are the values your translator page expects.
  const isAuthenticated = user !== null;
  const isLoading = loading;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}