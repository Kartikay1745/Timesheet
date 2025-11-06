// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet")
// //   );
// //   const [planningOpen, setPlanningOpen] = useState(
// //     pathname.includes("/dashboard/timesheet")
// //   );
// //   const [configurationOpen, setConfigurationOpen] = useState(false);
// //   const [selectedPage, setSelectedPage] = useState(pathname);

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(pathname.includes("/dashboard/timesheet"));
// //     setPlanningOpen(pathname.includes("/dashboard/timesheet"));
// //     setConfigurationOpen(false); // Always closed initially
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-48 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg transform transition-transform duration-300 md:translate-x-0 md:static md:w-48 z-40">
// //       <div
// //         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
// //         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //       >
// //         <span className="text-sm">General Menu</span>
// //         <Plus className="w-4 h-4" />
// //       </div>

// //       {generalMenuOpen && (
// //         <div className="ml-1 mt-2 space-y-1">
// //           <div
// //             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
// //             onClick={() => setPlanningOpen(!planningOpen)}
// //           >
// //             <span className="text-sm">Planning</span>
// //             {planningOpen ? (
// //               <ChevronDown className="w-3 h-3" />
// //             ) : (
// //               <ChevronRight className="w-3 h-3" />
// //             )}
// //           </div>

// //           {planningOpen && (
// //             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
// //               <Link
// //                 to="/dashboard/timesheet"
// //                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
// //                   selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
// //                 }`}
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   handleLinkClick("/dashboard/timesheet");
// //                 }}
// //               >
// //                 Timesheet
// //               </Link>
// //             </div>
// //           )}

// //           {/* <div
// //             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
// //             onClick={() => setConfigurationOpen(!configurationOpen)}
// //           >
// //             <span className="text-sm">Configuration</span>
// //             {configurationOpen ? (
// //               <ChevronDown className="w-3 h-3" />
// //             ) : (
// //               <ChevronRight className="w-3 h-3" />
// //             )}
// //           </div> */}

// //           {configurationOpen && (
// //             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
// //               {/* Empty as per your request */}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
// //       <div
// //         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
// //         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //       >
// //         <span className="text-sm">General Menu</span>
// //         <Plus className="w-4 h-4" />
// //       </div>
// //       {generalMenuOpen && (
// //         <div className="ml-1 mt-2 space-y-1">
// //           <Link
// //             to="/dashboard/timesheet"
// //             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
// //             }`}
// //             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //           >Timesheet</Link>
// //           <Link
// //             to="/dashboard/users"
// //             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
// //             }`}
// //             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //           >Users</Link>
// //           <div
// //             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
// //             onClick={() => setGroupsOpen(!groupsOpen)}
// //           >
// //             <span className="text-sm">Groups</span>
// //             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
// //           </div>
// //           {groupsOpen && (
// //             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
// //               <Link
// //                 to="/dashboard/groups/manage-groups"
// //                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
// //                 }`}
// //                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //               >Manage Groups</Link>
// //               <Link
// //                 to="/dashboard/groups/manage-workflow"
// //                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
// //                 }`}
// //                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //               >Manage Workflow</Link>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col">
// //       {/* Header */}
// //       <div className="p-4 border-b border-gray-100">
// //         <div className="flex items-center space-x-2">
// //           <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
// //             <Clock className="w-3 h-3 text-white" />
// //           </div>
// //           <div>
// //             <h2 className="text-sm font-semibold text-gray-900">TimeTracker</h2>
// //             <p className="text-xs text-gray-500">Dashboard</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Navigation */}
// //       <div className="flex-1 p-3 space-y-1">
// //         {/* General Menu Header */}
// //         <div
// //           className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-all duration-200 group"
// //           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Menu className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
// //             <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">General</span>
// //           </div>
// //           <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${generalMenuOpen ? 'rotate-90' : ''}`} />
// //         </div>

// //         {/* General Menu Items */}
// //         {generalMenuOpen && (
// //           <div className="ml-1 space-y-1 animate-fade-in">
// //             {/* Timesheet */}
// //             <Link
// //               to="/dashboard/timesheet"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
// //                 selectedPage === "/dashboard/timesheet"
// //                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
// //                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //             >
// //               <Clock className="w-3 h-3" />
// //               <span>Timesheet</span>
// //             </Link>

