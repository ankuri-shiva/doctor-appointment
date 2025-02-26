
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useLocation } from 'react-router-dom';

const Appointment = () => {
    const todayDate = new Date().toISOString().slice(0, 10);

    
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState(todayDate);
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [appointmentType, setAppointmentType] = useState('');


    const location = useLocation(); 
    const doctorId = location.state?.doctorId; 

    const handleSubmit = async () => {
        if (!doctorId || !selectedSlot || !patientName || !date || !appointmentType) {
            alert("Please fill in all fields before submitting.");
            return;
        }
    
        try{
            const res = await axios.post(`${BASE_URL}/appointment`, {
                doctorId,
                date,
                slot: selectedSlot,
                patientName,
                appointmentType
            }, {withCredentials: true});
            if(res.status >= 200 && res.status < 300){
                alert("Appointment booked successfully");
            }else{
                throw new Error("Failed to book appointment");
            }
        }catch(err){
            console.error(err.message);
        }
    }

   

    const getAvailableTimeSlot = async (selectedDate) => {
        if(!doctorId || !date) return;
        try{
            const res = await axios.get(`${BASE_URL}/doctors/${doctorId}/slots?date=${selectedDate}`, {withCredentials: true});

            if (res.status === 200) {
                setTimeSlot(res.data);
            } else {
                throw new Error("Failed to fetch slots");
            }
        }catch(err){
            console.error(err.message);
        }
    }; 

    


    const dateArray = [];
    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(todayDate);
        currentDate.setDate(currentDate.getDate() + i);
        dateArray.push(currentDate.toISOString().slice(0, 10));
    };

    const handleSelectDate = (e) => {
        setDate(e.target.value);
    }

    useEffect(() => {
        if(date) {
            getAvailableTimeSlot(date);
        }
    }, [date]);



  return (
    <div className='flex justify-center items-center'>
        <div className="card bg-white shadow-xl w-1/2 flex flex-col justify-center items-center">
        <h1 className='font-bold text-indigo-800 text-4xl mt-10 mb-5'>Book An Appointment</h1>
        <label className="form-control w-full max-w-xs text-left mb-5">
            <div className="label">
                <span className="label-text text-gray-900 font-bold">Doctor Id</span>
            </div>
        <input type="text" placeholder="Type here" value = {doctorId}
         className="input input-bordered  text-gray-700 w-full max-w-xs bg-slate-300" />
        </label>

        <label className="form-control w-full max-w-xs text-left mb-5">
            <div className="label">
                <span className="label-text text-gray-900 font-bold">AppointMent Type</span>
            </div>

            <select
            value = {appointmentType}
            onChange = {(e) => setAppointmentType(e.target.value)}
             className="input input-bordered w-full max-w-xs  bg-slate-300  text-gray-700">
                <option disabled selected>Pick the Appointment Type</option>
                <option>Regular check-up</option>
                <option>Ultra Sound</option>
            </select>
        </label>

        <label className="form-control w-full max-w-xs text-left mb-5">
            <div className="label">
                <span className="label-text text-gray-900 font-bold">Pationt Name</span>
            </div>
            <input value = {patientName} type="text"
            onChange={(e) => setPatientName(e.target.value)}
             placeholder="Type here" className="input input-bordered w-full max-w-xs  text-gray-700  bg-slate-300" />
        </label>

        <label className="form-control w-full max-w-xs text-left mb-5">
            <div className="label">
                <span className="label-text text-gray-900 font-bold">Date</span>
            </div>

            <select
            value={date}
            onChange={handleSelectDate}
             className="input input-bordered w-full max-w-xs bg-slate-300 text-gray-700">
                <option value="">Select a Date</option>
                {dateArray.map((optionDate) => {
                    return <option key={optionDate} value={optionDate}>{optionDate}</option>})}
            </select>
            
        </label>

        <label className="form-control w-full max-w-xs text-left mb-5">
            <div className="label">
                <span className="label-text text-gray-900 font-bold"> Available Slot</span>
            </div>
                {timeSlot && timeSlot.length ? (
                    <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                     className="input input-bordered w-full max-w-xs  bg-slate-300  text-gray-700">
                        <option value="">select the Slot</option>
                        {timeSlot.map((slot, index) => {
                            return <option key={index} value={slot.time}>{slot.time}</option>
                        })}
                    </select>
                ) : (
                    <p>No slots available</p>
                )}
            
        </label>
  
    <div className="card-actions">
      <button
      onClick = {handleSubmit}
       className="btn btn-primary mb-4">Book Appointment</button>
  </div>
</div>
</div>
  )
}

export default Appointment