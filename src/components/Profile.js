import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} className="rounded-circle" style={{ width: '50px', height: '50px' }} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button
          className="btn btn-danger"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      </div>
    )
  );
};

export default Profile;