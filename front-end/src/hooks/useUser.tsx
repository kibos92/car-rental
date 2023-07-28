import { ReactNode, createContext, useContext, useState } from "react";
import IUserData from "../types/user.type";

interface IUserContext {
  user: IUserData | null;
  setUser: (user: IUserData | null) => void;
}

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};