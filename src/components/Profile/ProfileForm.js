import classes from './ProfileForm.module.css';
import {useRef, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import AuthCtx from '../Contex/AuthContext'

const ProfileForm = () => {

  const enterEmail = useRef(null);
  const ctx = useContext(AuthCtx)
  const [success, setSuccess] = useState(false);

  const history = useHistory();
 // const NewPassword = enterEmail.current.value;
 console.log('in porfileForn: ')

 const onSubmitHandler = () =>{

  console.log('newPssword: ', enterEmail.current)



  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAzZVAcgGS_VK-yHCAUzBU1mnaPcgvz3kc',
  {
    method: 'POST',
    body :  JSON.stringify({
    idToken: ctx.authToken,
    password: enterEmail.current.value,
    returnSecureTocken: false
    }),
    
    headers: {
      'Content-Type' : 'application/json'
    }
    
      }
    ).then ((res)=>{

      if(res.ok){

        //console.log('password changed successfully')

        setSuccess(true)
        history.replace('/')
      }else {

        res.json().then((data)=> console.log(data))
      }
    })
        
  

}
  return (

    <div>

      {success && <alert>password changed successfully</alert>}
    <form className={classes.form} onSubmit= {onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength = '7' ref = {enterEmail} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
    </div>
  );
}

export default ProfileForm;
