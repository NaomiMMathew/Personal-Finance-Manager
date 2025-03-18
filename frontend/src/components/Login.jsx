// import React, { useState } from 'react';
// import './Login.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaChartLine } from 'react-icons/fa';
// import axios from "axios" ;

// const Login = () => {
//       const navigate = useNavigate();

//      const [username, setUsername] = useState('');
//      const [password, setPassword] = useState('');


//   const senddata=async (e)=>{
//     e.preventDefault();
//     try{
//       const response=await axios.post('http://localhost:3001/api/login',{
//         username,
//         password
//       });
//       alert('Login Successfully');
//       console.log(response.data);
//       navigate('/userhome')
//     }
//     catch(error){
//         alert('login failed')
//       console.error(error);

//     }

//     };
    


//     return (
//         <div className='container'>
//             <header className="header" style={{background:'darkblue'}}>
                       
                        
//                             <h1 className="logo"> <FaChartLine style={{color:'white',fontSize:'3rem'}} />MYFINANCE TRACKER</h1>
//                             <nav>
//                                 <ul className="nav-links">
//                                 <li><Link to='/'>HOME</Link></li>
//                                 <li><Link to='/login'>LOGIN</Link></li>
//                                     <li><Link to='/features'>FEATURES</Link></li>
//                                     <li><Link to="/aboutus">ABOUT US</Link></li>
                                  
//                                 </ul>
//                             </nav>
//                         </header>
//         <div className='login-container'>
//             <div className="login-box">
//                 <h2 style={{textDecoration:'underline',color:'black'}}>LOGIN TO MYFINANCE</h2>
//                 <form onSubmit={senddata}>
//                     <input className='input-field1'
//                         type="text"
//                         placeholder="Username"
//                         name='username'
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input className='input-field1'
//                         type="password"
//                         placeholder="Password"
//                         name='password'
//                         value={password}
//                         onChange={(e) =>  setPassword(e.target.value)}
//                     />
//                     <button type="submit" className='login-button'>LOGIN</button>&nbsp;
//                     <p className="register-text">
//                         Create your account? <label style={{color:'navy'}}>
//                         <Link to="/register">Register</Link></label>
//                     </p>
//                 </form>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default Login;





import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartLine } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const senddata = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/api/login', {
            username,
            password,
        });

        // Assuming the response includes the userId (response.data.userId)
        const userId = response.data.userId;

        // Save userId in localStorage
        localStorage.setItem('userId', userId);

        alert('Login Successfully');
        console.log(response.data);
        navigate('/dashboard'); // Redirect after login
    } catch (error) {
        alert('Login failed');
        console.error(error);
    }
};


  return (
    <div className="container">
      <header className="header" style={{ background: 'darkblue' }}>
        <h1 className="logo">
          <FaChartLine style={{ color: 'white', fontSize: '3rem' }} />
          MYFINANCE TRACKER
        </h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/features">FEATURES</Link></li>
            <li><Link to="/aboutus">ABOUT US</Link></li>
          </ul>
        </nav>
      </header>
      <div className="login-container">
        <div className="login-box">
          <h2 style={{ textDecoration: 'underline', color: 'black' }}>LOGIN TO MYFINANCE</h2>
          <form onSubmit={senddata}>
            <input
              className="input-field1"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input-field1"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">LOGIN</button>&nbsp;
            <p className="register-text">
              Create your account?{' '}
              <label style={{ color: 'navy' }}>
                <Link to="/register">Register</Link>
              </label>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
