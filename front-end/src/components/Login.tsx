import { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import UserDataService from "../services/user.service";
import IUserData from "../types/user.type";

function Login() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const queryClient = useQueryClient();

  const register = useMutation((newUser: IUserData) => {
    return UserDataService.register(newUser);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  
  const login = useMutation((userData: IUserData) => {
    return UserDataService.login(userData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  });

  const handleRegister = () => {
    const newUser: IUserData = {
      username: registerUsername,
      password: registerPassword,
    };
    register.mutate(newUser);
  };

  const handleLogin = () => {
    const userData: IUserData = {
      username: loginUsername,
      password: loginPassword,
    };
    login.mutate(userData);
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
        <button onClick={handleRegister}>Submit</button>
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
        <button onClick={handleLogin}>Submit</button>
      </div>

      
    </div>
  );
}

export default Login;