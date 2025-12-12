import React from 'react';

const Profile = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">Personal Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">Education</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-slate-500">University</p>
                <p className="font-medium">Tech University</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Major</p>
                <p className="font-medium">Computer Science</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Expected Graduation</p>
                <p className="font-medium">May 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;