// //             {/* Users */}
// //             <Link
// //               to="/dashboard/users"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
// //                 selectedPage === "/dashboard/users"
// //                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
// //                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //             >
// //               <Users className="w-3 h-3" />
// //               <span>Users</span>
// //             </Link>

// //             {/* Groups Section */}
// //             <div className="space-y-1">
// //               <div
// //                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-200 group ${
// //                   pathname.includes("/dashboard/groups") ? "bg-gray-50" : "hover:bg-gray-50"
// //                 }`}
// //                 onClick={() => setGroupsOpen(!groupsOpen)}
// //               >
// //                 <div className="flex items-center space-x-2">
// //                   <Layers className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
// //                   <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">Groups</span>
// //                 </div>
// //                 <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${groupsOpen ? 'rotate-90' : ''}`} />
// //               </div>

// //               {/* Groups Submenu */}
// //               {groupsOpen && (
// //                 <div className="ml-5 space-y-1 animate-fade-in">
// //                   <Link
// //                     to="/dashboard/groups/manage-groups"
// //                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
// //                       selectedPage === "/dashboard/groups/manage-groups"
// //                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
// //                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //                     }`}
// //                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //                   >
// //                     Manage Groups
// //                   </Link>
// //                   <Link
// //                     to="/dashboard/groups/manage-workflow"
// //                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
// //                       selectedPage === "/dashboard/groups/manage-workflow"
// //                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
// //                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
// //                     }`}
// //                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //                   >
// //                     Manage Workflow
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
// //       <div
// //         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
// //         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //       >
// //         <span className="text-sm">General Menu</span>
// //         <Plus className="w-4 h-4" />
// //       </div>
// //       {generalMenuOpen && (
// //         <div className="ml-1 mt-2 space-y-1">
// //           <Link
// //             to="/dashboard/timesheet"
// //             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
// //             }`}
// //             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //           >Timesheet</Link>
// //           <Link
// //             to="/dashboard/users"
// //             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
// //             }`}
// //             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //           >Users</Link>
// //           <div
// //             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
// //             onClick={() => setGroupsOpen(!groupsOpen)}
// //           >
// //             <span className="text-sm">Groups</span>
// //             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
// //           </div>
// //           {groupsOpen && (
// //             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
// //               <Link
// //                 to="/dashboard/groups/manage-groups"
// //                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
// //                 }`}
// //                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //               >Manage Groups</Link>
// //               <Link
// //                 to="/dashboard/groups/manage-workflow"
// //                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
// //                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
// //                 }`}
// //                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //               >Manage Workflow</Link>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
// //       {/* Header */}
// //       {/* <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-700">
// //         <div className="flex items-center space-x-2">
// //           <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-md">
// //             <Clock className="w-3 h-3 text-blue-600" />
// //           </div>
// //           <div>
// //             <h2 className="text-sm font-bold text-white tracking-wide">TimeTracker</h2>
// //             <p className="text-xs text-blue-100 font-medium">Dashboard</p>
// //           </div>
// //         </div>
// //       </div> */}

// //       {/* Navigation */}
// //       <div className="flex-1 p-3 space-y-1">
// //         {/* General Menu Header */}
// //         <div
// //           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
// //           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
// //           </div>
// //           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
// //         </div>

// //         {/* General Menu Items */}
// //         {generalMenuOpen && (
// //           <div className="ml-1 space-y-1 animate-fade-in">
// //             {/* Timesheet */}
// //             <Link
// //               to="/dashboard/timesheet"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/timesheet"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //             >
// //               <Clock className="w-3 h-3" />
// //               <span>Timesheet</span>
// //             </Link>

// //             {/* Users */}
// //             <Link
// //               to="/dashboard/users"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/users"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //             >
// //               <Users className="w-3 h-3" />
// //               <span>Users</span>
// //             </Link>

// //             {/* Groups Section */}
// //             <div className="space-y-1">
// //               <div
// //                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
// //                   pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
// //                 }`}
// //                 onClick={() => setGroupsOpen(!groupsOpen)}
// //               >
// //                 <div className="flex items-center space-x-2">
// //                   <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //                   <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
// //                 </div>
// //                 <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
// //               </div>

