import React, { useEffect, useState } from "react";
import './categories.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstanceToken from "../../helpers/axiosInstanceToken"

const Categories = () => {
  const { username, admin_id ,access_token } = CheckSession();
  // const lab_id = localStorage.getItem("lab_id");
  const [categorys, setcategorys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //filter data
      const [filterdata, setFilterData] = useState([])

      //searchh query
      const [query, setQuery] = useState('')

      //function to handle live search
      const handleSearch =(value)=>{
        // the value is the text that yyou are typing 
        setQuery(value)
        // check if lab test are not empty 
        const filterResult = categorys && categorys.filter((item)=> item.category_id.toLowerCase().includes(value.toLowerCase()) || item.category_name.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase()) )
        // update set Filtered data with teh filterd items 
        setFilterData(filterResult)
      }

  useEffect(() => {
    axiosInstanceToken.post("/categories", {
      
    })
    .then((response) => {
      console.log(response.data);
      setcategorys(response.data);
      setFilterData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setError(error.message);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Layout />
      <div className="card-container">
        {loading && <p className="text-warning">Loading ... </p>}
        {error && <p className="text-danger">Error occurred. Try later.</p>}
        <input type="text" placeholder="Search surname, others, email" className="form-control mb-0" value={query} onChange={(e)=>handleSearch(e.target.value)}/>
        {/* {!loading && categorys && categorys.length === 0 && <p className="text-info">No nurse found</p>} */}
        {categorys?.length > 0 ? (
          <table className="table table-striped bg-light p-5 m-1">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Name</th>
               
              </tr>
            </thead>
            <tbody>
              {filterdata?.map((category) => (
                <tr className="mt-5" key={category.category_id}>
                  <td>{category.category_id}</td>
                  <td>{category.category_name}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        ):
        (<p className="text-info" >No category found</p>)
        }
      </div>
    </div>
  );
};

export default Categories;
