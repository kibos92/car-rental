import { ReactNode, createContext, useContext, useState } from "react";

interface UserState {
  username: string;
  isAdmin: boolean;
}

interface IUserContext {
  user: UserState | null;
  setUser: (user: UserState | null) => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};