// //               {/* Groups Submenu */}
// //               {groupsOpen && (
// //                 <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
// //                   <Link
// //                     to="/dashboard/groups/manage-groups"
// //                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                       selectedPage === "/dashboard/groups/manage-groups"
// //                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                     }`}
// //                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //                   >
// //                     Manage Groups
// //                   </Link>
// //                   <Link
// //                     to="/dashboard/groups/manage-workflow"
// //                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                       selectedPage === "/dashboard/groups/manage-workflow"
// //                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                     }`}
// //                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //                   >
// //                     Manage Workflow
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

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

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   const isUser = currentUser?.role === "User";
// //   const isAdmin = currentUser?.role === "Admin";

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
// //       {/* Navigation */}
// //       <div className="flex-1 p-3 space-y-1">
// //         {/* General Menu Header */}
// //         <div
// //           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
// //           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
// //           </div>
// //           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
// //         </div>

// //         {/* General Menu Items */}
// //         {generalMenuOpen && (
// //           <div className="ml-1 space-y-1 animate-fade-in">
// //             {/* Timesheet */}
// //             <Link
// //               to="/dashboard/timesheet"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/timesheet"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //             >
// //               <Clock className="w-3 h-3" />
// //               <span>Timesheet</span>
// //             </Link>

// //             {/* Users - Show different label based on role */}
// //             <Link
// //               to="/dashboard/users"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/users"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //             >
// //               <Users className="w-3 h-3" />
// //               <span>{isUser ? "Password Management" : "Users"}</span>
// //             </Link>

// //             {/* Groups Section - Only show for Admins */}
// //             {isAdmin && (
// //               <div className="space-y-1">
// //                 <div
// //                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
// //                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
// //                   }`}
// //                   onClick={() => setGroupsOpen(!groupsOpen)}
// //                 >
// //                   <div className="flex items-center space-x-2">
// //                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
// //                   </div>
// //                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
// //                 </div>

// //                 {/* Groups Submenu */}
// //                 {groupsOpen && (
// //                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
// //                     <Link
// //                       to="/dashboard/groups/manage-groups"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-groups"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //                     >
// //                       Manage Groups
// //                     </Link>
// //                     <Link
// //                       to="/dashboard/groups/manage-workflow"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-workflow"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //                     >
// //                       Manage Workflow
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

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

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   const isUser = currentUser?.role === "User";
// //   const isAdmin = currentUser?.role === "Admin";

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
// //       {/* Navigation */}
// //       <div className="flex-1 p-3 space-y-1">
// //         {/* General Menu Header */}
// //         <div
// //           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
// //           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
// //           </div>
// //           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
// //         </div>

// //         {/* General Menu Items */}
// //         {generalMenuOpen && (
// //           <div className="ml-1 space-y-1 animate-fade-in">
// //             {/* Timesheet */}
// //             <Link
// //               to="/dashboard/timesheet"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/timesheet"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //             >
// //               <Clock className="w-3 h-3" />
// //               <span>Timesheet</span>
// //             </Link>

// //             {/* Users - Show different label based on role */}
// //             <Link
// //               to="/dashboard/users"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/users"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //             >
// //               <Users className="w-3 h-3" />
// //               <span>{isUser ? "Password" : "Users"}</span>
// //             </Link>

// //             {/* Groups Section - Only show for Admins */}
// //             {isAdmin && (
// //               <div className="space-y-1">
// //                 <div
// //                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
// //                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
// //                   }`}
// //                   onClick={() => setGroupsOpen(!groupsOpen)}
// //                 >
// //                   <div className="flex items-center space-x-2">
// //                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
// //                   </div>
// //                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
// //                 </div>

// //                 {/* Groups Submenu */}
// //                 {groupsOpen && (
// //                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
// //                     <Link
// //                       to="/dashboard/groups/manage-groups"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-groups"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //                     >
// //                       Manage Groups
// //                     </Link>
// //                     <Link
// //                       to="/dashboard/groups/manage-workflow"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-workflow"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //                     >
// //                       Manage Workflow
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";
// // import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers, Download } from "lucide-react";

// // const Sidebar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   const [generalMenuOpen, setGeneralMenuOpen] = useState(
// //     pathname.includes("/dashboard/timesheet") ||
// //     pathname.includes("/dashboard/users") ||
// //     pathname.includes("/dashboard/groups") ||
// //     pathname.includes("/dashboard/export")
// //   );
// //   const [groupsOpen, setGroupsOpen] = useState(
// //     pathname.includes("/dashboard/groups")
// //   );
// //   const [selectedPage, setSelectedPage] = useState(pathname);

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

