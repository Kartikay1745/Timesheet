// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Save, LogOut } from "lucide-react";

// const Settings = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);

//   const [settingsData, setSettingsData] = useState([]);
//   const [allowRedirect, setAllowRedirect] = useState(false);
//   const [email, setEmail] = useState("");
//   const [mail, setMail] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username =
//             parsedUser.id === "john"
//               ? "john.doe"
//               : parsedUser.id === "jane"
//               ? "jane.smith"
//               : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         alert("Session expired. Please login again.");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }

//     // Load setting
//     const saved = localStorage.getItem("allowRedirect");
//     if (saved !== null) {
//       setAllowRedirect(saved === "true");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     // Replace with your actual API endpoint
//     fetch("/api/get-settings")
//       .then((res) => res.json())
//       .then((data) => {
//         // Assuming data is an array like [{ name: "string", value: "string" }, ...]
//         const redirectItem = data.find(
//           (item) => item.name === "allow_redirect"
//         );
//         const mailItem = data.find((item) => item.name === "mail");
//         if (redirectItem) {
//           setAllowRedirect(redirectItem.value === "true");
//         }
//         if (mailItem) {
//           setMail(mailItem.value);
//         }
//       })
//       .catch((err) => console.error("Error fetching settings:", err));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     setUserLoaded(false);
//     alert("Logged out successfully");
//     navigate("/");
//   };

//   const handleSave = () => {
//     setLoading(true);
//     const payload = [
//       { name: "allow_redirect", value: allowRedirect.toString() },
//       { name: "mail", value: mail },
//     ];

//     fetch("/api/save-settings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((response) => {
//         alert("Settings saved successfully");
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error saving settings:", err);
//         alert("Failed to save");
//         setLoading(false);
//       });
//   };

//   if (!userLoaded || !currentUser) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start p-6">
//         <div className="w-full flex flex-col items-center">
//           {/* Header (keep this as-is, replace text/color if needed) */}
//           <div className="w-full flex justify-between items-center mb-4 px-4 py-3 bg-gray-800 border-b border-gray-200 shadow-sm rounded-t-lg">
//             {/* Left: Welcome Message (1/3 width) */}
//             <div className="w-1/3">
//               <h1 className="text-xl font-semibold text-white">
//                 Welcome,{" "}
//                 <span className="font-bold text-blue-600">
//                   {currentUser?.name}
//                 </span>
//               </h1>
//             </div>

//             {/* Center: Logo (1/3 width) */}
//             <div className="w-1/3 flex justify-center">
//               {/* !!! IMPORTANT !!!
//                 1. Change 'src' to your actual logo path (e.g., "/my-logo.png").
//                 2. Change 'bg-slate-800' to the color you want behind your white logo.
//               */}
//               <div className="bg-slate-800 rounded-md p-2 shadow-inner">
//                 <img
//                   src="/Columbus_Logo.png"
//                   alt="Logo"
//                   className="h-10" /* Adjust height as needed */
//                 />
//               </div>
//             </div>

