import "./ProductsOfUser.css"
import React, { useState, useEffect } from 'react';

export const ProductsOfUser= ()=> {
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
            const response = await fetch(`http://127.0.0.1:8080/api/products/user/products/getforuser `, {
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
                          <div className="img"><img src={item.imagen} alt="" /></div>
                          <div className="detail-info">
                              <div  className="product-title-info">{item.nombre}</div>
                              

                              <div className="product-descrip-info">{item.descripcion}</div>
                              <div className="product-price-info"><b>${item.precio}</b></div>
                              <div  className="product-status-info" style={{
                                backgroundColor: item.status === "activo" ? 'green' : 'red'
                                }}>{item.status}</div>
                          </div>
                          
                      </div>
                      ))}
                  </div>
            
          </div>
        </div>
      );
}