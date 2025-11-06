// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// // Simple toast function without container
// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80' :
//                  type === 'error' ? '#ef4444' :
//                  type === 'warning' ? '#f59e0b' : '#3b82f6';

//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;

//   document.body.appendChild(toast);
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 3000);
// };

// // Custom hook to get URL parameters
// const useURLParams = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   return searchParams;
// };

// export default function Login() {
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const urlParams = useURLParams();

//   // const userSuggestions = ["john.doe", "jane.smith"];

//   // Effect to set username from URL parameter
//   useEffect(() => {
//     const useridFromUrl = urlParams.get('userid');
//     if (useridFromUrl) {
//       setUser(useridFromUrl);
//     }
//   }, [location.search]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !pass) {
//       showToast("Please enter username and password", "error");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Call the login API
//       const loginResponse = await fetch('${backendUrl}/api/User/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username: user,
//           password: pass
//         })
//       });

//       if (loginResponse.ok) {
//         const loginData = await loginResponse.json();

//         // Create user info based on API response
//         const userInfo = {
//           id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
//           name: loginData.name || user,
//           role: loginData.Role, // Use Role from API response (User/Admin)
//           username: loginData.username || user.toLowerCase(),
//           ...loginData // Include any additional data from API
//         };

//         console.log('Storing user info:', userInfo);

//         // Store user info in localStorage
//         localStorage.setItem('currentUser', JSON.stringify(userInfo));

//         // Show success message and navigate to dashboard (same route for both roles)
//         if (loginData.Role === "User") {
//           showToast("Welcome User! Redirecting to timesheet portal...", "success");
//         } else if (loginData.Role === "Admin") {
//           showToast("Welcome Admin! Redirecting to admin portal...", "success");
//         } else {
//           showToast("Welcome! Logging you in...", "success");
//         }

//         // Navigate to dashboard for both roles - MainTable will handle the role-based UI and API calls
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);

//       } else {
//         // Handle login failure
//         const errorData = await loginResponse.json().catch(() => null);
//         const errorMessage = errorData?.message || 'Invalid credentials. Please check your username and password.';
//         showToast(errorMessage, "error");
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       showToast('Login failed. Please check your connection and try again.', "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUsernameChange = (e) => {
//     const value = e.target.value;
//     setUser(value);

//     // Filter suggestions based on input
//     if (value.length > 0) {
//       const filtered = userSuggestions.filter(suggestion =>
//         suggestion.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//       setShowSuggestions(filtered.length > 0);
//     } else {
//       setFilteredSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleUsernameFocus = () => {
//     // Show all suggestions when focused
//     setFilteredSuggestions(userSuggestions);
//     setShowSuggestions(true);
//   };

//   const handleUsernameBlur = () => {
//     // Delay hiding to allow click on suggestion
//     setTimeout(() => {
//       setShowSuggestions(false);
//     }, 200);
//   };

//   const selectSuggestion = (suggestion) => {
//     setUser(suggestion);
//     setShowSuggestions(false);
//     setFilteredSuggestions([]);
//     // Focus on password field after selection
//     setTimeout(() => {
//       const passwordField = document.querySelector('input[type="password"]');
//       if (passwordField) passwordField.focus();
//     }, 100);
//   };

//   // Handle keyboard navigation
//   const handleKeyDown = (e) => {
//     if (!showSuggestions || filteredSuggestions.length === 0) return;

//     if (e.key === 'ArrowDown') {
//       e.preventDefault();
//       // You can add keyboard navigation here if needed
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault-name();
//       // You can add keyboard navigation here if needed
//     } else if (e.key === 'Escape') {
//       setShowSuggestions(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-950">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
//         <h2 className="text-xl font-bold text-center mb-6 text-blue-900">
//            Timesheets
//         </h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="relative">
//             <input
//               className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
//               placeholder="Username"
//               value={user}
//               onChange={handleUsernameChange}
//               onFocus={handleUsernameFocus}
//               onBlur={handleUsernameBlur}
//               onKeyDown={handleKeyDown}
//               autoComplete="off"
//               required
//               disabled={isLoading}
//             />
//             {showSuggestions && filteredSuggestions.length > 0 && !isLoading && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto">
//                 <div className="p-2 text-xs text-gray-500 font-medium border-b">Suggestions:</div>
//                 {filteredSuggestions.map((suggestion, index) => (
//                   <div
//                     key={suggestion}
//                     className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       selectSuggestion(suggestion);
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = '#e0e7ff';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = '';
//                     }}
//                   >
//                     {suggestion}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <input
//             className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             type="password"
//             placeholder="Password"
//             value={pass}
//             onChange={e => setPass(e.target.value)}
//             required
//             disabled={isLoading}
//           />
//           <button
//             className="bg-indigo-700 text-white font-semibold py-2 rounded text-sm hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Logging in...
//               </div>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { User, Lock } from "lucide-react"; // Added icons
// import { backendUrl } from "../components/config";
// import { FaTimes } from "react-icons/fa";

// // Simple toast function without container
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
//   setTimeout(() => {
//     toast.style.opacity = "0";
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 3000);
// };

