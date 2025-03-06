import { useNavigate } from "react-router-dom";
import "./CreateCategorie.css";
import React, { useState } from 'react';

export const CreateCategorieView = () => {
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    subCategory:"",
    idCategoria:"",
    imagen: ''
  });

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const tokenStractor = async() => {
            try {
              const storedToken = window.localStorage.getItem("tokenUser");
          
              if (storedToken) {
                const user = JSON.parse(storedToken)
                console.log("Usuario recuperado:", user)
                return user
              } else {
                console.log("No se encontró un token en el Local Storage")
                return null; 
              }
            } catch (error) {
              console.error("Error al extraer el token:", error);
              return null;
            }
          }
        const token = await tokenStractor()
      const response = await fetch("http://127.0.0.1:8080/api/categories", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in headers
        },
        body: JSON.stringify(editedData)
      });

      if (response.ok) {
        console.log("creado")
      } else {
        console.log('Error creating product');
        const errorData = await response.json();
        console.error('Error details:', errorData); // Log the error details
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <div className="products-container-create">
        <h2>CREAR CATEGORIA</h2>
          <div className="product-detail-create">
            <div className="detail-one-create">
               <div className="product-image">
                <label htmlFor="imagen">Imagen URL:</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  value={editedData.imagen}
                  onChange={handleChange}
                />
              </div>
              </div>

          <div className="detail-second-create"> 
              <div className="product-subCategory-create">
                <label htmlFor="subCategory">Categoria</label>
                <textarea
                  id="subCategory"
                  name="subCategory"
                  value={editedData.subCategory}
                  onChange={handleChange}
                />
              </div>
              <div className="product-idCategoria-create">
                <label htmlFor="idCategoria">Restaurante</label>
                <textarea
                  id="idCategoria"
                  name="idCategoria"
                  value={editedData.idCategoria}
                  onChange={handleChange}
                />
              </div>
          </div>
              
            
             
            </div>
          <button className="boton" onClick={handleSubmit}>Crear Producto</button>
        </div>
      
    </div>
  );
};