// // import { useLocation } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           <UserTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Portal
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           // Show PasswordManagement for Users, UserTable for Admins
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Portal
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // Stable version //

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           // Show PasswordManagement for Users, UserTable for Admins
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Approval Workflow
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // Stable version ends //

// // src/pages/Dashboard.jsx (Updated)

// import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import AboutPage from "../components/AboutPage";

// // Copied showToast from AboutPage for consistency
// const showToast = (message, type = "info") => {
//   const bgColor =
//     type === "success"
//       ? "#4ade80"
//       : type === "error"
//       ? "#ef4444"
//       : type === "warning"
//       ? "#f59e0b"
//       : "#3b82f6";
//   const toast = document.createElement("div");
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime =
//     message.includes("import") || message.includes("Import") ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = "0";
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const navigate = useNavigate(); // Added useNavigate hook
//   const [currentUser, setCurrentUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//         // Optionally redirect to login if parsing fails
//         // navigate("/login");
//       }
//     } else {
//       // Redirect to login if no user info found
//       // navigate("/login");
//     }
//   }, [navigate]); // Added navigate dependency

//   // 1. Define handleLogout function here
//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     showToast("Logged out successfully", "info");
//     navigate("/"); // Navigate to login page after logout
//   };

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div
//         className={`w-0 flex-1 flex flex-col min-h-0 transition-all duration-300 ${
//           // Adjusts content based on sidebar
//           sidebarOpen ? "ml-56" : "ml-20"
//         }`}
//         // Add overflow-y-auto AND overflow-x-hidden
//         style={{ overflowY: "auto", overflowX: "hidden" }}
//       >
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? (
//             <PasswordManagement />
//           ) : (
//             <UserTable />
//           )
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : // 2. Pass handleLogout to AboutPage
//         pathname === "/dashboard/about" ? (
//           <AboutPage handleLogout={handleLogout} />
//         ) : (
//           // Default fallback page - Ensure it doesn't overflow
//         //   <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//         //     {/* Added w-full and max-w-xl */}
//         //     <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform transition-all duration-300 w-full max-w-xl">
//         //       <div className="text-center">
//         //         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//         //           <svg
//         //             className="w-6 h-6 text-white"
//         //             fill="none"
//         //             stroke="currentColor"
//         //             viewBox="0 0 24 24"
//         //           >
//         //             <path
//         //               strokeLinecap="round"
//         //               strokeLinejoin="round"
//         //               strokeWidth="2"
//         //               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//         //             ></path>
//         //           </svg>
//         //         </div>
//         //         <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//         //           Timesheets
//         //         </h1>
//         //         <p className="text-gray-500 text-sm">
//         //           Choose an option from the menu
//         //         </p>
//         //       </div>
//         //     </div>
//         //   </div>
//         <MainTable />
//         )}
//       </div>
//     </div>
//   );
// }

// STABLE version ends
// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";

// export default function Dashboard() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Portal
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           // Show PasswordManagement for Users, UserTable for Admins
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Portal
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// Stable version //

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           // Show PasswordManagement for Users, UserTable for Admins
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Approval Workflow
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// Stable version ends //

// src/pages/Dashboard.jsx (Updated)

// import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import AboutPage from "../components/AboutPage";
// import TimesheetHistory from "../components/TimesheetHistory";
// import Settings from "../components/Settings";

// // Copied showToast from AboutPage for consistency
// const showToast = (message, type = "info") => {
//   const bgColor =
//     type === "success"
//       ? "#4ade80"
//       : type === "error"
//       ? "#ef4444"
//       : type === "warning"
//       ? "#f59e0b"
//       : "#3b82f6";
//   const toast = document.createElement("div");
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime =
//     message.includes("import") || message.includes("Import") ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = "0";
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const navigate = useNavigate(); // Added useNavigate hook
//   const [currentUser, setCurrentUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//         // Optionally redirect to login if parsing fails
//         // navigate("/login");
//       }
//     } else {
//       // Redirect to login if no user info found
//       // navigate("/login");
//     }
//   }, [navigate]); // Added navigate dependency

//   // 1. Define handleLogout function here
//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     showToast("Logged out successfully", "info");
//     navigate("/"); // Navigate to login page after logout
//   };

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div
//         className={`w-0 flex-1 flex flex-col min-h-0 transition-all duration-300 ${
//           // Adjusts content based on sidebar
//           sidebarOpen ? "ml-56" : "ml-20"
//         }`}
//         // Add overflow-y-auto AND overflow-x-hidden
//         style={{ overflowY: "auto", overflowX: "hidden" }}
//       >
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? (
//             <PasswordManagement />
//           ) : (
//             <UserTable />
//           )
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : // 2. Pass handleLogout to AboutPage
//         pathname === "/dashboard/about" ? (
//           <AboutPage handleLogout={handleLogout} />
//         ) : // 2. Pass handleLogout to AboutPage
//         pathname === "/dashboard/timesheethistory" ? (
//           <TimesheetHistory />
//         ) : pathname === "/dashboard/settings" ? (
//           <Settings />
//         ) : pathname === "/dashboard/usertable" ? (
//           <UserTable />
//         ) : (
//           // Default fallback page - Ensure it doesn't overflow
//           //   <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//           //     {/* Added w-full and max-w-xl */}
//           //     <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform transition-all duration-300 w-full max-w-xl">
//           //       <div className="text-center">
//           //         <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//           //           <svg
//           //             className="w-6 h-6 text-white"
//           //             fill="none"
//           //             stroke="currentColor"
//           //             viewBox="0 0 24 24"
//           //           >
//           //             <path
//           //               strokeLinecap="round"
//           //               strokeLinejoin="round"
//           //               strokeWidth="2"
//           //               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//           //             ></path>
//           //           </svg>
//           //         </div>
//           //         <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//           //           Timesheets
//           //         </h1>
//           //         <p className="text-gray-500 text-sm">
//           //           Choose an option from the menu
//           //         </p>
//           //       </div>
//           //     </div>
//           //   </div>
//           <MainTable />
//         )}
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//       }
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div
//         className={`w-0 flex-1 flex flex-col min-h-0 transition-all duration-300 ${
//           sidebarOpen ? "ml-56" : "ml-20"
//         }`}
//         style={{ overflowY: "auto", overflowX: "hidden" }}
//       >
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approvals" ? (
//           <ApprovalComponent />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? (
//             <PasswordManagement />
//           ) : (
//             <UserTable />
//           )
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : pathname === "/dashboard/about" ? (
//           <AboutPage handleLogout={handleLogout} />
//         ) : pathname === "/dashboard/timesheethistory" ? (
//           <TimesheetHistory />
//         ) : pathname === "/dashboard/settings" ? (
//           <Settings />
//         ) : pathname === "/dashboard/usertable" ? (
//           <UserTable />
//         ) : (
//            <MainTable />
//           // <ApprovalComponent />
//         )}
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainTable from "../components/MainTable";
import UserTable from "../components/UserTable";
import GroupsTable from "../components/GroupsTable";
import WorkFlow from "../components/WorkFlow";
import PasswordManagement from "../components/PasswordManagement";
import ExportTable from "../components/ExportTable";
import AboutPage from "../components/AboutPage";
import TimesheetHistory from "../components/TimesheetHistory";
import Settings from "../components/Settings";
import ApprovalComponent from "../components/ApprovalComponent";
import Import from "../components/import";

const showToast = (message, type = "info") => {
  const bgColor =
    type === "success"
      ? "#4ade80"
      : type === "error"
      ? "#ef4444"
      : type === "warning"
      ? "#f59e0b"
      : "#3b82f6";
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);
  const displayTime =
    message.includes("import") || message.includes("Import") ? 4000 : 1000;
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, displayTime);
};

export default function Dashboard() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.role === "User" &&
      pathname.includes("/dashboard/timesheet")
    ) {
      navigate("/dashboard/approvals");
    }
  }, [currentUser, pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  const isUser = currentUser?.role === "User";

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`w-0 flex-1 flex flex-col min-h-0 transition-all duration-300 ${
          sidebarOpen ? "ml-56" : "ml-20"
        }`}
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {pathname === "/dashboard/timesheet" ? (
          <MainTable />
        ) : pathname === "/dashboard/approvals" ? (
          <ApprovalComponent />
        ) : pathname === "/dashboard/users" ? (
          isUser ? (
            <PasswordManagement />
          ) : (
            <UserTable />
          )
        ) : pathname === "/dashboard/export" ? (
          <ExportTable />
        ) : pathname === "/dashboard/groups/manage-groups" ? (
          <GroupsTable />
        ) : pathname === "/dashboard/groups/manage-workflow" ? (
          <WorkFlow />
        ) : pathname === "/dashboard/about" ? (
          <AboutPage handleLogout={handleLogout} />
        ) : pathname === "/dashboard/timesheethistory" ? (
          <TimesheetHistory />
        ) : pathname === "/dashboard/settings" ? (
          <Settings />
        ) : pathname === "/dashboard/import" ? (
          <Import />
        ) : pathname === "/dashboard/usertable" ? (
          <UserTable />
        ) : isUser ? (
          <ApprovalComponent />
        ) : (
          <MainTable />
        )}
      </div>
    </div>
  );
}