// // Custom hook to get URL parameters
// const useURLParams = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   return searchParams;
// };

// const PasswordModal = ({ userInfo, type, onClose }) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent form default behavior

//     if (newPassword !== confirmPassword) {
//       setError("New passwords do not match.");
//       return;
//     }
//     if (newPassword.length < 5) {
//       setError("Password must be at least 5 characters long.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     // Build payload based on existing userInfo with password update and firstLogin false
//     const payload = {
//       ...userInfo, // existing user info object
//       firstLogin: false, // mark firstLogin false to indicate password updated
//     };

//     const url = `${backendUrl}/api/User/${userInfo.userId}`; // update user API

//     try {
//       const response = await fetch(url, {
//         method: "PUT", // update request
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         showToast("Password updated successfully! Please login.", "success");
//         onClose(); // close modal
//         navigate("/login"); // navigate to login page
//         return;
//       }

//       const errorData = await response.json().catch(() => null);
//       throw new Error(
//         errorData?.message || `Request failed with status ${response.status}`
//       );
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             Update Your Password
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               // disabled={isLoading}
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50"
//             >
//               Update Password
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default function Login() {
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const urlParams = useURLParams();
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);

//   // const userSuggestions = ["john.doe", "jane.smith"];
//   // Suggestions are disabled for now, but logic remains if you want to re-enable
//   const userSuggestions = [];

//   // Effect to set username from URL parameter
//   useEffect(() => {
//     const useridFromUrl = urlParams.get("userid");
//     if (useridFromUrl) {
//       setUser(useridFromUrl);
//     }
//   }, [location.search]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!user || !pass) {
//   //     showToast("Please enter username and password", "error");
//   //     return;
//   //   }

//   //   setIsLoading(true);

//   //   try {
//   //     // Call the login API
//   //     const loginResponse = await fetch(`${backendUrl}/api/User/login`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         username: user,
//   //         password: pass,
//   //       }),
//   //     });

//   //     if (loginResponse.ok) {
//   //       const loginData = await loginResponse.json();

//   //       // Create user info based on API response
//   //       const userInfo = {
//   //         id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
//   //         name: loginData.fullName || user,
//   //         role: loginData.Role, // Use Role from API response (User/Admin)
//   //         username: loginData.username || user.toLowerCase(),
//   //         userId: loginData.userId,
//   //         ...loginData, // Include any additional data from API
//   //       };

//   //       console.log("Storing user info:", userInfo);

//   //       // Store user info in localStorage
//   //       localStorage.setItem("currentUser", JSON.stringify(userInfo));

//   //       // Show success message and navigate to dashboard (same route for both roles)
//   //       if (loginData.Role === "User") {
//   //         showToast(
//   //           "Welcome User! Redirecting to timesheet portal...",
//   //           "success"
//   //         );
//   //       } else if (loginData.Role === "Admin") {
//   //         showToast("Welcome Admin! Redirecting to admin portal...", "success");
//   //       } else {
//   //         showToast("Welcome! Logging you in...", "success");
//   //       }

