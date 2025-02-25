import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addDoctor } from '../utils/doctorSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'


const DoctorsFeed = () => {

  const doctorsFeed = useSelector((state) => state.doctor);
  const dispatch = useDispatch();

  const fetchDoctorsFeed = async () => {
    try{
      const res = await axios.get(BASE_URL + '/doctors', {withCredentials: true});
      dispatch(addDoctor(res.data))
    }catch(err){
      console.error(err.message)
    }
  }
  useEffect(() => {
    fetchDoctorsFeed();
  }, []);



  const navigate = useNavigate();

  const hadleBooking = (doctId) => {
    navigate('/appointment', {state: {doctorId: doctId}});
  }

  if(!doctorsFeed) return;

  return (
    <div className='flex flex-col justify-center items-center'>
    {doctorsFeed.length && doctorsFeed.map((doctor) => {
      return (
        <div key={doctor._id} className='m-4 w-1/2'>
          <div className="card card-side bg-white shadow-2xl text-gray-900">
          <figure>
            <img
              src="https://www.shutterstock.com/image-vector/default-placeholder-doctor-halflength-portrait-260nw-1058724875.jpg"
              alt="Doctor" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{doctor.name}</h2>
            <p>{doctor.specialization}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick = {() => hadleBooking(doctor._id)}>Book Appointment</button>
            </div>
          </div>
        </div>
        </div>
      )})}
    </div>
    )}


export default DoctorsFeed