//             {/* Right: Logout Button (1/3 width) */}
//             <div className="w-1/3 flex justify-end">
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-red-200 transition-colors shadow-sm"
//               >
//                 <LogOut size={14} />
//                 Logout
//               </button>
//             </div>
//           </div>
//           {/* Simplified setting */}
//           <div className="w-full max-w-lg flex flex-col gap-6 bg-white border rounded shadow-sm py-8 px-8 mt-8">
//             <div className="flex items-center justify-between">
//               <label htmlFor="allowRedirect" className="text-gray-700 text-lg">
//                 Allow Email Redirect
//               </label>
//               <input
//                 id="allowRedirect"
//                 type="checkbox"
//                 checked={allowRedirect}
//                 onChange={(e) => setAllowRedirect(e.target.checked)}
//                 className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 "
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <label
//                 htmlFor="redirectEmailTo"
//                 className="text-gray-700 text-lg"
//               >
//                 Redirect Email To
//               </label>
//               <input
//                 id="redirectEmailTo"
//                 type="email"
//                 // value={redirectEmailTo}
//                 onChange={(e) => setRedirectEmailTo(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 // disabled={!allowRedirect}
//                 placeholder="user@domain.com"
//               />
//             </div>
//             <button
//               onClick={handleSave}
//               disabled={loading}
//               className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
//             >
//               <Save size={18} /> Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  // Existing states and logic (not changed)...

  const [loading, setLoading] = useState(false);

  // New states for email redirect config
  const [allowEmailRedirect, setAllowEmailRedirect] = useState(false);
  const [redirectEmailTo, setRedirectEmailTo] = useState("");
  // Store both value and id for each config to pass id on save

  const [allowEmailRedirectId, setAllowEmailRedirectId] = useState(0);

  const [redirectEmailToId, setRedirectEmailToId] = useState(0);

  useEffect(() => {
    // Existing user session loading logic
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (!parsedUser.username) {
          parsedUser.username =
            parsedUser.id === "john"
              ? "john.doe"
              : parsedUser.id === "jane"
              ? "jane.smith"
              : parsedUser.id;
        }
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        alert("Session expired. Please login again.");
        navigate("/");
      }
    } else {
      navigate("/");
    }

    // Fetch config values from API on mount
    fetch("https://timesheet-latest.onrender.com/api/ConfigValues")
      .then((res) => res.json())
      .then((data) => {
        // Map the response data to the local states
        const redirectConfig = data.find(
          (item) => item.name === "ALLOW_EMAIL_REDIRECT"
        );
        const emailConfig = data.find(
          (item) => item.name === "REDIRECT_EMAIL_TO"
        );

        if (redirectConfig) {
          setAllowEmailRedirect(redirectConfig.value === "true");
          setAllowEmailRedirectId(redirectConfig.id);
        }
        if (emailConfig) {
          setRedirectEmailTo(emailConfig.value);
          setRedirectEmailToId(emailConfig.id);
        }
      })
      .catch((err) => {
        console.error("Error fetching config values:", err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    // alert("Logged out successfully");
    navigate("/");
  };

  const handleSave = () => {
    setLoading(true);
    const nowISOString = new Date().toISOString();
    // Build payload with current config values.
    // id is not sent because it may be auto-generated by backend or keep as 0
    // Replace id with real id if needed by your backend.
    const payload = [
      {
        name: "ALLOW_EMAIL_REDIRECT",
        value: allowEmailRedirect.toString(),
        createdAt: nowISOString,
        id: allowEmailRedirectId || 0,
      },
      {
        name: "REDIRECT_EMAIL_TO",
        value: redirectEmailTo,
        createdAt: nowISOString,
        id: redirectEmailToId || 0,
      },
    ];

    fetch("https://timesheet-latest.onrender.com/api/ConfigValues", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        alert("Settings saved successfully");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save settings");
        setLoading(false);
      });
  };

  if (!userLoaded || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full flex flex-col items-center">
          {/* Header (keep this as-is, replace text/color if needed) */}
          <div className="w-full flex justify-between items-center mb-4 px-4 py-3 bg-gray-800 border-b border-gray-200 shadow-sm rounded-t-lg">
            {/* Left: Welcome Message (1/3 width) */}
            <div className="w-1/3">
              <h1 className="text-xl font-semibold text-white">
                Welcome,{" "}
                <span className="font-bold text-blue-600">
                  {currentUser?.name}
                </span>
              </h1>
            </div>
            {/* Center: Logo (1/3 width) */}
            <div className="w-1/3 flex justify-center">
              <div className="bg-slate-800 rounded-md p-2 shadow-inner">
                <img
                  src="/Columbus_Logo.png"
                  alt="Logo"
                  className="h-10" /* Adjust height as needed */
                />
              </div>
            </div>

            {/* Right: Logout Button (1/3 width) */}
            <div className="w-1/3 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-red-200 transition-colors shadow-sm"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>

          <div className="w-full  flex flex-col gap-4 bg-white border rounded shadow-sm py-6 px-6 mt-8 ">
            {/* Allow Email Redirect Checkbox - inline with label */}
            <div className="flex items-center">
              <label
                htmlFor="allowEmailRedirect"
                className="text-gray-700 text-md     mr-2"
              >
                Allow Email Redirect :
              </label>
              <input
                id="allowEmailRedirect"
                type="checkbox"
                checked={allowEmailRedirect}
                onChange={(e) => setAllowEmailRedirect(e.target.checked)}
                className="w-4 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            {/* Redirect Email To Input */}
            <div className="flex items-center">
              <label
                htmlFor="redirectEmailTo"
                className="mr-4 text-gray-700 text-md whitespace-nowrap"
              >
                Redirect Email To :
              </label>
              <input
                id="redirectEmailTo"
                type="email"
                value={redirectEmailTo}
                onChange={(e) => setRedirectEmailTo(e.target.value)}
                className="flex-1 px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Small Save Button aligned left */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-1.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-sm"
              >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
