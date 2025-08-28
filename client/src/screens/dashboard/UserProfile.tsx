import { useState } from "react";
import EditProfileForm from "../../components/forms/EditProfileForm";
import Profile from "../../components/Section/Profile";

const UserProfile = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="user-profile  mx-4 px-4">
      <div className="bar dark:bg-secondary-500 bg-white shadow-md px-4 py-2 rounded-xl flex justify-between items-center">
        <Profile />
        <div>
          <button
            className="px-4 py-1 bg-primary-400 text-white rounded-md cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      {showForm && <EditProfileForm setshowForm={setShowForm} />}
    </div>
  );
};

export default UserProfile;
