import { useMutation } from "react-query";
import { useUserContext } from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../services/user.service";

const Navbar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const logout = useMutation(
    () => {
      return UserDataService.logout();
    },
    {
      onSuccess: async () => {
        await UserDataService.get();

        setUser(null);

        navigate("/login");
      },
    }
  );
    return (
      <nav
      className="navbar is primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <Link to="/" className="navbar-item">
            Strona główna
            </Link>
            {!!user && user.isAdmin &&(
            <Link to="/rentals" className="navbar-item">
              Wypożyczalnie
              </Link>
              )}
              {!!user && user.isAdmin && (
            <Link to="/reservations" className="navbar-item">
              Rezerwacje
              </Link>
              )}
          </div>
        </div>
        <div className="navbar-end">
          {!!user && (
            <div className="navbar-item">Zalogowany jako {user.username}</div>
          )}
          <div className="buttons">
          {!!user ? (
              <div className="navbar-item">
                <button
                  className="button is-primary"
                  onClick={() => {
                    logout.mutate();
                  }}
                >
                  Wyloguj się
                </button>
              </div>
            ) : (
              <div className="navbar-item">
                <Link to="/Login" className="navbar-item">
                  <button className="button is-primary">Zaloguj się</button>
                </Link>
              </div>
                 )}
                 </div>
               </div>
             </div>
           </nav>

    );
  };
  
  export default Navbar