import './App.css';
import MainContent from './components/maincontent/MainContent'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import Profile from './components/profile/Profile'
import NotFound from './components/notfound/NotFound'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategory from './components/addcategory/AddCategory';
import Categories from './components/category/Categories';
import Shoes from './components/Shoes/Shoes';
import Orders from './components/orders/Orders';
import AddShoe from './components/addshoe/AddShoe';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <Routes>
         <Route index element={<MainContent />} />
         <Route path="signin" element={<Signin />} />
         <Route path="signup" element={<Signup />} />
         <Route path="profile" element={<Profile />} />
         <Route path="addshoe" element={<AddShoe />} />
         <Route path="categories" element={<Categories />} />
         <Route path="addcategory" element={<AddCategory />} />
         <Route path="shoes" element={<Shoes />} />
         <Route path="orders" element={<Orders />} />
         <Route path="*" element={<NotFound />} />




      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
