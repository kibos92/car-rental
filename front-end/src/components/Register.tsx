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
        <div className="content">
          <h1>Zarejestruj się</h1>
        </div>

        <div className="block">

<div className="box">
  
<div className="field">
<label className="label">Nazwa użytkownika:</label>
<div className="control">
<input className="input" type="text" placeholder="Login" onChange={(e) => setRegisterUsername(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Hasło: </label>
<div className="control">
<input className="input" type="password" placeholder="Hasło" onChange={(e) => setRegisterPassword(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Imię: </label>
<div className="control">
<input className="input" type="text" placeholder="Imię" onChange={(e) => setRegisterFirstName(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Nazwisko: </label>
<div className="control">
<input className="input" type="text" placeholder="Nazwisko" onChange={(e) => setRegisterLastName(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Email: </label>
<div className="control">
<input className="input" type="text" placeholder="Email" onChange={(e) => setRegisterEmail(e.target.value)}/>
</div>
</div>

<div className="field">
<label className="label">Dane kontaktowe: </label>
<div className="control">
<input className="input" type="text" placeholder="Dane kontaktowe" onChange={(e) => setRegisterContactDetails(e.target.value)}/>
</div>
</div>

</div>

</div>

<div className="block">
<button className="button is-primary"  onClick={handleRegister}>Zatwierdź</button>
</div>

  </div>
  );
}

export default Register;