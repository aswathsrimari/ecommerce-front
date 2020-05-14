import React, {ReactFragment, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
//withRouter will access Route history

const isActive = (history, path)=>{   //history is current url and path is clicked link
    if(history.location.pathname === path){
        return {color: '#ff9900'};
    }
    else{
        return {color: '#ffffff'};
    }
}

const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tab bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link> 
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Shop</Link> 
            </li>

            {isAuthenticated() && isAuthenticated().user.role===0 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link> 
            </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role===1 && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link> 
            </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link> 
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link> 
                    </li>
                </Fragment>    
            )}

            {isAuthenticated() && (      
                    <li className="nav-item">
                        <Link className="nav-link" style={{cursor: 'pointer', color:'#ffffff'}} onClick={()=> signout(()=>{
                            history.push("/");
                        })}>
                        Signout</Link> 
                   </li>             
            )}
         </ul>
    </div>
)

export default withRouter(Menu);