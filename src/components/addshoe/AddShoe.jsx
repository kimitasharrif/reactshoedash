import React, { useState, useEffect } from 'react';
import "./addshoe.css";
import CheckSession from '../../helpers/CheckSession';
import Layout from '../layout/Layout';
import axiosInstanceToken from '../../helpers/axiosInstanceToken';

const AddShoe = () => {
  const { username, admin_id, access_token } = CheckSession();

//   // Hooks
//   const [categories, setCategories] = useState([]);
//   const [category_id, setCategory] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [brand, setBrand] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [photo, setPhoto] = useState(null);  // Photo state

//   const [loading, setLoading] = useState(false);
//   const [failure, setFailure] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     axiosInstanceToken.post("/categories")
//       .then((response) => {
//         setCategories(response.data);
//       })
//       .catch((error) => {
//         setFailure('Failed to fetch categories');
//       });
//   }, []);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(null);
//     setFailure(null);

//     const formData = new FormData();
//     formData.append('category_id', category_id);
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('brand', brand);
//     formData.append('quantity', quantity);
//     if (photo) {
//       formData.append('photo', photo);  // Attach the photo file
//     }

//     // Debugging: Check formData content
//     for (let pair of formData.entries()) {
//       console.log(`${pair[0]}: ${pair[1]}`);
//     }

//     axiosInstanceToken.post('/addshoe', formData)
//       .then((response) => {
//         setLoading(false);
//         setSuccess(response.data.Message);
//       })
//       .catch((error) => {
//         setLoading(false);
//         setFailure(error.response?.data?.Message || error.message);
//       });
//   };

//   return (
//     <div>
//       <Layout />
//       <div className="form">
//         <form onSubmit={submit} className="card shadow p-4">
//           <div className="card-body">
//             {loading && <div className="text-warning">Please Wait..</div>}
//             {success && <div className="text-success">{success}</div>}
//             {failure && <div className="text-danger">{failure}</div>}

//             <input
//               type="text"
//               placeholder="Enter Shoe Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="form-control"
//             /><br />

//             <select
//               value={category_id}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="form-control"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.category_id} value={category.category_id}>
//                   {category.category_name}
//                 </option>
//               ))}
//             </select><br />

//             <input
//               type="text"
//               placeholder="Enter Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//               className="form-control"
//             /><br />

//             <input
//               type="text"
//               placeholder="Enter Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               className="form-control"
//             /><br />

//             <input
//               type="text"
//               placeholder="Enter Brand"
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               required
//               className="form-control"
//             /><br />

//             <input
//               type="text"
//               placeholder="Enter Quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//               className="form-control"
//             /><br />

//             <input
//               type="file"
//               name="photo"  // Add the name attribute here
//               onChange={(e) => setPhoto(e.target.files[0])}
//               required
//               className="form-control"
//             /><br />

//             <button
//               type="submit"
//               className="btn btn-dark"
//               disabled={loading}  // Disable button while loading
//             >
//               Add Shoe
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddShoe;



 const [categories, setCategories] = useState([]);

 const [category_id, setCategoryId] = useState('');

 const [name, setName] = useState('');

 const [price, setPrice] = useState('');

 const [description, setDescription] = useState('');

 const [brand, setBrand] = useState('');

 const [quantity, setQuantity] = useState(''); // New state for quantity

 const [loading, setLoading] = useState(false);

 const [success, setSuccess] = useState(null);

 const [failure, setFailure] = useState(null);

 const [image, setImage] = useState(null);



 // Fetch categories for the dropdown

 useEffect(() => {

 const fetchCategories = async () => {

 try {

 const response = await axiosInstanceToken.post('/categories', {

 headers: {

 'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Example token

 }

 });

 setCategories(response?.data);

 } catch (err) {

 setFailure('Failed to fetch categories');

 console.error(err);

 }

 };



 fetchCategories();

 }, []);



 const handleSubmit = async (e) => {

 e.preventDefault();

 setLoading(true);

 setSuccess(null);

 setFailure(null);



 if (!category_id || !name || !price || !description || !brand || !quantity || !image) {

 setLoading(false);

 setFailure('All fields are required.');

 return;

 }



 const formData = new FormData();

 formData.append('admin_id', admin_id);

 formData.append('category_id', category_id);

 formData.append('name', name);

 formData.append('price', price);

 formData.append('description', description);

 formData.append('brand', brand);

 formData.append('quantity', quantity); // Add quantity to FormData

 formData.append('file', image);



 try {

 const response = await axiosInstanceToken.post('/addshoe', formData, {

 headers: {

 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,

 'Content-Type': 'multipart/form-data'

 }

 });

 console.log(response.data);

 setSuccess('Shoe added successfully');

 } catch (error) {

 console.error(error.response?.data || error.message); // Log the error response if available

 setFailure('Failed to add shoe');

 } finally {

 setLoading(false);

 }

 };



 return (

 <div>

 <Layout />

 <div className="form">

 <form onSubmit={handleSubmit} className="add-shoes-form">

 <h2>Add Shoe</h2>

 {loading && <div className="response loading">Please Wait...</div>}

 {success && <div className="response success">{success}</div>}

 {failure && <div className="response failure">{failure}</div>}

 

 <div className="form-group">

 <label htmlFor="category_id">Category:</label>

 <select

 id="category_id"

 name="category_id"

 value={category_id}

 onChange={(e) => setCategoryId(e.target.value)}

 >

 <option value="">Select a category</option>

 {categories.map((category) => (

 <option key={category.category_id} value={category.category_id} >

 {category.category_name}

 </option>

 ))}

 </select>

 </div>



 <div className="form-group">

 <label htmlFor="name">Name:</label>

 <input

 type="text"

 id="name"

 name="name"

 value={name}

 onChange={(e) => setName(e.target.value)}

 placeholder="Enter shoe name"

 />

 </div>



 <div className="form-group">

 <label htmlFor="price">Price:</label>

 <input

 type="number"

 id="price"

 name="price"

 value={price}

 onChange={(e) => setPrice(e.target.value)}

 placeholder="Enter shoe price"

 />

 </div>



 <div className="form-group">

 <label htmlFor="description">Description:</label>

 <textarea

 id="description"

 name="description"

 value={description}

 onChange={(e) => setDescription(e.target.value)}

 placeholder="Enter shoe description"

 />

 </div>



 <div className="form-group">

 <label htmlFor="brand">Brand:</label>

 <input

 type="text"

 id="brand"

 name="brand"

 value={brand}

 onChange={(e) => setBrand(e.target.value)}

 placeholder="Enter brand name"

 />

 </div>

 

 <div className="form-group">

 <label htmlFor="quantity">Quantity:</label>

 <input

 type="number"

 id="quantity"

 name="quantity"

 value={quantity}

 onChange={(e) => setQuantity(e.target.value)}

 placeholder="Enter shoe quantity"

 />

 </div>



 <div className="form-group">

 <label htmlFor="image">Image:</label>

 <input

 type="file"

 id="image"

 name="image"

 accept="image/*"

 onChange={(e) => setImage(e.target.files[0])}

 />

 </div>



 <button type="submit" className="submit-button">Add Shoe</button>

 </form>

 </div>

 </div>

 );

};



export default AddShoe;
