import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {

  const [email, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');

const navigate = useNavigate();
const dispatch = useDispatch();
  const handleLogin = async () => {
    try{
      if(!email || !password){
        setError("Please fill in all fields");
        return;
      }
      const res = await axios.post(BASE_URL + '/login', {email, password}, {withCredentials: true});
      if(res.status >= 200 && res.status < 300){
        navigate("/");
      } else{
        throw new Error("Failed to login");
      }
    }catch(err){
      console.log(err.message);
      setError(err.message);
    }
  }

  const handleSignUp = async () => {
    try{
      if(!email || !password || !userName){
        setError("Please fill in all fields");
        return;
      }
      const res = await axios.post(BASE_URL + '/signup', {email, password, userName}, {withCredentials: true});
      if(res.status >= 200 && res.status < 300){
        dispatch(addUser(res.data))
        navigate("/");
      } else{
        throw new Error("Failed to sign up");
      }
    }catch(err){
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="card bg-neutral w-96 shadow-2xl justify-center">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
    
     {!isLoginForm && (
      <>
      <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">User Name: </span>
      </div>
      <input type="text" placeholder="Type here"
      value={userName}
       className="input input-bordered w-full max-w-xs" 
       onChange={(e) => setUserName(e.target.value)} />
    </label>
    </>
     )}
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">EmailId: </span>
  </div>
  <input type="text" placeholder="Type here"
  value={email}
   className="input input-bordered w-full max-w-xs" 
   onChange={(e) => setEmailId(e.target.value)} />
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password: </span>
  </div>
  <input type="text" placeholder="Type here"
  value={password}
   className="input input-bordered w-full max-w-xs" 
   onChange={(e) => setPassword(e.target.value)} />
</label>

<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center my-2">
      <button className="btn btn-primary" onClick={ isLoginForm? handleLogin : handleSignUp}>
        {isLoginForm? "Login" : "Sign Up"}
      </button>
    </div>
    <p className='m-auto cursor-pointer' onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm? "New User? Sign Up Here" : "Existing User Login Here"}</p>
  </div>
</div>
    </div>
  )
}

export default Login