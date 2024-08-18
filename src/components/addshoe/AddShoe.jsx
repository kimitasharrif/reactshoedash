// Import
import { useState } from "react";
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstanceToken from '../../helpers/axiosInstanceToken'
import './addshoe.css'
import '../../index.css'


const AddShoe = () => {
    //Check if user is logged in
    const { username, admin_id, access_token} = CheckSession()

    //Hooks
    
    const [category_id, setCategory] = useState(null)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
    const [brand, setBrand] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [failure, setFailure] = useState(null)
    const [selected, setSelected] = useState('')
    
    //handle select for gender
    // const handleSelect = (e) => {
    //     setSelected(e.target.value)   
    // }//end
    // console.log("Selected  " + selected)
    
        const submit = (e) => {
        e.preventDefault();
        //Ipdate Hooks
        setLoading(true)
        setSuccess(null)
        setFailure(null)
        console.log("submitting")
            //Post data to API and provide the Body including the Lab ID
            //The Lab ID is important to help the system know which lab the nurse added belong to
            axiosInstanceToken.post('/addshoe', {
                admin_id: admin_id,
                category_id: category_id,
                name: name,
                price: price,
                description: description,
                brand: brand,
                quantity: quantity
            })
            .then( (response)=> {
                console.log(response.data);
                setLoading(false)
                setSuccess(response.data.message)
                setCategory(''); setName('');  setPrice(''); setDescription(''); setBrand(''); setQuantity('');
            
            })
            .catch((error)=> {
                console.log(error.message);
                setLoading(false)
                setFailure(error.message);
            });
    }

    return (
        <div>
                <Layout/>
                <div className="form" >
                    <form onSubmit={submit} className="card shadow p-4">
                        <div className="card-body">
                                {loading  && <div className="text-warning"> Please Wait..</div>}
                                {success && <div className="text-success"> {success}</div>}  
                                {failure && <div className="text-danger"> { failure}</div>} 
                                <input type="text" placeholder="Enter Shoe Name" value={name}
                                    onChange={(e) => setName(e.target.value)} required
                                className="form-control"/> <br /> 
                                
                                <input type="text" placeholder="Enter Category" value={category_id}
                                    onChange={(e) => setCategory(e.target.value)} required
                                className="form-control"/> <br />
                              
                                {/* <label htmlFor="">Your Gender</label><br />
                                <input type="radio" value='Male'
                                onChange={handleSelect}
                                checked={ selected ==='Male'} />  Male<br />
                        
                                <input type="radio" value='Female'
                                  onChange={handleSelect}
                                  checked={ selected ==='Female'}/> Female<br /> */}
                                    <input type="text" placeholder="Enter Price" value={price}
                                    onChange={(e) => setPrice(e.target.value)} required
                                className="form-control"/> <br />

                                
                                <input type="text" placeholder="Enter Description" value={description}
                                    onChange={(e) => setDescription(e.target.value)} required
                                className="form-control"/> <br />
                                
                                <input type="text" placeholder="Enter Brand" value={brand}
                                    onChange={(e) => setBrand(e.target.value)} required
                                className="form-control"/> <br />

                                 <input type="text" placeholder="Enter Quantity" value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)} required
                                className="form-control"/> <br />

                               
                                
                                
                                <button className="btn btn-dark">Add Shoe</button>
                        </div>
                    </form>
                </div>  
        </div>
        
     );

}
 

export default AddShoe;