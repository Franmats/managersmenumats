import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";
import React, { useState } from 'react';

export const CreateProductView = () => {
  const navigate = useNavigate();
  const [editedData, setEditedData] = useState({
    nombre: '',
    descripcion: '',
    subCategory:"",
    idCategoria:"",
    precio: '',
    status: 'activo', // Default to 'activo' for new products
    imagen: '' // Add imagen field
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
      const response = await fetch("http://127.0.0.1:8080/api/products", {
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
        <h2>CREAR PRODUCTO</h2>
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
              <div className="product-status-create">
                <label htmlFor="status">Estado:</label>
                <select
                  id="status"
                  name="status"
                  value={editedData.status}
                  onChange={handleChange}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
              </div>

          <div className="detail-second-create"> 

          <div className="product-title-create">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={editedData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="product-descrip-create">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={editedData.descripcion}
                  onChange={handleChange}
                />
              </div>
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
              <div className="product-price-create">
                <label htmlFor="precio">Precio:</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={editedData.precio}
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