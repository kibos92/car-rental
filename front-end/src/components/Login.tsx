import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import UserDataService from "../services/user.service";
import IUserData from "../types/user.type";

function Login() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState<IUserData | null>(null);

  const registerMutation = useMutation((userData: IUserData) =>
    UserDataService.register(userData)
  );

  const loginMutation = useMutation((userData: IUserData) =>
    UserDataService.login(userData)
  );

  const getUserQuery = useQuery("user", UserDataService.get);

  const register = () => {
    const userData: IUserData = {
      firstName: registerUsername,
      password: registerPassword,
    };

    registerMutation.mutate(userData);
  };

  const login = () => {
    const userData: IUserData = {
      firstName: loginUsername,
      password: loginPassword,
    };

    loginMutation.mutate(userData);
  };

  const getUser = () => {
    getUserQuery.refetch();
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {getUserQuery.isSuccess && typeof getUserQuery.data === "object" ? (
        <h1>Welcome Back {getUserQuery.data.firstName}</h1>
        ) : null}
      </div>
    </div>
  );
}

export default Login;