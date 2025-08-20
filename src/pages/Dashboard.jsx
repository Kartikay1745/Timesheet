// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";

// export default function Dashboard() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-white">
//             <h1 className="text-3xl font-bold text-blue-900">Timesheet Portal</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import ManageGroupsTable from "../components/GroupsTable";

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
//           <ManageGroupsTable />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-white">
//             <h1 className="text-3xl font-bold text-blue-900">Timesheet Portal</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
//           <div className="flex-1 flex items-center justify-center bg-white">
//             <h1 className="text-3xl font-bold text-blue-900">Timesheet Portal</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";

// export default function Dashboard() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0 ml-56">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center p-8">
//             <div className="relative">
//               {/* Static background elements */}
//               <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-400 rounded-full opacity-5"></div>
//               <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-400 rounded-full opacity-5"></div>
              
//               {/* Main card */}
//               <div className="relative bg-white rounded-xl shadow-xl p-10 w-96 mx-auto hover:shadow-2xl transition-shadow duration-300 ease-out animate-fade-in-up border border-gray-100">
//                 {/* Card header with icon */}
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-6 shadow-lg">
//                     <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   </div>
                  
//                   {/* Title with gradient text */}
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-fade-in">
//                     Timesheet Portal
//                   </h1>
                  
//                   {/* Subtitle */}
//                   <p className="text-gray-600 text-base font-medium animate-fade-in delay-300">
//                     Welcome to your dashboard
//                   </p>
//                 </div>

//                 {/* Call to action */}
//                 <div className="text-center animate-fade-in delay-500">
//                   <p className="text-sm text-gray-500 mb-6">
//                     Select a menu item from the sidebar to get started
//                   </p>
                  
//                   {/* Simple static dots */}
//                   <div className="flex justify-center space-x-3">
//                     <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
//                     <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-60"></div>
//                     <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
//                   </div>
//                 </div>

//                 {/* Subtle static decorative elements */}
//                 <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-30"></div>
//                 <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-30"></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";

// export default function Dashboard() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0 ml-44">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center p-8">
//             <div className="relative">
//               {/* Static background elements */}
//               <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-400 rounded-full opacity-5"></div>
//               <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-400 rounded-full opacity-5"></div>
              
//               {/* Main card */}
//               <div className="relative bg-white rounded-xl shadow-xl p-10 w-96 mx-auto hover:shadow-2xl transition-shadow duration-300 ease-out animate-fade-in-up border border-gray-100">
//                 {/* Card header with icon */}
//                 <div className="text-center mb-8">
//                   <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-6 shadow-lg">
//                     <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   </div>
                  
//                   {/* Title with gradient text */}
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 animate-fade-in">
//                     Timesheet Portal
//                   </h1>
                  
//                   {/* Subtitle */}
//                   <p className="text-gray-600 text-base font-medium animate-fade-in delay-300">
//                     Welcome to your dashboard
//                   </p>
//                 </div>

//                 {/* Call to action */}
//                 <div className="text-center animate-fade-in delay-500">
//                   <p className="text-sm text-gray-500 mb-6">
//                     Select a menu item from the sidebar to get started
//                   </p>
                  
//                   {/* Simple static dots */}
//                   <div className="flex justify-center space-x-3">
//                     <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
//                     <div className="w-2 h-2 bg-indigo-400 rounded-full opacity-60"></div>
//                     <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
//                   </div>
//                 </div>

//                 {/* Subtle static decorative elements */}
//                 <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-30"></div>
//                 <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-30"></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
//           <div className="flex-1 flex items-center justify-center bg-white">
//             <h1 className="text-3xl font-bold text-blue-900">Timesheet Portal</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
//           <div className="flex-1 flex items-center justify-center bg-white">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm animate-fade-in">
//               Timesheet Portal
//             </h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainTable from "../components/MainTable";
import UserTable from "../components/UserTable";
import GroupsTable from "../components/GroupsTable";
import WorkFlow from "../components/WorkFlow";

export default function Dashboard() {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen min-h-0">
        {pathname === "/dashboard/timesheet" ? (
          <MainTable />
        ) : pathname === "/dashboard/users" ? (
          <UserTable />
        ) : pathname === "/dashboard/groups/manage-groups" ? (
          <GroupsTable />
        ) : pathname === "/dashboard/groups/manage-workflow" ? (
          <WorkFlow />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Timesheet Portal
                </h1>
                <p className="text-gray-500 text-sm">
                  Choose an option from the General menu
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
