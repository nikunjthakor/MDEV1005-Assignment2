import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Profile() {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, userDetails);
      setIsEditing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                disabled
              />
            </div>
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
