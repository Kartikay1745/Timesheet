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
