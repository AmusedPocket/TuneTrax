import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import FeatureComingSoonModal from "../FeatureComingSoonModal/FeatureComingSoonModal";
import OpenModalMenuItem from "./OpenModalMenuItem";


function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
        <button className="upcoming"> <OpenModalMenuItem
                                itemText="Feed"
                                modalComponent={<FeatureComingSoonModal />}

                            /></button>
        </li>
        <li>
          <NavLink to="/upload">Upload</NavLink>
        </li>
        
      </ul>
      
      <div className="nav-link-title">Tune Trax<img className="nav-link-logo" src="https://tunetrax-pictures.s3.us-west-2.amazonaws.com/favicon.webp"/></div>
      <ul>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
