
import React from "react";
import { NavLink } from "react-router-dom";
const Usermenu = () => {
  return (
    <div className="text-center">
        <div class="list-group">
           <h3 style={{ backgroundColor:"GrayText" }}> <span style={{ color:"whitesmoke" }}> <strong>User Panel</strong></span></h3>
          <l1> <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
              <strong>profile</strong>
          </NavLink>
          </l1>
         
          <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
          <strong>Orderes</strong>
          </NavLink>
        </div>
    </div>
  );
};

export default Usermenu;
