import React, { useEffect, useState } from 'react'
import './orders.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession';
import axiosInstanceToken from "../../helpers/axiosInstanceToken"


const Orders = () => {
      const { username, admin_id, access_token } = CheckSession();
      const [orders, setOrders] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      useEffect(() => {

      axiosInstanceToken.post("/orders", {
      // lab_id: lab_id
    })
    .then((response) => {
      setLoading(false);
      // console.log(response.data);
      setOrders(response?.data);
      setFilterData(response?.data );
      
      
    })
    .catch((error)=>{
      setLoading(false)
      console.log(error);
      setError(error.message)
    })
},[])

// filterdata by searching 
 //filter data
      const [filterdata, setFilterData] = useState([])

      //searchh query
      const [query, setQuery] = useState('')

      //function to handle live search
      const handleSearch =(value)=>{
        // the value is the text that yyou are typing 
        setQuery(value)
        // check if lab test are not empty 
        const filterResult = orders && orders.filter((item)=> item.key?.user_id.toLowerCase().includes(value.toLowerCase()) || item.order_id.toLowerCase().includes(value.toLowerCase()) || item.invoice_no.toLowerCase().includes(value.toLowerCase()) )
        // update set Filtered data with teh filterd items 
        setFilterData(filterResult)
      }


  return (
    <div>
    <Layout/>

<div className="card-container">
   {loading && <p className="text-warning">Loading ... </p>}
        {error && <p className="text-danger">Error occurred. Try later.</p>}
        <input type="text" placeholder="Search surname, where_taken, invoice_no" className="form-control mb-0" value={query} onChange={(e)=>handleSearch(e.target.value)}/>
        {filterdata?.length > 0 ? (
      <table className="table table-striped bg-light p-5 m-1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User_ID</th>
            <th>Time and Date</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Total Amount</th>
            <th>Invoice No</th> 

          </tr>
        </thead>
        <tbody>
          {filterdata?.map((order, index) => (
            <tr className="mt-5" key={index}>
              <td>{order?.key?.order_id}</td>
              <td>{order.user_id}</td>
              <td>{order.date}</td>
              <td>{order.longitude}</td>
              <td>{order.latitude}</td>
              <td>{order.total_amount}</td>
              <td>{order.invoice_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ):
        (<p className="text-info" >No Orders found</p>)
    }
    </div>
    
    </div>
  )
}

export default Orders
