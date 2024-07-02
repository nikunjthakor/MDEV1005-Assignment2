import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Profile() {
  // State variables for user details, editing mode, and loading state
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from Firestore
  const fetchUserData = async (user) => {
    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserDetails(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };

  // UseEffect to monitor authentication state changes
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
        console.log("User is not logged in");
        setLoading(false);
      }
    });
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle save action to update user details in Firestore
  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, userDetails);
      setIsEditing(false); // Exit editing mode after saving
    }
  };

  // Display loading message if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      
      <div className="card">
        <div className="card-body">
          <form>
            {/* First Name Field */}
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                disabled={!isEditing} // Disable input if not editing
              />
            </div>
            {/* Last Name Field */}
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                disabled={!isEditing} // Disable input if not editing
              />
            </div>
            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                disabled // Always disable email input
              />
            </div>
            {/* Save and Edit Buttons */}
            {isEditing ? (
              <button type="button" className="btn btn-success mt-3" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button type="button" className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
