import React, { useState, useEffect } from 'react';
import "./addshoe.css";
import CheckSession from '../../helpers/CheckSession';
import Layout from '../layout/Layout';
import axiosInstanceToken from '../../helpers/axiosInstanceToken';

const AddShoe = () => {
  const { username, admin_id, access_token } = CheckSession();

  // Hooks
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState(null);  // Photo state

  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axiosInstanceToken.post("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setFailure('Failed to fetch categories');
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setFailure(null);

    const formData = new FormData();
    formData.append('category_id', category_id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('quantity', quantity);
    if (photo) {
      formData.append('photo', photo);  // Attach the photo file
    }

    // Debugging: Check formData content
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    axiosInstanceToken.post('/addshoe', formData)
      .then((response) => {
        setLoading(false);
        setSuccess(response.data.Message);
      })
      .catch((error) => {
        setLoading(false);
        setFailure(error.response?.data?.Message || error.message);
      });
  };

  return (
    <div>
      <Layout />
      <div className="form">
        <form onSubmit={submit} className="card shadow p-4">
          <div className="card-body">
            {loading && <div className="text-warning">Please Wait..</div>}
            {success && <div className="text-success">{success}</div>}
            {failure && <div className="text-danger">{failure}</div>}

            <input
              type="text"
              placeholder="Enter Shoe Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            /><br />

            <select
              value={category_id}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="form-control"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select><br />

            <input
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="form-control"
            /><br />

            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-control"
            /><br />

            <input
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="form-control"
            /><br />

            <input
              type="text"
              placeholder="Enter Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="form-control"
            /><br />

            <input
              type="file"
              name="photo"  // Add the name attribute here
              onChange={(e) => setPhoto(e.target.files[0])}
              required
              className="form-control"
            /><br />

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}  // Disable button while loading
            >
              Add Shoe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShoe;
