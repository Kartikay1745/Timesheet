// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

// export default function Login() {
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const navigate = useNavigate();

//   const userSuggestions = ["john.doe", "jane.smith"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!user || !pass) {
//       showToast("Please enter username and password", "error");
//       return;
//     }

//     // Check for valid users and ALWAYS include username property
//     let userInfo = null;
//     if (user.toLowerCase() === "john.doe") {
//       userInfo = { 
//         id: "john", 
//         name: "John Doe", 
//         role: "admin", 
//         username: "john.doe"
//       };
//       showToast("Welcome Admin! Logging you in...", "success");
//     } else if (user.toLowerCase() === "jane.smith") {
//       userInfo = { 
//         id: "jane", 
//         name: "Jane Smith", 
//         role: "viewer", 
//         username: "jane.smith"
//       };
//       showToast("Welcome! Logging you in...", "success");
//     } else {
//       showToast(`Sorry, "${user}" is not a valid user. Try: john.doe or jane.smith`, "error");
//       return;
//     }

//     console.log('Storing user info:', userInfo);
    
//     // Store user info in localStorage and navigate
//     localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
//     // Delay navigation to show toast
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1000);
//   };

//   const handleUsernameFocus = () => {
//     setShowSuggestions(true);
//   };

//   const handleUsernameBlur = () => {
//     // Delay hiding to allow click on suggestion
//     setTimeout(() => setShowSuggestions(false), 150);
//   };

//   const selectSuggestion = (suggestion) => {
//     setUser(suggestion);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-950">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
//         <h2 className="text-xl font-bold text-center mb-6 text-blue-900">
//            Timesheet Portal
//         </h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="relative">
//             <input
//               className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
//               placeholder="Username"
//               value={user}
//               onChange={e => setUser(e.target.value)}
//               onFocus={handleUsernameFocus}
//               onBlur={handleUsernameBlur}
//               required
//             />
//             {showSuggestions && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
//                 <div className="p-2 text-xs text-gray-500 font-medium">Suggestions:</div>
//                 {userSuggestions.map((suggestion) => (
//                   <div
//                     key={suggestion}
//                     className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer border-t border-gray-100"
//                     onClick={() => selectSuggestion(suggestion)}
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
//           />
//           <button
//             className="bg-indigo-700 text-white font-semibold py-2 rounded text-sm hover:bg-indigo-800 transition"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

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

// export default function Login() {
//   const [user, setUser] = useState("");
//   const [pass, setPass] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const userSuggestions = ["john.doe", "jane.smith"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!user || !pass) {
//       showToast("Please enter username and password", "error");
//       return;
//     }

//     // Check for valid users and ALWAYS include username property
//     let userInfo = null;
//     if (user.toLowerCase() === "john.doe") {
//       userInfo = { 
//         id: "john", 
//         name: "John Doe", 
//         role: "admin", 
//         username: "john.doe"
//       };
//       showToast("Welcome Admin! Logging you in...", "success");
//     } else if (user.toLowerCase() === "jane.smith") {
//       userInfo = { 
//         id: "jane", 
//         name: "Jane Smith", 
//         role: "viewer", 
//         username: "jane.smith"
//       };
//       showToast("Welcome! Logging you in...", "success");
//     } else {
//       showToast(`Sorry, "${user}" is not a valid user. Try: john.doe or jane.smith`, "error");
//       return;
//     }

//     console.log('Storing user info:', userInfo);
    
//     // Store user info in localStorage and navigate
//     localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
//     // Delay navigation to show toast
//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1000);
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
//       e.preventDefault();
//       // You can add keyboard navigation here if needed
//     } else if (e.key === 'Escape') {
//       setShowSuggestions(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-950">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
//         <h2 className="text-xl font-bold text-center mb-6 text-blue-900">
//            Timesheet Portal
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
//             />
//             {showSuggestions && filteredSuggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto">
//                 <div className="p-2 text-xs text-gray-500 font-medium border-b">Suggestions:</div>
//                 {filteredSuggestions.map((suggestion, index) => (
//                   <div
//                     key={suggestion}
//                     className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
//                     onMouseDown={(e) => {
//                       e.preventDefault(); // Prevent input blur
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
//           />
//           <button
//             className="bg-indigo-700 text-white font-semibold py-2 rounded text-sm hover:bg-indigo-800 transition"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Simple toast function without container
const showToast = (message, type = 'info') => {
  const bgColor = type === 'success' ? '#4ade80' : 
                 type === 'error' ? '#ef4444' : 
                 type === 'warning' ? '#f59e0b' : '#3b82f6';
  
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Custom hook to get URL parameters
const useURLParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
};

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useURLParams();

  const userSuggestions = ["john.doe", "jane.smith"];

  // Effect to set username from URL parameter
  useEffect(() => {
    const useridFromUrl = urlParams.get('userid');
    if (useridFromUrl) {
      setUser(useridFromUrl);
    }
  }, [location.search]); // Re-run when URL changes

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user || !pass) {
      showToast("Please enter username and password", "error");
      return;
    }

    // Check for valid users and ALWAYS include username property
    let userInfo = null;
    if (user.toLowerCase() === "john.doe") {
      userInfo = { 
        id: "john", 
        name: "John Doe", 
        role: "admin", 
        username: "john.doe"
      };
      showToast("Welcome Admin! Logging you in...", "success");
    } else if (user.toLowerCase() === "jane.smith") {
      userInfo = { 
        id: "jane", 
        name: "Jane Smith", 
        role: "viewer", 
        username: "jane.smith"
      };
      showToast("Welcome! Logging you in...", "success");
    } else {
      showToast(`Sorry, "${user}" is not a valid user. Try: john.doe or jane.smith`, "error");
      return;
    }

    console.log('Storing user info:', userInfo);
    
    // Store user info in localStorage and navigate
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    // Delay navigation to show toast
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUser(value);

    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = userSuggestions.filter(suggestion =>
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
    // Show all suggestions when focused
    setFilteredSuggestions(userSuggestions);
    setShowSuggestions(true);
  };

  const handleUsernameBlur = () => {
    // Delay hiding to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const selectSuggestion = (suggestion) => {
    setUser(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    // Focus on password field after selection
    setTimeout(() => {
      const passwordField = document.querySelector('input[type="password"]');
      if (passwordField) passwordField.focus();
    }, 100);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // You can add keyboard navigation here if needed
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      // You can add keyboard navigation here if needed
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-950">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
        <h2 className="text-xl font-bold text-center mb-6 text-blue-900">
           Timesheet Portal
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              placeholder="Username"
              value={user}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              required
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto">
                <div className="p-2 text-xs text-gray-500 font-medium border-b">Suggestions:</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent input blur
                      selectSuggestion(suggestion);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e0e7ff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '';
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
          />
          <button
            className="bg-indigo-700 text-white font-semibold py-2 rounded text-sm hover:bg-indigo-800 transition"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