// //   useEffect(() => {
// //     setSelectedPage(pathname);
// //     setGeneralMenuOpen(
// //       pathname.includes("/dashboard/timesheet") ||
// //       pathname.includes("/dashboard/users") ||
// //       pathname.includes("/dashboard/groups") ||
// //       pathname.includes("/dashboard/export")
// //     );
// //     setGroupsOpen(pathname.includes("/dashboard/groups"));
// //   }, [pathname]);

// //   const handleLinkClick = (pagePath) => {
// //     if (selectedPage === pagePath) {
// //       setSelectedPage(null);
// //       navigate("/dashboard");
// //     } else {
// //       setSelectedPage(pagePath);
// //       navigate(pagePath);
// //     }
// //   };

// //   const isUser = currentUser?.role === "User";
// //   const isAdmin = currentUser?.role === "Admin";

// //   return (
// //     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
// //       {/* Navigation */}
// //       <div className="flex-1 p-3 space-y-1">
// //         {/* General Menu Header */}
// //         <div
// //           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
// //           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
// //         >
// //           <div className="flex items-center space-x-2">
// //             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
// //           </div>
// //           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
// //         </div>

// //         {/* General Menu Items */}
// //         {generalMenuOpen && (
// //           <div className="ml-1 space-y-1 animate-fade-in">
// //             {/* Timesheet */}
// //             <Link
// //               to="/dashboard/timesheet"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/timesheet"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
// //             >
// //               <Clock className="w-3 h-3" />
// //               <span>Timesheet</span>
// //             </Link>

// //             {/* Users - Show different label based on role */}
// //             <Link
// //               to="/dashboard/users"
// //               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                 selectedPage === "/dashboard/users"
// //                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //               }`}
// //               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
// //             >
// //               <Users className="w-3 h-3" />
// //               <span>{isUser ? "Password" : "Users"}</span>
// //             </Link>

// //             {/* Export - Only show for Admins */}
// //             {isAdmin && (
// //               <Link
// //                 to="/dashboard/export"
// //                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
// //                   selectedPage === "/dashboard/export"
// //                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                 }`}
// //                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/export"); }}
// //               >
// //                 <Download className="w-3 h-3" />
// //                 <span>Export</span>
// //               </Link>
// //             )}

// //             {/* Groups Section - Only show for Admins */}
// //             {isAdmin && (
// //               <div className="space-y-1">
// //                 <div
// //                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
// //                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
// //                   }`}
// //                   onClick={() => setGroupsOpen(!groupsOpen)}
// //                 >
// //                   <div className="flex items-center space-x-2">
// //                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
// //                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
// //                   </div>
// //                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
// //                 </div>

// //                 {/* Groups Submenu */}
// //                 {groupsOpen && (
// //                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
// //                     <Link
// //                       to="/dashboard/groups/manage-groups"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-groups"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
// //                     >
// //                       Manage Groups
// //                     </Link>
// //                     <Link
// //                       to="/dashboard/groups/manage-workflow"
// //                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
// //                         selectedPage === "/dashboard/groups/manage-workflow"
// //                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
// //                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
// //                       }`}
// //                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
// //                     >
// //                       Manage Workflow
// //                     </Link>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // Stable version //
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// // 1. Import the 'Info' icon
// import { Menu, Clock, Users, Layers, Download, Info } from "lucide-react";

// /**
//  * A reusable sidebar item component.
//  * It adapts its style based on selection and collapsed state.
//  */
// const SidebarItem = ({ icon, text, to, isSelected, isCollapsed, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className={`relative flex items-center space-x-3 text-xs px-3 py-2.5 rounded-lg transition-all duration-300 group ${
//       isSelected
//         ? "bg-blue-600 text-white font-semibold shadow-md" // Selected style (dark blue)
//         // : "text-sky-800 hover:bg-sky-200 hover:text-sky-900" // Default style (sky theme)
//         : "text-gray-200 hover:bg-gray-700 hover:text-white" // Default style (dark theme)
//     }`}
//   >
//     {/* Icon (always visible) */}
//     <div className="flex-shrink-0">{icon}</div>

//     {/* Text (hides when collapsed) */}
//     <span
//       className={`transition-opacity whitespace-nowrap duration-200 ${
//         isCollapsed ? "opacity-0 hidden" : "opacity-100"
//       }`}
//     >
//       {text}
//     </span>

//     {/* Tooltip (shows on hover when collapsed) */}
//     {isCollapsed && (
//       <div className="absolute left-full rounded-md px-2 py-1 ml-4 bg-gray-800 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
//         {text}
//       </div>
//     )}
//   </Link>
// );

