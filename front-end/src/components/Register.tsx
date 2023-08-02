import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import UserDataService, { UserCredentials } from "../services/user.service";

function Register() {
  const navigate = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = useMutation((newUser: UserCredentials) => {
    return UserDataService.register(newUser);
  },
  {
    onSuccess: async () => {
        navigate("/Login");
      },
    onError: () => {
      alert("Error during registration");
    }
  }
  );

  const handleRegister = () => {
    const newUser: UserCredentials = {
      username: registerUsername,
      password: registerPassword,
    };
    register.mutate(newUser);
    setRegisterUsername("");
    setRegisterPassword("");
  };

  return (
    <div>
        <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Register</h1>
        </div>

        <div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

<div className="box">
  
<div className="field">
<label className="label">Username:</label>
<div className="control">
<input className="input" type="text" placeholder="Username" onChange={(e) => setRegisterUsername(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Password: </label>
<div className="control">
<input className="input" type="password" placeholder="Password" onChange={(e) => setRegisterPassword(e.target.value)}/>
</div>
</div>

</div>

</div>

<div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<button className="button is-primary"  onClick={handleRegister}>Submit</button>
</div>

  </div>
  );
}

export default Register;