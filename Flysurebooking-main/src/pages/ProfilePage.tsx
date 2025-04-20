import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Date of Birth</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01/01/1985"
              readOnly
            />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Travel Preferences</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <input type="checkbox" id="window" className="mr-2" />
            <label htmlFor="window">Prefer window seat</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="vegetarian" className="mr-2" />
            <label htmlFor="vegetarian">Vegetarian meal</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="priority" className="mr-2" />
            <label htmlFor="priority">Priority boarding</label>
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Save Preferences
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Trips</h2>
        {[1, 2].map((trip) => (
          <div key={trip} className="border-b border-gray-200 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">New York → London</h3>
                <p className="text-sm text-gray-600">May 15, 2023 • Flight #AB123</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;