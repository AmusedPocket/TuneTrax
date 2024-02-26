import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <div onClick={()=>window.alert("Feature coming soon")}>Feed</div>
        </li>
        <li>
          <NavLink to="/upload">Upload</NavLink>
        </li>
        
      </ul>
      <div className="nav-link-title">Tune Trax</div>
      <ul>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
