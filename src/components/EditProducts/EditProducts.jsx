
import "./EditProducts.css"
import React, { useState, useEffect } from 'react';

export const EditProducts= ()=> {
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
      const changeStateProd = async (id,status) => {
        console.log(id)

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
            const change = await fetch(`http://127.0.0.1:8080/api/products/${id}/${status} `, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              withCredentials: true
            });
            if (change.ok){
                const a = await change.json()
                console.log(a)
                window.location.reload(); 
            }else {
                console.log('Error al cargar datos');
              }
          } catch (error) {
            console.error('Error al cargar datos:', error);
          } 
      }
      //RETURN
      return (
        <div>
                 
                  <div className="menu-status">
                  <h3>EDITOR DISPONIBILIDAD DEL PRODUCTO</h3>
                  {data.map((item) => (
                      <div key={item._id} className="product-detail-status">
                          <div className="img"><img src={item.imagen} alt="" /></div>
                          <div className="detail-status">
                              <div  className="product-title-status">{item.nombre}</div>
                              

                              <div className="product-id-status">ID:{item._id}</div>
                              <div className="product-price-status"><b>${item.precio}</b></div>
                              <div  className="product-status" style={{
                                backgroundColor: item.status === "activo" ? 'green' : 'red'
                                }}>{item.status}</div>
                              <button onClick={() => {changeStateProd(item._id,item.status);}}>Modificar Estado</button>
                          </div>
                          
                      </div>
                      ))}
                  </div>
            
    
        </div>
      );
}