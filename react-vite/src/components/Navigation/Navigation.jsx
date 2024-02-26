import { NavLink } from "react-router-dom";
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
          <NavLink to="/feed">Feed</NavLink>
        </li>
        <li>
          <NavLink to="/upload">Upload</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
