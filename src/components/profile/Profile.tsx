import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaUserCircle, FaComments, FaCog, FaUsers, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import defaultUser from "../../assets/defaultUser.png";
import './index.css'; // Import your custom CSS for styling
import { GiRotaryPhone } from "react-icons/gi";
import Navbar from '../navbar/Navbar';


function SideBar({username} : {username:string}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    handleResize(); // Check initial screen size
    window.addEventListener('resize', handleResize); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
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
          <MenuItem icon={<FaComments />} >Chat</MenuItem>
          <MenuItem icon={<FaCog />} >Settings</MenuItem>
          <MenuItem icon={<FaUsers />} >Customer Support</MenuItem>
          <MenuItem icon={<FaStar />} >Reviews</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export {SideBar};

export default function Profile() {



  const user = {username: "Ayush" , phoneNumber: "+919929419734"}
  return (
    <>
    {/* <Navbar /> */}
    <div className='flex'>
      <Navbar/>
    </div>
    <div className="profile-container" style={{marginTop:80}}>
      <div className="carousel-control-buttons"> {/* Container for carousel control buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <SideBar username={user.username} />
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
                <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{user.username}</h1> {/* Increased font size and added margin */}
                <div className="d-flex align-items-center" style={{ marginBottom: '20px' }}> {/* Use flexbox for alignment and added margin */}
                  <GiRotaryPhone style={{ marginRight: '10px' }} /> {/* Icon */}
                  <p className="card-text" style={{ marginBottom: '0' }}>{user.phoneNumber}</p> {/* Phone number */}
                </div>
                <div className="d-flex justify-content-start"> {/* Use flexbox to space buttons */}
                 <Link to ='/'> <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }}>Borrow</button></Link>
                  <Link to = "/list-item"><button type="button" className="btn btn-primary">Rent</button></Link>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>$15</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Item 2</td>
                    <td>$25</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <h1 className="carousel-heading" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>Rented</h1> {/* Increased font size and added margin */}
              <table className="table table-bordered table-striped"> {/* Improved table style */}
                <thead className="table-head">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Item 1</td>
                    <td>$15</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Item 2</td>
                    <td>$25</td>
                  </tr>
                  {/* Add more rows as needed */}
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