// /**
//  * The main Sidebar component.
//  * It now accepts 'sidebarOpen' and 'setSidebarOpen' props to manage its state.
//  */
// const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   // Effect to load current user from localStorage
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

//   // Effect to update the selected page when the route changes
//   useEffect(() => {
//     setSelectedPage(pathname);
//   }, [pathname]);

//   // Handles navigation, preventing re-navigation to the same page
//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   // Helper to create the onClick handler for links
//   const createLinkHandler = (path) => (e) => {
//     e.preventDefault();
//     handleLinkClick(path);
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     // <div
//     //   className={`fixed inset-y-0 left-0 bg-sky-100 text-sky-900 shadow-lg z-40 flex flex-col border-r border-sky-200 transition-all duration-300 ${
//     //     sidebarOpen ? 'w-56' : 'w-20' // Dynamic width
//     //   }`}
//     // >
//     <div
//       className={`fixed inset-y-0 left-0 bg-slate-800 text-gray-200 shadow-lg z-40 flex flex-col border-r border-slate-700 transition-all duration-300 ${
//         sidebarOpen ? 'w-56' : 'w-20' // Dynamic width
//       }`}
//     >
//       {/* Sidebar Header with Toggle Button (won't scroll) */}
//       <div className="flex items-center justify-between p-4 h-16 border-b border-slate-700 flex-shrink-0">
//         <span
//           className={`text-lg font-bold text-white tracking-wide transition-opacity whitespace-nowrap ${
//             sidebarOpen ? "opacity-100" : "opacity-0 hidden"
//           }`}
//         >
//           Timesheets
//         </span>
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="p-2 rounded-lg text-gray-400 hover:bg-slate-700 transition-colors"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Navigation Links (will scroll if content overflows) */}
//       <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
//         <SidebarItem
//           icon={<Clock className="w-4 h-4" />}
//           text="Timesheet"
//           to="/dashboard/timesheet"
//           isSelected={selectedPage === "/dashboard/timesheet"}
//           isCollapsed={!sidebarOpen}
//           onClick={createLinkHandler("/dashboard/timesheet")}
//         />

//         {isAdmin && (
//           <SidebarItem
//             icon={<Download className="w-4 h-4" />}
//             text="Export"
//             to="/dashboard/export"
//             isSelected={selectedPage === "/dashboard/export"}
//             isCollapsed={!sidebarOpen}
//             onClick={createLinkHandler("/dashboard/export")}
//           />
//         )}

//         {/* <SidebarItem
//           icon={<Users className="w-4 h-4" />}
//           text={isUser ? "Password" : "Users"}
//           to="/dashboard/users"
//           isSelected={selectedPage === "/dashboard/users"}
//           isCollapsed={!sidebarOpen}
//           onClick={createLinkHandler("/dashboard/users")}
//         /> */}

//         {/* Admin-only Group links */}
//         {/* {isAdmin && (
//           <>
//             <SidebarItem
//               icon={<Layers className="w-4 h-4" />}
//               text="Manage Groups"
//               to="/dashboard/groups/manage-groups"
//               isSelected={selectedPage === "/dashboard/groups/manage-groups"}
//               isCollapsed={!sidebarOpen}
//               onClick={createLinkHandler("/dashboard/groups/manage-groups")}
//             />
//             <SidebarItem
//               icon={<Layers className="w-4 h-4" />}
//               text="Manage Workflow"
//               to="/dashboard/groups/manage-workflow"
//               isSelected={selectedPage === "/dashboard/groups/manage-workflow"}
//               isCollapsed={!sidebarOpen}
//               onClick={createLinkHandler("/dashboard/groups/manage-workflow")}
//             />
//           </>
//         )} */}

//         {/* "About" item moved here, no line above it */}
//         <SidebarItem
//           icon={<Info className="w-4 h-4" />}
//           text="About"
//           to="/dashboard/about"
//           isSelected={selectedPage === "/dashboard/about"}
//           isCollapsed={!sidebarOpen}
//           onClick={createLinkHandler("/dashboard/about")}
//         />
//       </nav>

//       {/* Footer section with line and "Powered by" text (won't scroll) */}
//       <div className="pt-3 pb-3 px-3 mt-auto border-t border-slate-700 flex-shrink-0">
//         <span className={`text-xs text-white transition-opacity duration-200 text-center block ${!sidebarOpen ? 'hidden' : 'opacity-100'}`}>
//           Powered by Revolve
//         </span>
//       </div>

