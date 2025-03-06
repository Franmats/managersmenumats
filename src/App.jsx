import './App.css';
import { BrowserRouter, Routes,Route } from "react-router-dom";

import { EditProducts } from './components/EditProducts/EditProducts.jsx';
import { EditProductsInfo } from './components/EditProductsInfo/EditProductsInfo.jsx';
import { EditProductsView } from './components/EditProductsView/EditProductsView.jsx';
import { FrontalMenu } from './components/FrontalView/FrontalMenu.jsx';
import { SessionLogin } from './components/Login/Login.jsx';
import { CreateProductView } from './components/CreateProduct/CreateProduct.jsx';
import { ProductsOfUser } from './components/ProductsOfUser/ProductsOfUser.jsx';
import { CreateCategorieView } from './components/CreateCategorie/CreateCategorie.jsx';
import { EditCategorieInfo } from './components/EditCategorieInfo/EditCategorieInfo.jsx';
import { EditCategorieView } from './components/EditCategorieView/EditCategorieView.jsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* ENCARGADO */}
      <Route path="/" element={<FrontalMenu/>}/>

      <Route path="/config/admin/product" element={<CreateProductView/>}/>

      <Route path="/config/admin/categorie" element={<CreateCategorieView/>}/>
      <Route path="/config/admin/categorie-view" element={<EditCategorieInfo/>}/>
      <Route path="/config/admin/categorie/:id" element={<EditCategorieView/>}/>

      <Route path="/config/user/stateproducts" element={<EditProducts/>}/>
      <Route path="/config/user/getproductofuser" element={<ProductsOfUser/>}/>

      <Route path="/config/user/editproduct" element={<EditProductsInfo/>}/>
      <Route path="/config/user/edit/:id" element={<EditProductsView/>}/>

      
      <Route path="/login" element={<SessionLogin/>}/>

      <Route path='*' element={<h1>404 Not Found</h1>}/> 
    </Routes>
   
   
   </BrowserRouter>
  );
}

export default App;
