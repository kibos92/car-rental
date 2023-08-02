import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import UserDataService, { UserCredentials } from "../services/user.service";
import { useUserContext } from "../hooks/useUser";
import { Link } from "react-router-dom";

function Login() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = useMutation(
    (userData: UserCredentials) => {
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
    const userData: UserCredentials = {
      username: loginUsername,
      password: loginPassword
    };
    login.mutate(userData);
    setLoginUsername("");
    setLoginPassword("");
  };

  return (
      <div>
         <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Login</h1>
        </div>

        <div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div className="box">
          
        <div className="field">
        <label className="label">Username:</label>
        <div className="control">
        <input className="input" type="text" placeholder="Username" onChange={(e) => setLoginUsername(e.target.value)}/>
        </div>
        </div>

        <div className="field">
        <label className="label">Password: </label>
        <div className="control">
        <input className="input" type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}/>
        </div>
        </div>

        </div>

        </div>

        <div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className="button is-primary"  onClick={handleLogin}>Submit</button>
        </div>

        <div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p>Nie masz konta? Zarejestruj się: </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/Register">
        <button className="button is-primary">Register</button>
        </Link>
        </div>
        
      </div>
  );
}

export default Login;