//     </div>
//   );
// };

// export default Sidebar;

/// stable version //
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet")
//   );
//   const [planningOpen, setPlanningOpen] = useState(
//     pathname.includes("/dashboard/timesheet")
//   );
//   const [configurationOpen, setConfigurationOpen] = useState(false);
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(pathname.includes("/dashboard/timesheet"));
//     setPlanningOpen(pathname.includes("/dashboard/timesheet"));
//     setConfigurationOpen(false); // Always closed initially
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-48 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg transform transition-transform duration-300 md:translate-x-0 md:static md:w-48 z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>

//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//             onClick={() => setPlanningOpen(!planningOpen)}
//           >
//             <span className="text-sm">Planning</span>
//             {planningOpen ? (
//               <ChevronDown className="w-3 h-3" />
//             ) : (
//               <ChevronRight className="w-3 h-3" />
//             )}
//           </div>

//           {planningOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/timesheet"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
//                   selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleLinkClick("/dashboard/timesheet");
//                 }}
//               >
//                 Timesheet
//               </Link>
//             </div>
//           )}

//           {/* <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//             onClick={() => setConfigurationOpen(!configurationOpen)}
//           >
//             <span className="text-sm">Configuration</span>
//             {configurationOpen ? (
//               <ChevronDown className="w-3 h-3" />
//             ) : (
//               <ChevronRight className="w-3 h-3" />
//             )}
//           </div> */}

//           {configurationOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               {/* Empty as per your request */}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>
//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <Link
//             to="/dashboard/timesheet"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//           >Timesheet</Link>
//           <Link
//             to="/dashboard/users"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//           >Users</Link>
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//             onClick={() => setGroupsOpen(!groupsOpen)}
//           >
//             <span className="text-sm">Groups</span>
//             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
//           </div>
//           {groupsOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/groups/manage-groups"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//               >Manage Groups</Link>
//               <Link
//                 to="/dashboard/groups/manage-workflow"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//               >Manage Workflow</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-100">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//             <Clock className="w-3 h-3 text-white" />
//           </div>
//           <div>
//             <h2 className="text-sm font-semibold text-gray-900">TimeTracker</h2>
//             <p className="text-xs text-gray-500">Dashboard</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-all duration-200 group"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
//             <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
//                 selectedPage === "/dashboard/timesheet"
//                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
//                 selectedPage === "/dashboard/users"
//                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>Users</span>
//             </Link>

//             {/* Groups Section */}
//             <div className="space-y-1">
//               <div
//                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-200 group ${
//                   pathname.includes("/dashboard/groups") ? "bg-gray-50" : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => setGroupsOpen(!groupsOpen)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Layers className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
//                   <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">Groups</span>
//                 </div>
//                 <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${groupsOpen ? 'rotate-90' : ''}`} />
//               </div>

//               {/* Groups Submenu */}
//               {groupsOpen && (
//                 <div className="ml-5 space-y-1 animate-fade-in">
//                   <Link
//                     to="/dashboard/groups/manage-groups"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
//                       selectedPage === "/dashboard/groups/manage-groups"
//                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                   >
//                     Manage Groups
//                   </Link>
//                   <Link
//                     to="/dashboard/groups/manage-workflow"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
//                       selectedPage === "/dashboard/groups/manage-workflow"
//                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                   >
//                     Manage Workflow
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>
//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <Link
//             to="/dashboard/timesheet"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//           >Timesheet</Link>
//           <Link
//             to="/dashboard/users"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//           >Users</Link>
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//             onClick={() => setGroupsOpen(!groupsOpen)}
//           >
//             <span className="text-sm">Groups</span>
//             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
//           </div>
//           {groupsOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/groups/manage-groups"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//               >Manage Groups</Link>
//               <Link
//                 to="/dashboard/groups/manage-workflow"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//               >Manage Workflow</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Header */}
//       {/* <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-700">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-md">
//             <Clock className="w-3 h-3 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-sm font-bold text-white tracking-wide">TimeTracker</h2>
//             <p className="text-xs text-blue-100 font-medium">Dashboard</p>
//           </div>
//         </div>
//       </div> */}

//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>Users</span>
//             </Link>

