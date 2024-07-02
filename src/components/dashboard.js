import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import CalendarPage from "./Calendar";
import Calculator from "./Calculator";
import Checklist from "./Checklist";
import UserList from "./UserList";
import WeatherWidget from "./WeatherWidget";

function Dashboard() {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
  });
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch user data from Firebase Firestore
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle user logout
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  // Render the content based on the active tab
  const renderContent = () => {
    if (!userDetails) {
      return <div>Loading...</div>;
    }

    switch (activeTab) {
      case 'profile':
        return (
          <div className="text-center">
            <h3>Profile Detail</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              <p>Last Name: {userDetails.lastName}</p>
            </div>
          </div>
        );
      case 'userlist':
        return <UserList />;
      case 'calendar':
        return <CalendarPage />;
      case 'calculator':
        return <Calculator />;
      case 'checklist':
        return <Checklist />;
      case 'weather':
        return <WeatherWidget />;
      default:
        return null;
    }
  };

  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Dashboard - SB Admin</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
      </head>
      <body className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="/Dashboard">Dashboard</a>
          <a className="navbar-brand ps-3" href="/profile">Profile</a>
          <a className="navbar-brand ps-3" href="/calendar">Calendar</a>
          <a className="navbar-brand ps-3" href="/calculator">Calculator</a>
          <a className="navbar-brand ps-3" href="/Userlist">Userlist</a>
          <a className="navbar-brand ps-3" href="/weather">Weather</a>
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
            <i className="fas fa-bars"></i>
          </button>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-user fa-fw"></i>
                {userDetails && <span className="small"> Logged in as: {userDetails.firstName}</span>}
              </a>
            </li>
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Logout
          </button>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu"></div>
              <div className="sb-sidenav-footer"></div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <div className="text-center">
                  <h1>Welcome, {userDetails.firstName} 🙏🙏</h1>
                </div>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Welcome to Dashboard</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Profile</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-danger" onClick={() => setActiveTab('profile')}>View Profile</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary text-white mb-4">
                      <div className="card-body">UserList</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-secondary" onClick={() => setActiveTab('userlist')}>View Registered Users</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Calendar</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-primary" onClick={() => setActiveTab('calendar')}>View Calendar</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Calculator</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-warning" onClick={() => setActiveTab('calculator')}>View Calculator</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Checklist</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-success" onClick={() => setActiveTab('checklist')}>View Checklist</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-info text-white mb-4">
                      <div className="card-body">Weather</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <button className="btn btn-info" onClick={() => setActiveTab('weather')}>View Weather</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              {renderContent()}
            </main>
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright © MDEV1005 2024</div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    ·
                    <a href="#">Terms & Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Dashboard;
