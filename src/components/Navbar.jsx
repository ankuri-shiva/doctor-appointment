import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/login");
  }

  return (
    <div className="navbar bg-neutral">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Doctor-Appt</a>
    </div>
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="More"
              src="" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
            </a>
          </li>
          <li><a>My Appointments</a></li>
          <li onClick= {handleLogout}><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
    
  )
}

export default Navbar