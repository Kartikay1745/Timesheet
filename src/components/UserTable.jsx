// components/UserTable.jsx
import React from "react";

const userRows = [
  { userId: "U001", userName: "Rahul Kumar", vendorName: "Infosys" },
  { userId: "U002", userName: "Sneha Patel", vendorName: "TCS" },
  { userId: "U003", userName: "Ryan Jose", vendorName: "Wipro" },
];

export default function UserTable() {
  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        <div className="w-full flex flex-col items-center">
          <div className="border border-gray-300 rounded bg-white shadow"
               style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)", minWidth: 300, padding: "0.5rem", minHeight: "220px", maxHeight: "70vh", overflow: "hidden", marginBottom: "0px" }}>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "50vh",
                minHeight: "70px",
                width: "100%",
              }}
            >
              <table style={{ borderCollapse: "collapse", fontSize: "12px", minWidth: "650px", width: "max-content" }}>
                <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 10 }}>
                  <tr>
                    <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 160, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>User ID</th>
                    <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 180, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>User Name</th>
                    <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 180, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>Vendor Name</th>
                  </tr>
                </thead>
                <tbody>
                  {userRows.map((row, idx) => (
                    <tr key={row.userId}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white",
                      }}>
                      <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 160 }}>{row.userId}</td>
                      <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 180 }}>{row.userName}</td>
                      <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 180 }}>{row.vendorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="flex gap-8 justify-start items-center mt-3 pt-2 border-t border-gray-200 w-full pl-2">
              <span className="text-xs font-medium text-blue-700">Users</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
