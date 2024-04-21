import React, { useState, useEffect } from 'react';
import { GiRotaryPhone } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from "../../assets/defaultUser.png";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaUserCircle, FaComments, FaCog, FaUsers, FaStar } from 'react-icons/fa';
import './index.css';
import Navbar from '../navbar/Navbar';
import useAuthStore from '@/store/auth';
import AppwriteService from '@/services/appwrite';

function SideBar({ username }: { username: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="custom-sidebar">
      <Sidebar collapsed={isMobile}>
        <Menu>
          <div className="sidebar-top">
            <Link to="/profile">
              <img
                className="rounded-full border-2 bg-yellow-300 me-3 hover:bg-yellow-500 cursor-pointer"
                src={defaultUser}
                alt="userProfileImage"
                width={40}
              />
            </Link>
            {!isMobile && <span>{username}</span>}
          </div>
          <MenuItem icon={<FaUserCircle />} >Account</MenuItem>
          <Link to ="/chat"><MenuItem icon={<FaComments />} >Chat</MenuItem></Link>
          <MenuItem icon={<FaCog />} >Settings</MenuItem>
          <MenuItem icon={<FaUsers />} >Customer Support</MenuItem>
          <MenuItem icon={<FaStar />} >Reviews</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export { SideBar };

export default function Profile() {

  const navigator = useNavigate()
  const { user } = useAuthStore();
  const [borrow, setBorrow] = useState<any[]>([]);
  const [rented, setRented] = useState<any[]>([]);
  const appwrite = new AppwriteService();

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const borrowed = await appwrite.getBorrowed(user?.$id || "none");
        if (borrowed) setBorrow(borrowed);

        const rented = await appwrite.getRented(user?.$id || "none");
        if (rented) setRented(rented);
      }
    }

    fetchData();
  }, [user]);
  const logout = async()=>{
    await appwrite.logout()
    navigator('/login')
  }


  return (
    <>
    {/* <Navbar /> */}
    <div className='flex'>
      <Navbar/>
    </div>
    <div className="profile-container" style={{marginTop:80}}>
      <div className="carousel-control-buttons"> {/* Container for carousel control buttons */}
        {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span> */}
        {/* </button> */}
      </div>
      <SideBar username={user?.name ? user.name : "Ayush"} />
      <div className="other-components">
        <div className="card" style={{ width: 'auto', height: 'auto', padding: 40 }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/robert-pattinson-as-batman-bruce-wayne-in-the-batman-1645186686.jpeg?crop=0.607xw:0.911xh;0.318xw,0.0102xh&resize=640:*"
                className="card-img-top rounded-circle"
                alt="ProfileIcon"
                style={{ width: '70%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{user?.name ? user.name : "Ayush"}</h1> {/* Increased font size and added margin */}
                <div className="d-flex align-items-center" style={{ marginBottom: '20px' }}> {/* Use flexbox for alignment and added margin */}
                  <GiRotaryPhone style={{ marginRight: '10px' }} /> {/* Icon */}
                  <p className="card-text" style={{ marginBottom: '0' }}>{user?.phone}</p> {/* Phone number */}
                </div>
                <div className="d-flex justify-content-start"> {/* Use flexbox to space buttons */}
                 <Link to ='/products'> <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>Borrow</button></Link>
                  <Link to = "/list-item"><button type="button" className="btn btn-primary">Rent</button></Link>
                  <Link to = "/list-item"><button type="button" style={{marginLeft:10}}  onClick={logout} className="btn btn-primary">Logout</button></Link>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{marginTop:20}}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <h1 className="carousel-heading" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Borrowed</h1> {/* Increased font size and added margin */}
              <table className="table table-bordered table-striped"> {/* Improved table style */}
                <thead className="table-head">
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {borrow.map((element)=>(
                    <tr key={element.$id}>
                      <td>{element?.name}</td>
                      <td>{element.owner || "Pending"}</td>
                      <td>{element.price>2000 ? (element.price/40).toFixed(0): element.price}</td>
                      <td>{element.date}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <h1 className="carousel-heading" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Rented</h1> {/* Increased font size and added margin */}
              <table className="table table-bordered table-striped"> {/* Improved table style */}
                <thead className="table-head">
                  <tr>
                    <th>Name</th>
                    <th>Deal With</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rented.map((element)=>(
                    <tr key={element.$id}>
                    <td>{element?.name}</td>
                      <td>{element.borrower || "Pending"}</td>
                      <td>{element.price>2000 ? (element.price/40).toFixed(0) : element.price}</td>
                      <td>{element.date}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  
}
