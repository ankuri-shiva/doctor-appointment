
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    
    const navigate = useNavigate();

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try{
            if(!name || !specialization){
                alert("Please fill in all fields");
                return;
            }
            const res = await axios.post(BASE_URL + '/doctor', {name,specialization}, {withCredentials: true});
            if(res.status >= 200 && res.status < 300){
                alert("Doctor added successfully");
                navigate("/")
            } else{
                throw new Error("Failed to add doctor");
                }
        } catch(err){
            console.error(err.message);
        }
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="card bg-white shadow-xl w-1/4 mt-4 flex flex-col justify-center items-center">
            <h1 className="card-title text-3xl pt-4 text-blue-700">Add Doctor</h1>
            <form className="form-control">
            <div className="mb-6">
                <label className="label">
                <span className="label-text text-gray-800 font-bold">Name</span>
                </label>
                <input 
                value = {name}
                onChange = {(e) => setName(e.target.value)}
                 type="text" placeholder="Name" className="input input-bordered" />
            </div>
            <div className="mb-6">
                <label className="label">
                <span className="label-text text-gray-800 font-bold">Specialization</span>
                </label>
                <input
                value = {specialization}
                onChange = {(e) => setSpecialization(e.target.value)}
                 type="text" placeholder="Specialization" className="input input-bordered" />
            </div>
            <div className="mb-6 self-center" >
                <button
                onClick = {handleAddDoctor}
                 className="btn btn-primary">Add Doctor</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default AddDoctor