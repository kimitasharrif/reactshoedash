import React, {useState}from 'react'
import './addcategory.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstanceToken from '../../helpers/axiosInstanceToken'

const AddCategory = () => {

   const { username, admin_id, access_token } = CheckSession()

  const [category_name, setName] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [failure, setFailure] = useState(null)


         const submit = (e) => {
            e.preventDefault();
            //Update Hooks
            setLoading(true)
            setSuccess(null)
            setFailure(null)
            console.log("submitting")
            //Post and Post data using axiosInstance with Token
            axiosInstanceToken.post('/addcategory', {
                category_name: category_name,
                
                
            })
                .then(function (response) {
                    console.log(response.data);
                    //Update Hooks - Loading and Success
                    setLoading(false)
                    setSuccess(response.data.message)
                    setName('');  //EMpty Hooks
                    //setEmail(''); setName(''); setPassword(''); setPhone(''); setPermit('');
                })
                .catch(function (error) {
                    //Update Loading and Error Hooks
                    console.log(error.message);
                    setLoading(false)
                    setFailure(error.message);
                });

              }
  return (
    
    <div>
    <Layout/>

<div className='single'>
    <form onSubmit={submit}  className="card shadow p-4 mb-4" >
      <h1>Add Category</h1>

                        <div className="card-body">
                            {loading && <div className="text-warning"> Please Wait..</div>}
                            {success && <div className="text-success"> {success}</div>}
                            {failure && <div className="text-danger"> {failure}</div>}
                            <input type="text" placeholder="Enter Test Name" value={category_name}
                            id='test_name'
                                onChange={(e) => setName(e.target.value)} required  
                                className="form-control" /> <br />
                                
                           <button className="btn btn-dark">Add Category</button>
                        </div>
                    </form>
                    </div>
    </div>
  )
}

export default AddCategory
