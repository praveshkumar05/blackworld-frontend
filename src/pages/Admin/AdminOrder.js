import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout.js/Routes/Adminmenu'
import Layout from '../../components/Layout.js/Layout'
import { useAuth } from '../../components/Layout.js/context/auth'
import { getAllOrdersfunc, getOrderStatus } from '../../components/Layout.js/APIS/apicall'
import moment from 'moment'
import { Select } from "antd";
import { BASE_URL } from '../../components/Layout.js/APIS/baseurl'
const { Option } = Select;
const AdminOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [status] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"]);
  const [auth] = useAuth()

  const getAllorder = async () => {
    try {
      const { data } = await getAllOrdersfunc();
      setAllOrders(data);

    } catch (error) {
      console.log(error);
    }
  }
  const handleChange = async (orderId, value) => {
    try {
        //console.log("funcion is called")
      const { data } = await getOrderStatus({status:value},orderId);
      console.log(data.orders);
      getAllorder();
      // setChangeStatus(data.status);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (auth?.token)
      getAllorder();
  }, [auth?.token])
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center'>All Orders</h1>
          {
            allOrders?.map((o, i) => {
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
                        <td>{i + 1}</td>
                        <td>

                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {
                                status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))
                            }
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
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
                              src={`${BASE_URL}/product/productPhoto/${p._id}`}
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
    </Layout>
  )
}

export default AdminOrder
