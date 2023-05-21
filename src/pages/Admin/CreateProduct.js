import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout.js/Layout'
import Adminmenu from '../../components/Layout.js/Routes/Adminmenu'
import { toast } from 'react-hot-toast';
import { createProductfunc, getCategoryfunc } from '../../components/Layout.js/APIS/apicall';
import { useNavigate } from 'react-router-dom';
import {Select} from 'antd'
const {Option}=Select;
const CreateProduct = () => {
  const [categories,setCategories]=useState([]);
  const [category, setCategory]=useState("");
  const [photo,setPhoto]=useState("");
  const navigate=useNavigate();
  // const  [shipping,setShipping]=useState(0);
  const [inputval,setInputval]=useState({
    name:'',
    description:"",
    price:"",
    quantity:"",
    shipping:''
  })

  // get ALL categories
  const getAllcategory=async()=>{
    try {
      
        const {data}=await getCategoryfunc();
         if(data?.success)
         {
              setCategories(data?.category);
         }
    } catch (error) {
      console.log(error);
      toast.error("error during getting categries")
      
    }
  }
  const setval=(e)=>{
      const {name,value}=e.target;
    setInputval({
        ...inputval,
        [name]:value
    })

  }
  const handleCreate=async()=>{

    try {
        const productData=new FormData();
        productData.append("name",inputval.name);
        productData.append("description",inputval.description)
        productData.append("price",inputval.price)
        productData.append("quantity",inputval.quantity)
        productData.append("shipping",inputval.shipping)
        productData.append("category",category)
        console.log(productData);
        productData.append("photo",photo);
        console.log(productData);
        const config={
              "Content-Type":'multipart/form-data'
        }
        const {data}=await createProductfunc(productData,config);
        console.log(data);
        if(data.success)
        {
            toast.success(`${data.product.name} is created`);
            navigate('/dashboard/admin/products')
        }
        else{
          toast.error( `${data.message} `)
        }
    } catch (error) {
      console.log(error);
      toast.error("Error during product creation")
      
    }
  }
  useEffect(()=>{
    getAllcategory();
  },[])
  return (
    <Layout title={"Dashboard -CreateProduct"}>
        <div className='container-fluid m-3 p-3'>
        <div className="row">
             <div className="col-md-3">
                <Adminmenu/>
             </div>
             <div className="col-md-9">
                <h1 className='text-center text-bg-dark'> <strong>Create Product</strong></h1>
                <div classNfame="m-1 w-75">
                      <Select
                          placeholder="Select a Category"
                          size='large'
                          showSearch
                          className='form-select mb-3'
                          onChange={(value)=>setCategory(value) }>  
                      { 
                          categories?.map((c)=>(
                          <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))
                      }

                       </Select>
                       <div className="mb-3">
                            <label className='btn btn-outline-secondary col-md-12'>
                             { photo?photo.name:'upload photo'}
                              <input type='file' accept='image/*'  onChange={(e)=>(setPhoto(e.target.files[0]))} hidden></input>
                            </label>
                       </div>
                       <div className="mb-3">
                        {
                          photo &&(
                            <div className="text-cneter">
                              <img 
                                 src={URL.createObjectURL(photo)}
                                 alt='Product-chehra'
                                 className='img img-responsive'  
                                 height={"200px"}
                              />
                            </div>
                          )
                        }
                       </div>
                       <div className='mb-3'>
                          <input 
                          type='text'
                          name='name'
                          placeholder='enter prdouct Name'
                          value={inputval.name}
                          onChange={setval}
                          className='form-control'
                           />
                       </div>
                       <div className='mb-3'>
                          <input 
                          type='text'
                          name='description'
                          placeholder='Write Description of Product'
                          value={inputval.description}
                          onChange={setval}
                          className='form-control'
                          
                           />
                       </div>
                       <div className='mb-3'>
                          <input 
                          type='number'
                          name='price'
                          placeholder='Enter The Price'
                          value={inputval.price}
                          onChange={setval}
                          className='form-control'
                           />
                       </div>
                       <div className='mb-3'>
                          <input 
                          type='number'
                          name='quantity'
                          placeholder='quantity of product'
                          value={inputval.quantity}
                          onChange={setval}
                          className='form-control'
                           />
                       </div>
                       <div className='mb-3'>
                          <Select
                            size='large'
                            name='shipping'
                            placeholder='select Shipping'
                            className='form-select mb-3'
                            showSearch
                            onChange={(value)=>setInputval(...inputval,inputval.shipping=value)}
                          >
                            <Option value="0">No</Option>
                            <Option value="1">YES</Option>
                          </Select>
                       </div>
                       <div className='mb-3'>
                        <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>

                       </div>
                </div>
             </div>

          </div>
        </div> 
         
    </Layout>
  )
}

export default CreateProduct
