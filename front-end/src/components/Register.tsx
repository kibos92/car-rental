import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import UserDataService, { RegisterCredentials } from "../services/user.service";

function Register() {
  const navigate = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerContactDetails, setRegisterContactDetails] = useState("");

  const register = useMutation((newUser: RegisterCredentials) => {
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
    const newUser: RegisterCredentials = {
      username: registerUsername,
      password: registerPassword,
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
      contactDetails: registerContactDetails
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

<div className="field">
<label className="label">First Name: </label>
<div className="control">
<input className="input" type="text" placeholder="First Name" onChange={(e) => setRegisterFirstName(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Last Name: </label>
<div className="control">
<input className="input" type="text" placeholder="Last Name" onChange={(e) => setRegisterLastName(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Email: </label>
<div className="control">
<input className="input" type="text" placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Contact Details: </label>
<div className="control">
<input className="input" type="text" placeholder="Contact Details" onChange={(e) => setRegisterContactDetails(e.target.value)}/>
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