//   //       // Navigate to dashboard for both roles
//   //       setTimeout(() => {
//   //         navigate("/dashboard/timesheet");
//   //       }, 1000);
//   //     } else {
//   //       // Handle login failure
//   //       const errorData = await loginResponse.json().catch(() => null);
//   //       const errorMessage =
//   //         errorData?.message ||
//   //         "Invalid credentials. Please check your username and password.";
//   //       showToast(errorMessage, "error");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login error:", error);
//   //     showToast(
//   //       "Login failed. Please check your connection and try again.",
//   //       "error"
//   //     );
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !pass) {
//       showToast("Please enter username and password", "error");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Call login API
//       const loginResponse = await fetch(`${backendUrl}/api/User/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: user,
//           password: pass,
//         }),
//       });

//       if (loginResponse.ok) {
//         const loginData = await loginResponse.json();

//         const userInfo = {
//           id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
//           name: loginData.fullName || user,
//           role: loginData.Role,
//           username: loginData.username || user.toLowerCase(),
//           userId: loginData.userId,
//           ...loginData,
//         };

//         console.log("Storing user info:", userInfo);
//         localStorage.setItem("currentUser", JSON.stringify(userInfo));
//         setUserInfo(userInfo);
//         // Check first login flag and show modal if true
//         if (loginData.firstLogin) {
//           // Show PasswordModal (you need to manage this modal's visibility state)
//           setShowPasswordModal(true);
//         } else {
//           if (loginData.Role === "User") {
//             showToast(
//               "Welcome User! Redirecting to timesheet portal...",
//               "success"
//             );
//           } else if (loginData.Role === "Admin") {
//             showToast(
//               "Welcome Admin! Redirecting to admin portal...",
//               "success"
//             );
//           } else {
//             showToast("Welcome! Logging you in...", "success");
//           }

//           setTimeout(() => {
//             navigate("/dashboard/timesheet");
//           }, 1000);
//         }
//       } else {
//         const errorData = await loginResponse.json().catch(() => null);
//         const errorMessage =
//           errorData?.message ||
//           "Invalid credentials. Please check your username and password.";
//         showToast(errorMessage, "error");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       showToast(
//         "Login failed. Please check your connection and try again.",
//         "error"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleUsernameChange = (e) => {
//     const value = e.target.value;
//     setUser(value);

//     if (userSuggestions.length === 0) return; // Don't show if suggestions are disabled

//     // Filter suggestions based on input
//     if (value.length > 0) {
//       const filtered = userSuggestions.filter((suggestion) =>
//         suggestion.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//       setShowSuggestions(filtered.length > 0);
//     } else {
//       setFilteredSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   const handleUsernameFocus = () => {
//     if (userSuggestions.length === 0) return; // Don't show if suggestions are disabled
//     // Show all suggestions when focused
//     setFilteredSuggestions(userSuggestions);
//     setShowSuggestions(true);
//   };

//   const handleUsernameBlur = () => {
//     // Delay hiding to allow click on suggestion
//     setTimeout(() => {
//       setShowSuggestions(false);
//     }, 200);
//   };

//   const selectSuggestion = (suggestion) => {
//     setUser(suggestion);
//     setShowSuggestions(false);
//     setFilteredSuggestions([]);
//     // Focus on password field after selection
//     setTimeout(() => {
//       const passwordField = document.querySelector('input[type="password"]');
//       if (passwordField) passwordField.focus();
//     }, 100);
//   };

//   // Handle keyboard navigation
//   const handleKeyDown = (e) => {
//     if (!showSuggestions || filteredSuggestions.length === 0) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       // You can add keyboard navigation here if needed
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault(); // Fixed typo from 'preventDefault-name'
//       // You can add keyboard navigation here if needed
//     } else if (e.key === "Escape") {
//       setShowSuggestions(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowPasswordModal(false);
//     // You can also refresh user data or move forward here after changing password
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
//       <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-sm relative border border-slate-700">
//         {/* Logo */}
//         <div className="flex justify-center mb-8">
//           {/* !!! IMPORTANT !!!
//             Change this 'src' path to your actual white logo in the 'public' folder.
//             e.g., src="/your-white-logo.png"
//           */}
//           <img
//             src="/Columbus_Logo.png"
//             alt="Logo"
//             className="h-12 w-auto" // Adjust height as needed
//           />
//         </div>

//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
//           Timesheet Login
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//           {/* Username Input */}
//           <div className="relative">
//             <User
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//             <input
//               className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 pl-10 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
//               placeholder="Username"
//               value={user}
//               onChange={handleUsernameChange}
//               onFocus={handleUsernameFocus}
//               onBlur={handleUsernameBlur}
//               onKeyDown={handleKeyDown}
//               autoComplete="off"
//               required
//               disabled={isLoading}
//             />
//             {/* Suggestions dropdown styled for dark mode */}
//             {showSuggestions &&
//               filteredSuggestions.length > 0 &&
//               !isLoading && (
//                 <div className="absolute top-full left-0 right-0 bg-slate-700 border border-slate-600 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto mt-1">
//                   <div className="p-2 text-xs text-gray-400 font-medium border-b border-slate-600">
//                     Suggestions:
//                   </div>
//                   {filteredSuggestions.map((suggestion) => (
//                     <div
//                       key={suggestion}
//                       className="px-3 py-2 text-sm text-gray-200 hover:bg-slate-600 cursor-pointer transition-colors duration-150"
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         selectSuggestion(suggestion);
//                       }}
//                     >
//                       {suggestion}
//                     </div>
//                   ))}
//                 </div>
//               )}
//           </div>

//           {/* Password Input */}
//           <div className="relative">
//             <Lock
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//             <input
//               className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 pl-10 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
//               type="password"
//               placeholder="Password"
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Logging in...
//               </div>
//             ) : (
//               "Login"
//             )}
//           </button>
//           {showPasswordModal && user && (
//             <PasswordModal
//               userInfo={userInfo} // pass the full userInfo object here
//               type="update"
//               onClose={handleCloseModal}
//             />
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { backendUrl } from "../components/config";
import { FaTimes } from "react-icons/fa";

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
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

const useURLParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
};

// const PasswordModal = ({ userInfo, type, onClose }) => {
//   const navigate = useNavigate(); // add navigate here

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Fix: prevent default form submit

