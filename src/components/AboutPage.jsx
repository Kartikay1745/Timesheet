import React from 'react';
// Using useNavigate for navigation instead of setCurrentPage prop
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft, ExternalLink, Database, Briefcase, Download, Users, LogOut } from 'lucide-react';

// A small component for feature items to keep the code clean
const FeatureItem = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-shrink-0 text-blue-600">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

// Updated AboutPage to use useNavigate and accept handleLogout prop
const AboutPage = ({ handleLogout }) => { 
  const navigate = useNavigate(); // Hook for navigation

  return (
    // Main container with dark background matching the reference
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8">
      {/* Centered content card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-4xl mx-auto text-gray-800">

        {/* Header Section (Title and Description) */}
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    About TimeTracker {/* Updated Title */}
                </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                An integrated platform designed to simplify timesheet submission, approval workflows, and provide management tools for your organization. {/* Updated Description */}
            </p>
        </div>

        {/* Key Features Section (similar to reference, using Timesheet icons) */}
        {/* <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureItem 
                    icon={<Database size={24} />}
                    title="Centralized Timesheet Entry"
                    description="Submit and manage all timesheet records in one unified system."
                />
                <FeatureItem 
                    icon={<Briefcase size={24} />} // Using Briefcase icon for workflow
                    title="Approval Workflows"
                    description="Review, approve, or reject timesheet entries based on defined workflows."
                />
                <FeatureItem 
                    icon={<Download size={24} />}
                    title="Data Export"
                    description="Admins can export approved timesheet data for reporting and processing."
                />
                <FeatureItem 
                    icon={<Users size={24} />}
                    title="User & Group Management"
                    description="Admin controls for managing users, groups, and approval processes."
                />
            </div>
        </div> */}
        
        {/* Version & System Details Section */}
        <div className="space-y-4 text-center border-t border-b border-gray-200 py-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="sm:text-right">
                    <p className="text-gray-500 font-medium">Product Version</p>
                    <p className="text-gray-800 font-semibold">v1.0.0</p> 
                </div>
                <div className="sm:text-center">
                    <p className="text-gray-500 font-medium">Release Date</p>
                    {/* Using current date as placeholder */}
                    <p className="text-gray-800 font-semibold">{new Date().toLocaleDateString()}</p> 
                </div>
                <div className="sm:text-left">
                    <p className="text-gray-500 font-medium">System</p>
                    {/* Using a generic name */}
                    <p className="text-gray-800 font-semibold">TimeTracker Production</p> 
                </div>
            </div>
        </div>

        {/* Website Link and Powered By */}
        <div className="text-center space-y-4">
            <a 
                href="https://revolvespl.com/" // Kept Revolve website link
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm"
            >
                Revolve Website <ExternalLink size={14} />
            </a>
            <p className="text-xs text-gray-500">
                {/* Updated "Powered By" text */}
                Powered by Revolve 
            </p> 
             <p className="text-xs text-gray-400">
               Copyright &copy; {new Date().getFullYear()} Revolve. All Rights Reserved.
             </p>
        </div>

        {/* Back and Logout Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 relative">
             <button
                 // Navigate back to timesheet page on click
                 onClick={() => navigate('/dashboard/timesheet')} 
                 className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
             >
                 <ArrowLeft size={18} />
                 Back to Timesheet
             </button>
             {/* Logout button positioned using absolute for larger screens */}
             <div className="absolute top-0 right-0 sm:static mt-4 sm:mt-0">
               {/* <button 
                  onClick={handleLogout} 
                  className="p-2 sm:p-3 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition-colors"
                  title="Logout"
              >
                  <LogOut size={18} />
              </button> */}
             </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutPage;

