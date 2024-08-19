import React, { useEffect, useState } from "react";
import './categories.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstanceToken from "../../helpers/axiosInstanceToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const { username, admin_id ,access_token } = CheckSession();
  const [categorys, setcategorys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [success, setSuccess] = useState(null); // Added for success messages
  const [failure, setFailure] = useState(null); // Added for failure messages

  const handleSearch = (value) => {
    setQuery(value);
    const filterResult = categorys && categorys.filter((item) => 
      item.category_id.toLowerCase().includes(value.toLowerCase()) || 
      item.category_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filterResult);
  };

  useEffect(() => {
    axiosInstanceToken.post("/categories")
      .then((response) => {
        setcategorys(response.data);
        setFilterData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (category) => {
    setEditCategoryId(category.category_id);
    setNewCategoryName(category.category_name);
  };

  const handleUpdate = (e) => {
  e.preventDefault();
  
  // Log the category ID and new name before sending the request
  console.log("Updating category:", editCategoryId, newCategoryName);
  
  axiosInstanceToken.put('/updatecategory', {
    category_id: editCategoryId,
    category_name: newCategoryName
  })
  .then(response => {
    console.log("Update response:", response.data); // Log the response data
    
    setEditCategoryId(null);
    setNewCategoryName('');
    setSuccess(response.data.message || 'Category updated successfully');
    
    // Refresh the categories list
    axiosInstanceToken.post('/categories')
      .then(response => {
        setcategorys(response.data);
        setFilterData(response.data);
      })
      .catch(err => {
        console.log("Error fetching categories after update:", err);
        setError(err.message);
      });
  })
  .catch(error => {
    console.log("Update error:", error.response?.data?.message || error.message);
    setFailure(error.response?.data?.message || 'Failed to update category');
  });


  };

  return (
    <div>
      <Layout />
      <div className="card-container">
        {loading && <p className="text-warning">Loading ... </p>}
        {error && <p className="text-danger">Error occurred. Try later.</p>}
        {success && <p className="text-success">{success}</p>} {/* Display success message */}
        {failure && <p className="text-danger">{failure}</p>} {/* Display failure message */}
        <input type="text" placeholder="Search by ID or Name" className="form-control mb-0" value={query} onChange={(e) => handleSearch(e.target.value)} />
        {categorys?.length > 0 ? (
          <table className="table table-striped bg-light p-5 m-1">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterdata?.map((category) => (
                <tr className="mt-5" key={category.category_id}>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <FontAwesomeIcon 
                      icon={faPen} 
                      onClick={() => handleEditClick(category)} 
                      style={{ cursor: 'pointer', color: 'blue' }} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-info">No category found</p>
        )}
      </div>

      {/* Edit Category Form */}
      {editCategoryId && (
        <div className="edit-category-form">
          <h3>Edit Category</h3>
          <form onSubmit={handleUpdate}>
            <input 
              type="text" 
              value={newCategoryName} 
              onChange={(e) => setNewCategoryName(e.target.value)} 
              required 
            />
            <button type="submit" className="btn btn-dark">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditCategoryId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;
