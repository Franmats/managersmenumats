import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';

export const SessionLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate()
  const localStorageSetitem =async (item) => {
    const set = window.localStorage.setItem("tokenUser",JSON.stringify(item))
    return set
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://matsapps.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const responseData = await response.json();
        await localStorageSetitem(responseData.payload)
        setResponseMessage(responseData.status);
        navigate("/")
      } else {
        const errorData = await response.json();
        console.log('Error al enviar datos:', errorData);
        setResponseMessage('Contraseña o Email Incorrecto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage('Contraseña o Email Incorrecto');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
        <div className="container">
	<div className="screen">
		<div className="screen__content">
			<form className="login" onSubmit={handleSubmit}>
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input   
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="login__input" 
                        placeholder="Email"/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input 
                    type="password" 
                    className="login__input"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    placeholder="Contraseña"/>
				</div>
				<button type='submit' className="button login__submit">
					<span className="button__text">INICIAR SESION</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
            {responseMessage && (
            <div className={responseMessage.includes('Error') ? 'error-message' : 'success-message'}>
              {responseMessage}
            </div>
          )}
			<div className="social-login">
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>

    </div>
  );
};