import React, {useState}from 'react'
import './Register.css'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const senddata=async (e)=>{
    e.preventDefault();
    alert('Registered Successfully');
   
   
    try{
      const response=await axios.post('http://localhost:3001/api/register',{
        username,
        email,
        password
      });
      console.log(response.data);
      navigate('/login')
    }
    catch(error){
      console.error(error);

    }
    
  };

  return (

    <div>
  

    
    <div className='reg-container'>
        <div className="reg-box">
        <h2 style={{textDecoration:'underline',color:'black'}}>REGISTER YOUR ACCOUNT</h2>
        <form onSubmit={senddata}>
            <input className='input-field1'
            type="text"
            placeholder="Username"
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input className='input-field1'
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input className='input-field1'
            type="password"
            placeholder="Password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='reg-button'>Register</button>&nbsp;
             <p className="register-text">
                      Did you have account? <label style={{color:'navy'}}>
                        <Link to="/login">Login</Link></label>
                        
                    </p>
                  
        </form>
    </div>
    </div>
    </div>
    
  );
};

export default Register