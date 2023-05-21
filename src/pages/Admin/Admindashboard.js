import React from 'react'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
import Layout from "../../components/Layout.js/Layout.js";
import { useAuth } from '../../components/Layout.js/context/auth';
const Admindashboard = () => {
  const [auth]=useAuth();
  return (
    
    <Layout>
     
          <div className="container  " style={{height:"100vh"}}>
            <div className="row justify-content-center">
                  <div className="col-md-4">
                      <Adminmenu/>
                  </div>
                  <div className="col-md-8 " style={{display:'center' }}>
                        <div className="card w-60 h-100  p-3" style={{borderRadius:"2%"}}>
                           <h3> <strong>Name::-{auth?.user?.name}</strong></h3>
                           <h3> <strong>Email::-{auth?.user?.email}</strong></h3>
                           <h3><strong>Moblile::{auth?.user?.phone}</strong></h3>
                           <h3> <strong>address::{auth?.user?.address}</strong></h3>
                
                        </div>
                  </div>
            </div>
          </div>
         
    </Layout>
  )
}

export default Admindashboard
