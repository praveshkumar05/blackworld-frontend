
import React from "react";
import { NavLink } from "react-router-dom";
const Adminmenu = () => {
  return (
    <div className="text-center bg-black" >
        <div className="list-group">
           <h5 >  <NavLink to="/dashboard/admin" activeClassName="active" className="nav-link">
                       <span style={{ color:"whitesmoke" }}>Admin Panel</span>
                  </NavLink>
           </h5>
          <l1> <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
                 Create Category
               </NavLink>
          </l1>
         
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            Products
          </NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
             Orderes
          </NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
             Users
          </NavLink>
        </div>
    </div>
  );
};

export default Adminmenu;
