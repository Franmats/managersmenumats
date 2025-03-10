import { useParams,useNavigate } from "react-router-dom";
import "./EditProductsView.css"
import React, { useState, useEffect } from 'react';

export const EditProductsView= ()=> {
  const [data, setData] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [editedData, setEditedData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    status: ''
  });

  useEffect(() => {

    
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
      


    const fetchData = async () => {
      
      try {
        const token = await tokenStractor()
        const response = await fetch(`https://matsapps.com/api/products/${id} `, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        if (response.ok){
          const data = await response.json()
          setData(data.payload);
          setEditedData({ 
            nombre: data.payload.nombre,
            descripcion: data.payload.descripcion,
            precio: data.payload.precio,
            status: data.payload.status 
          }); 
        } else {
          console.log('Error al cargar datos');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, []);

  

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(editedData)
       
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
    try {
      const token = await tokenStractor()
      const response = await fetch(`https://matsapps.com/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true,
        body: JSON.stringify(editedData)
      });
      if (response.ok) {

        navigate("/")
        
      } else {
        console.log('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div>
      <div className="products-container-edit">
        <div className="menu-edit">
          <div key={data._id} className="product-detail-edit">
            <div className="img"><img src={data.imagen} alt="" /></div>
            <div className="detail-edit">
              <div className="product-title-edy">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  value={editedData.nombre} 
                  onChange={handleChange} 
                />
              </div>
              <div className="product-descrip-edit">
                <label htmlFor="descripcion">Descripción:</label>
                <textarea 
                  id="descripcion" 
                  name="descripcion" 
                  value={editedData.descripcion} 
                  onChange={handleChange} 
                />
              </div>
              <div className="product-price-edit">
                <label htmlFor="precio">Precio:</label>
                <input 
                  type="number" 
                  id="precio" 
                  name="precio" 
                  value={editedData.precio} 
                  onChange={handleChange} 
                />
              </div>
              <div className="product-status-edit">
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
          </div>
          <button className="boton" onClick={handleSubmit}>Guardar Cambios</button> 
        </div>
      
      </div>
    </div>
  );
}