import { useParams } from "react-router-dom";
import "./EditCategorieInfo.css"
import React, { useState, useEffect } from 'react';

export const EditCategorieInfo= ()=> {
    const [data, setData] = useState([]);
    //USE EFFECT
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
            const response = await fetch(`https://matsapps.com/api/categories `, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              withCredentials: true
            });
            if (response.ok){
              console.log(response)
                const data = await response.json()
                console.log(data.payload)
                setData(data.payload);
            }else {
                console.log('Error al cargar datos');
              }
          } catch (error) {
            console.error('Error al cargar datos:', error);
          }

        };

       

        fetchData();  
      }, []);

      //RETURN
      return (
        <div>
          <div className="products-container-info">
                  <div className="menu-info">
                  {data.map((item) => (
                      <div key={item._id} className="product-detail-info">
                          <div className="img"><img src={item.image} alt="" /></div>
                          <div className="detail-info">
                              <div  className="product-title-info">{item.nombre}</div>
                              

                              <div className="product-descrip-info">{item.resto}</div>   

                             <a href={`/config/admin/categorie/${item._id} `} className="bnt-1">Editar Categoria</a>
                          </div>
                          
                      </div>
                      ))}
                  </div>
            
          </div>
        </div>
      );
}