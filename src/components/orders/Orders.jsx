import React, { useEffect, useState } from 'react';
import './orders.css';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstanceToken from "../../helpers/axiosInstanceToken";

const Orders = () => {
  const { username, admin_id, access_token } = CheckSession();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosInstanceToken.post("/orders")
      .then((response) => {
        setLoading(false);
        setOrders(response?.data);
        setFilterData(response?.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = (value) => {
    setQuery(value);
    const filterResult = orders && orders.filter((item) =>
      item.key?.user_id.toLowerCase().includes(value.toLowerCase()) ||
      item.order_id.toLowerCase().includes(value.toLowerCase()) ||
      item.invoice_no.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filterResult);
  };

  return (
    <div>
      <Layout />
      <div className="main-content">
        <div>
          {loading && <p className="text-warning">Loading ... </p>}
          {error && <p className="text-danger">Error occurred. Try later.</p>}
          <input
            type="text"
            placeholder="Search surname, where_taken, invoice_no"
            className="search "
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="table-container">
            {filterdata?.length > 0 ? (
              <table className="table table-striped bg-light">
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
                  {filterdata?.map((order, order_id) => (
                    <tr key={order_id}>
                      <td>{order_id}</td>
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
            ) : (
              <p className="text-info">No Orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