//             {/* Groups Section */}
//             <div className="space-y-1">
//               <div
//                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                   pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                 }`}
//                 onClick={() => setGroupsOpen(!groupsOpen)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                   <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                 </div>
//                 <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//               </div>

//               {/* Groups Submenu */}
//               {groupsOpen && (
//                 <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                   <Link
//                     to="/dashboard/groups/manage-groups"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                       selectedPage === "/dashboard/groups/manage-groups"
//                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                   >
//                     Manage Groups
//                   </Link>
//                   <Link
//                     to="/dashboard/groups/manage-workflow"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                       selectedPage === "/dashboard/groups/manage-workflow"
//                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                   >
//                     Manage Workflow
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password Management" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers, Download } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups") ||
//     pathname.includes("/dashboard/export")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups") ||
//       pathname.includes("/dashboard/export")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users"
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Export - Only show for Admins */}
//             {isAdmin && (
//               <Link
//                 to="/dashboard/export"
//                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                   selectedPage === "/dashboard/export"
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/export"); }}
//               >
//                 <Download className="w-3 h-3" />
//                 <span>Export</span>
//               </Link>
//             )}

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow"
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold"
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// Stable version //
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// 1. Import the 'Info' icon
import {
  Menu,
  Clock,
  Users,
  Layers,
  Download,
  Info,
  Settings,
  User,
  Settings2,
  User2,
  CheckCircle,
  ImportIcon,
} from "lucide-react";

/**
 * A reusable sidebar item component.
 * It adapts its style based on selection and collapsed state.
 */
const SidebarItem = ({ icon, text, to, isSelected, isCollapsed, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`relative flex items-center space-x-3 text-xs px-3 py-2.5 rounded-lg transition-all duration-300 group ${
      isSelected
        ? "bg-blue-600 text-white font-semibold shadow-md" // Selected style (dark blue)
        : // : "text-sky-800 hover:bg-sky-200 hover:text-sky-900" // Default style (sky theme)
          "text-gray-200 hover:bg-gray-700 hover:text-white" // Default style (dark theme)
    }`}
  >
    {/* Icon (always visible) */}
    <div className="flex-shrink-0">{icon}</div>

    {/* Text (hides when collapsed) */}
    <span
      className={`transition-opacity whitespace-nowrap duration-200 ${
        isCollapsed ? "opacity-0 hidden" : "opacity-100"
      }`}
    >
      {text}
    </span>

    {/* Tooltip (shows on hover when collapsed) */}
    {isCollapsed && (
      <div className="absolute left-full rounded-md px-2 py-1 ml-4 bg-gray-800 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50">
        {text}
      </div>
    )}
  </Link>
);

