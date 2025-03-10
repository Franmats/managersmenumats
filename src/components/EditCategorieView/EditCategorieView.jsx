import { useParams,useNavigate } from "react-router-dom";
import "./EditCategorieView.css"
import React, { useState, useEffect } from 'react';

export const EditCategorieView= ()=> {
  const [data, setData] = useState({});
  const {id} = useParams();
  const navigate = useNavigate()
  const [editedData, setEditedData] = useState({
    nombre: '',
    resto: '',
    image:''
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
            const response = await fetch(`https://matsapps.com/api/categories/byid/${id} `, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              withCredentials: true
            });
            if (response.ok){
              const data = await response.json()//devuelve un obj
              setData(data.payload);
              setEditedData({ 
                nombre: data.payload.nombre,
                resto: data.payload.resto,
                image: data.payload.image
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
  console.log(data)
  console.log(editedData)

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
      const response = await fetch(`http://127.0.0.1:8080/api/categories/${id}`, {
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
            <div className="img"><img src={data.image} alt="" /></div>
            <div className="detail-edit">
              <div className="product-title-edy">
                <label htmlFor="nombre">Categoria</label>
                <input 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                  value={editedData.nombre} 
                  onChange={handleChange} 
                />
              </div>
              <div className="product-descrip-edit">
                <label htmlFor="resto">Restaurante</label>
                <textarea 
                  id="resto" 
                  name="resto" 
                  value={editedData.resto} 
                  onChange={handleChange} 
                />
              </div>
              <div className="product-descrip-edit">
                <label htmlFor="image">Imagen</label>
                <textarea 
                  id="image" 
                  name="image" 
                  value={editedData.image} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
          <button className="boton" onClick={handleSubmit}>Guardar Cambios</button> 



        </div>
      
      </div>
    </div>
  );
}