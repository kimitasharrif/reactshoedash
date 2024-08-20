import React, { useEffect, useState } from "react";
import "./shoes.css";
import Layout from "../layout/Layout";
import CheckSession from "../../helpers/CheckSession";
import axiosInstanceToken from "../../helpers/axiosInstanceToken";

const Shoes = () => {
  // check if user is logged in
  const { username, admin_id, access_token } = CheckSession();

  const [loading, setLoading] = useState(false);
  const [shoes, setShoes] = useState([]);
  const [failure, setFailure] = useState(null);

  // filter data
  const [filterdata, setFilterData] = useState([]);

  // search query
  const [query, setQuery] = useState("");

  // function to handle live search
  const handleSearch = (value) => {
    setQuery(value);
    const filterResult =
      shoes && shoes.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFilterData(filterResult);
  };

  // function to delete all shoes
  const deleteAllShoes = () => {
    setLoading(true);
    axiosInstanceToken
      .delete("/deleteallshoe")
      .then(() => {
        setShoes([]);
        setFilterData([]);
        setFailure(null);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setFailure(error.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    axiosInstanceToken
      .get("/shoes")
      .then((response) => {
        setShoes(response.data);
        setFilterData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setFailure(error.message);
      });
  }, []);

  if (loading) {
    return <p>Loading...... please wait.</p>;
  }

  return (
    <div>
      <Layout />
      <div className="card-container">
        {loading && <p className="text-warning">Loading ... </p>}
        {failure && <p className="text-danger">Error occurred. Try later.</p>}
        <button onClick={deleteAllShoes} className="btn btn-danger mb-3">
          Delete All Shoes
        </button>
        <input
          type="text"
          placeholder="Search by shoe name"
          className="form-control mb-0"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {shoes?.length > 0 ? (
          <table className="table table-striped bg-light p-5 m-1">
            <thead>
              <tr>
                <th>Category_id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filterdata?.map((shoe, index) => (
                <tr className="mt-5" key={index}>
                  <td>{shoe.category_id}</td>
                  <td>{shoe.name}</td>
                  <td>{shoe.price}</td>
                  <td>{shoe.description}</td>
                  <td>{shoe.brand}</td>
                  <td>{shoe.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-info">No Shoe found</p>
        )}
      </div>
    </div>
  );
};

export default Shoes;