/**
 * The main Sidebar component.
 * It now accepts 'sidebarOpen' and 'setSidebarOpen' props to manage its state.
 */
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState(pathname);

  // Effect to load current user from localStorage
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
  }, []);

  // Effect to update the selected page when the route changes
  useEffect(() => {
    setSelectedPage(pathname);
  }, [pathname]);

  // Handles navigation, preventing re-navigation to the same page
  // const handleLinkClick = (pagePath) => {
  //   if (selectedPage === pagePath) {
  //     setSelectedPage(null);
  //     navigate("/dashboard");
  //   } else {
  //     setSelectedPage(pagePath);
  //     navigate(pagePath);
  //   }
  // };
  const handleLinkClick = (pagePath) => {
    if (selectedPage !== pagePath) {
      setSelectedPage(pagePath);
      navigate(pagePath);
    }
  };

  // Helper to create the onClick handler for links
  const createLinkHandler = (path) => (e) => {
    e.preventDefault();
    handleLinkClick(path);
  };

  const isUser = currentUser?.role === "User";
  const isAdmin = currentUser?.role === "Admin";

  return (
    // <div
    //   className={`fixed inset-y-0 left-0 bg-sky-100 text-sky-900 shadow-lg z-40 flex flex-col border-r border-sky-200 transition-all duration-300 ${
    //     sidebarOpen ? 'w-56' : 'w-20' // Dynamic width
    //   }`}
    // >
    <div
      className={`fixed inset-y-0 left-0 bg-slate-800 text-gray-200 shadow-lg z-40 flex flex-col border-r border-slate-700 transition-all duration-300 ${
        sidebarOpen ? "w-56" : "w-20" // Dynamic width
      }`}
    >
      {/* Sidebar Header with Toggle Button (won't scroll) */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-slate-700 flex-shrink-0">
        <span
          className={`text-lg font-bold text-white tracking-wide transition-opacity whitespace-nowrap ${
            sidebarOpen ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          Timesheets
        </span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-400 hover:bg-slate-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links (will scroll if content overflows) */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {/* <SidebarItem
          icon={<Clock className="w-4 h-4" />}
          text="Timesheet"
          to="/dashboard/timesheet"
          isSelected={selectedPage === "/dashboard/timesheet"}
          isCollapsed={!sidebarOpen}
          onClick={createLinkHandler("/dashboard/timesheet")}
        /> */}

        {!isUser && (
          <SidebarItem
            icon={<Clock className="w-4 h-4" />}
            text="Timesheet"
            to="/dashboard/timesheet"
            isSelected={selectedPage === "/dashboard/timesheet"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/timesheet")}
          />
        )}

        {(isAdmin || isUser) && (
          <SidebarItem
            icon={<CheckCircle className="w-4 h-4" />}
            text="Approvals"
            to="/dashboard/approvals"
            isSelected={selectedPage === "/dashboard/approvals"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/approvals")}
          />
        )}

        {isAdmin && (
          <SidebarItem
            icon={<Download className="w-4 h-4" />}
            text="Export"
            to="/dashboard/export"
            isSelected={selectedPage === "/dashboard/export"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/export")}
          />
        )}

        {isAdmin && (
          <SidebarItem
            icon={<Clock className="w-4 h-4" />}
            text="Timesheet History"
            to="/dashboard/timesheethistory"
            isSelected={selectedPage === "/dashboard/timesheethistory"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/timesheethistory")}
          />
        )}

        {isAdmin && (
          <SidebarItem
            icon={<Settings2 className="w-4 h-4" />}
            text="Settings"
            to="/dashboard/settings"
            isSelected={selectedPage === "/dashboard/settings"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/settings")}
          />
        )}

        {isAdmin && (
          <SidebarItem
            icon={<User2 className="w-4 h-4" />}
            text="Users"
            to="/dashboard/usertable"
            isSelected={selectedPage === "/dashboard/usertable"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/usertable")}
          />
        )}

        {isAdmin && (
          <SidebarItem
            icon={<ImportIcon className="w-4 h-4" />}
            text="Import"
            to="/dashboard/import"
            isSelected={selectedPage === "/dashboard/import"}
            isCollapsed={!sidebarOpen}
            onClick={createLinkHandler("/dashboard/import")}
          />
        )}
        {/* <SidebarItem
          icon={<Users className="w-4 h-4" />}
          text={isUser ? "Password" : "Users"}
          to="/dashboard/users"
          isSelected={selectedPage === "/dashboard/users"}
          isCollapsed={!sidebarOpen}
          onClick={createLinkHandler("/dashboard/users")}
        /> */}

        {/* Admin-only Group links */}
        {/* {isAdmin && (
          <>
            <SidebarItem
              icon={<Layers className="w-4 h-4" />}
              text="Manage Groups"
              to="/dashboard/groups/manage-groups"
              isSelected={selectedPage === "/dashboard/groups/manage-groups"}
              isCollapsed={!sidebarOpen}
              onClick={createLinkHandler("/dashboard/groups/manage-groups")}
            />
            <SidebarItem
              icon={<Layers className="w-4 h-4" />}
              text="Manage Workflow"
              to="/dashboard/groups/manage-workflow"
              isSelected={selectedPage === "/dashboard/groups/manage-workflow"}
              isCollapsed={!sidebarOpen}
              onClick={createLinkHandler("/dashboard/groups/manage-workflow")}
            />
          </>
        )} */}

        {/* "About" item moved here, no line above it */}
        <SidebarItem
          icon={<Info className="w-4 h-4" />}
          text="About"
          to="/dashboard/about"
          isSelected={selectedPage === "/dashboard/about"}
          isCollapsed={!sidebarOpen}
          onClick={createLinkHandler("/dashboard/about")}
        />
      </nav>

      {/* Footer section with line and "Powered by" text (won't scroll) */}
      <div className="pt-3 pb-3 px-3 mt-auto border-t border-slate-700 flex-shrink-0">
        <span
          className={`text-xs text-white transition-opacity duration-200 text-center block ${
            !sidebarOpen ? "hidden" : "opacity-100"
          }`}
        >
          Powered by Revolve
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