//     if (newPassword !== confirmPassword) {
//       setError("New passwords do not match.");
//       return;
//     }
//     if (newPassword.length < 5) {
//       setError("Password must be at least 5 characters long.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     // Update password in payload (add newPassword)
//     const payload = {
//       ...userInfo,
//       password: newPassword, // include new password here
//       firstLogin: false,
//     };

//     const url = `${backendUrl}/api/User/${userInfo.userId}`;

//     try {
//       const response = await fetch(url, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         showToast("Password updated successfully! Please login.", "success");
//         onClose();
//         navigate("/login"); // navigate after modal close
//         return;
//       }

//       const errorData = await response.json().catch(() => null);
//       throw new Error(
//         errorData?.message || `Request failed with status ${response.status}`
//       );
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-800">
//             Update Your Password
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-lg"
//               required
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           <div className="flex justify-end pt-4">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50"
//             >
//               {isLoading ? "Updating..." : "Update Password"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const PasswordModal = ({ userInfo, type, onClose }) => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState(""); // new currentPassword state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    console.log("Update password button clicked");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 1. Update user details API
      const userUpdateUrl = `${backendUrl}/api/User/${userInfo.userId}`;
      const userUpdatePayload = {
        userId: userInfo.userId,
        fullName: userInfo.fullName || userInfo.name || "",
        email: userInfo.email || "",
        role: userInfo.role || "",
        isActive: true,
        firstLogin: false,
      };

      const userResponse = await fetch(userUpdateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userUpdatePayload),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `User update failed with status ${userResponse.status}`
        );
      }

      // 2. Reset password API
      const resetPasswordUrl = `${backendUrl}/api/User/${userInfo.userId}/reset-password`;
      const resetPayload = { newPassword: newPassword };

      const resetResponse = await fetch(resetPasswordUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetPayload),
      });

      if (!resetResponse.ok) {
        const errorData = await resetResponse.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Password reset failed with status ${resetResponse.status}`
        );
      }

      // If both succeed:
      showToast(" Password reset successfully! Please login.", "success");
      onClose();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Update Your Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit1} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useURLParams();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const userSuggestions = [];

  useEffect(() => {
    const useridFromUrl = urlParams.get("userid");
    if (useridFromUrl) {
      setUser(useridFromUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !pass) {
      showToast("Please enter username and password", "error");
      return;
    }

    setIsLoading(true);

    try {
      const loginResponse = await fetch(`${backendUrl}/api/User/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();

        const userInfo = {
          id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
          name: loginData.fullName || user,
          role: loginData.Role,
          username: loginData.username || user.toLowerCase(),
          userId: loginData.userId,
          ...loginData,
        };

        console.log("Storing user info:", userInfo);
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
        setUserInfo(userInfo);

        if (loginData.firstLogin) {
          setShowPasswordModal(true);
        } else {
          if (loginData.Role === "User") {
            showToast(
              "Welcome User! Redirecting to timesheet portal...",
              "success"
            );
          } else if (loginData.Role === "Admin") {
            showToast(
              "Welcome Admin! Redirecting to admin portal...",
              "success"
            );
          } else {
            showToast("Welcome! Logging you in...", "success");
          }

          setTimeout(() => {
            navigate("/dashboard/timesheet");
          }, 1000);
        }
      } else {
        const errorData = await loginResponse.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          "Invalid credentials. Please check your username and password.";
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast(
        "Login failed. Please check your connection and try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUser(value);

    if (userSuggestions.length === 0) return;

    if (value.length > 0) {
      const filtered = userSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleUsernameFocus = () => {
    if (userSuggestions.length === 0) return;
    setFilteredSuggestions(userSuggestions);
    setShowSuggestions(true);
  };

  const handleUsernameBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const selectSuggestion = (suggestion) => {
    setUser(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setTimeout(() => {
      const passwordField = document.querySelector('input[type="password"]');
      if (passwordField) passwordField.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
      <div className="bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-8 w-full max-w-sm relative border border-slate-700">
        <div className="flex justify-center mb-8">
          <img src="/Columbus_Logo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
          Timesheet Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 pl-10 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
              placeholder="Username"
              value={user}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              required
              disabled={isLoading}
            />
            {showSuggestions &&
              filteredSuggestions.length > 0 &&
              !isLoading && (
                <div className="absolute top-full left-0 right-0 bg-slate-700 border border-slate-600 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto mt-1">
                  <div className="p-2 text-xs text-gray-400 font-medium border-b border-slate-600">
                    Suggestions:
                  </div>
                  {filteredSuggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="px-3 py-2 text-sm text-gray-200 hover:bg-slate-600 cursor-pointer transition-colors duration-150"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectSuggestion(suggestion);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 pl-10 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {showPasswordModal && user && (
          <PasswordModal
            userInfo={userInfo}
            type="update"
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
