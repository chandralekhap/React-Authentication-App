import { useState} from 'react';
import React from 'react';

 const AuthCtx = React.createContext({

    isLogin: false,
    authToken: '' ,
    login:(token)=>{},
    logout : ()=>{}
});
var token1 = ''
export const AuthContext = (props)=>
{

    const [token1, setToken] = useState(null)

    const isLogin = !! token1

    const loginHandler = (token) => {
        // debugger;
       setToken(token);
     //  token1 = token;

      //  console.log('token1 ' , token1)
    }

    const logoutHandler = () =>{
     setToken(null)

      // token1 = null ;
    }

    const ctxValue  = {
        isLogin: isLogin,
        authToken: token1,
        login: loginHandler,
        logout: logoutHandler
    }
  return (
    <AuthCtx.Provider value = {ctxValue} >
    {props.children}
</AuthCtx.Provider>
  )
}

export default AuthCtx;