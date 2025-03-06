import "./FrontalMenu.css"
export const FrontalMenu = ()=> {
    
  return (
    <div>
        <div className="container-menu">
            <div className="menu">
                <div className="item-menu">
                    <a href="/config/user/stateproducts">MODIFICAR ESTADO</a>
                    

                </div>
                <div className="item-menu">
                    <a href="/config/user/editproduct">EDITAR PRODUCTO</a>
                </div>
                <div className="item-menu">
                    <a href="/config/user/getproductofuser">VER TODOS LOS PRODUCTOS</a>
                </div>
                <div className="item-menu">
                    <a href="/">SOPORTE WHATSAPP</a>
                </div>
                <div className="item-menu">
                    <a href="/config/admin/product">CREAR PRODUCTO //SOLO ADMIN//</a>
                </div>
                <div className="item-menu">
                    <a href="/config/admin/categorie">CREAR CATEGORIA //SOLO ADMIN//</a>
                </div>
                <div className="item-menu">
                    <a href="/config/admin/categorie-view">EDITAR CATEGORIA //SOLO ADMIN//</a>
                </div>
                <div className="item-menu">
                    <a href="/login">LOGIN</a>
                </div>
            </div>
           
        </div>
    </div>

    
  );
}