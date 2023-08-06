import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import UserDataService, { LoginCredentials } from "../services/user.service";
import { useUserContext } from "../hooks/useUser";
import { Link } from "react-router-dom";

function Login() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = useMutation(
    (userData: LoginCredentials) => {
      return UserDataService.login(userData);
    },
    {
      onSuccess: async () => {
        const { data } = await UserDataService.get();

        setUser(data);

        navigate("/");
      },
      onError: () => {
        alert("Error during login");
      },
    }
  );

  const handleLogin = () => {
    const userData: LoginCredentials = {
      username: loginUsername,
      password: loginPassword
    };
    login.mutate(userData);
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
      <div>
         <div className="content">
          <h1>Zaloguj się</h1>
        </div>

        <div className="block">

        <div className="box">
          
        <div className="field">
        <label className="label">Nazwa użytkownika:</label>
        <div className="control">
        <input className="input" type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)}/>
        </div>
        </div>

        <div className="field">
        <label className="label">Hasło: </label>
        <div className="control">
        <input className="input" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}/>
        </div>
        </div>

        </div>

        </div>

        <div className="block">
        <button className="button is-primary"  onClick={handleLogin}>Zatwierdź</button>
        </div>

        <div className="block">
          <p>Nie masz konta? Zarejestruj się: </p>
        </div>

        <div className="block">
          <Link to="/Register">
        <button className="button is-primary">Zarejestruj się</button>
        </Link>
        </div>
        
      </div>
  );
}

export default Login;