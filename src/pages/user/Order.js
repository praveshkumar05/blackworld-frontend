import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout.js/Layout";
import Usermenu from "../../components/Layout.js/Usermenu";
import { useAuth } from "../../components/Layout.js/context/auth";
import { getOrdersfunc } from "../../components/Layout.js/APIS/apicall";
import moment from "moment";
const Order = () => {
  const [orders,setOrders]=useState([]);
  const [auth]=useAuth();
  const getOrders=async()=>{
      try {
          const {data}=await getOrdersfunc();
          setOrders(data);
      } catch (error) {
        console.log(error);
        
      }
  }
  useEffect(()=>{
      if(auth?.token)getOrders();
  },[auth?.token])
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-9">
           <h1 className="text-center">All Orders</h1>
           {
             orders.map((o,i)=>{
                  return (
                    <div className="border shadow">
                        <table className="table">
                             <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Buyer</th>
                                  <th scope="col">Date</th>
                                  <th scope="col">Payment</th>
                                  <th scope="col">quantity</th>
                                </tr>
                             </thead>
                             <tbody>
                                <tr>
                                    <th>{i+1}</th>
                                    <th>{o?.status}</th>
                                    <th>{o?.buyer?.name}</th>
                                    <th>{moment(o?.createAt).fromNow()}</th>
                                    <th>{o?.payment.success?"Success":"Failed"}</th>
                                    <th>{o?.products?.length}</th>
                                </tr>
                             </tbody>
                        </table>
                          <div className="container">
                          {
              o?.products?.map((p) => (
                <div className="row card flex-row mb-2 p-3">
                  <div className="col-md-4">
                    <img
                      className="card-img-top"
                      width={"200px"}
                      height={"200px"}
                      src={`http://localhost:6010/api/v1/product/productPhoto/${p._id}`}
                      alt="Card  cap"
                    />
                  </div>
                  <div className="col-md-8">
                    <h4>{p.name}</h4>
                    <p>{p.description}</p>
                    <h4>Price: {p.price}</h4>
                  </div>
                </div>
              ))
            }
                          </div>


                    </div>
                  )
             })
           }

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
