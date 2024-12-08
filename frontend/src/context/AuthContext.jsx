import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const users = {
  user: {
    username: 'user',
    password: 'user',
    role: 'user'
  },
  admin: {
    username: 'admin',
    password: 'admin',
    role: 'admin'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(users);

  const login = (username, password) => {
    const foundUser = Object.values(registeredUsers).find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (username, password) => {
    // Check if username already exists
    if (Object.values(registeredUsers).some(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    // Create new user
    const newUser = {
      username,
      password,
      role: 'user'
    };

    // Add to registered users
    setRegisteredUsers(prev => ({
      ...prev,
      [username]: newUser
    }));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
