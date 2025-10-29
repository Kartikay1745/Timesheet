// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const showToast = (message, type = 'info') => {
// //   const bgColor = type === 'success' ? '#4ade80'
// //     : type === 'error' ? '#ef4444'
// //       : type === 'warning' ? '#f59e0b' : '#3b82f6';
// //   const toast = document.createElement('div');
// //   toast.textContent = message;
// //   toast.style.cssText = `
// //     position: fixed; top: 20px; right: 20px; z-index: 9999;
// //     background: ${bgColor}; color: white; padding: 12px 16px;
// //     border-radius: 6px; font-size: 14px; max-width: 300px;
// //     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
// //   `;
// //   document.body.appendChild(toast);
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, 1000);
// // };

// // const columnsExport = [
// //   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // export default function ExportTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const columns = columnsExport;
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;

// //   // Format date to MM/DD/YYYY with leading zeros
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date.getTime())) return dateString;
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${month}/${day}/${year}`;
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   const formatHours = (hours) => {
// //     if (!hours && hours !== 0) return '';
// //     const numHours = parseFloat(hours);
// //     if (isNaN(numHours)) return hours;
// //     return numHours.toFixed(2);
// //   };

// //   const getSortedRows = (rowsToSort) => {
// //     return [...rowsToSort].sort((a, b) => {
// //       let aDate = new Date(a.originalDate || a["Date"]);
// //       let bDate = new Date(b.originalDate || b["Date"]);
// //       if (isNaN(aDate.getTime())) aDate = new Date(0);
// //       if (isNaN(bDate.getTime())) bDate = new Date(0);
// //       if (aDate.getTime() !== bDate.getTime()) {
// //         return aDate.getTime() - bDate.getTime();
// //       }
// //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
// //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
// //       return aEmpId.localeCompare(bEmpId);
// //     });
// //   };

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         if (!parsedUser.username) {
// //           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
// //             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
// //         }
// //         setCurrentUser(parsedUser);
// //         setUserLoaded(true);
// //       } catch (error) {
// //         showToast("Session expired. Please login again.", "error");
// //         navigate("/");
// //       }
// //     } else {
// //       navigate("/");
// //     }
// //   }, [navigate]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) {
// //       fetchExportData();
// //     }
// //   }, [userLoaded, currentUser]);

// //   const fetchExportData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=Approved`;
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `export-${index}`,
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
// //     } catch (error) {
// //       showToast('Failed to load export data. Please check your connection.', "error");
// //       setRows([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getFilteredRows = () => {
// //     let filtered = rows;
// //     if (!Array.isArray(filtered)) return [];
// //     if (searchDate) {
// //       filtered = filtered.filter(row => {
// //         const rowDateString = row["Date"];
// //         if (!rowDateString) return false;
// //         try {
// //           const rowDate = new Date(row.originalDate || rowDateString);
// //           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
// //           const selectedDate = new Date(searchDate);
// //           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
// //           return formattedRowDate === formattedSelectedDate;
// //         } catch {
// //           return false;
// //         }
// //       });
// //     }
// //     if (searchEmployeeId.trim()) {
// //       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
// //     }
// //     return getSortedRows(filtered);
// //   };

// //   const filteredRows = getFilteredRows();

// //   const handleLogout = () => {
// //     localStorage.removeItem('currentUser');
// //     setCurrentUser(null);
// //     setUserLoaded(false);
// //     showToast("Logged out successfully", "info");
// //     navigate("/");
// //   };

// //   const handleExportClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     try {
// //       setActionLoading(true);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
// //         method: 'GET',
// //       });
// //       if (response.ok) {
// //         const blob = await response.blob();
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = `exported_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
// //         document.body.appendChild(a);
// //         a.click();
// //         a.remove();
// //         window.URL.revokeObjectURL(url);
// //         showToast('Export completed successfully', 'success');
// //       } else {
// //         showToast('Export failed', 'error');
// //       }
// //     } catch (error) {
// //       showToast('Export failed', 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Only show for Admin
// //   if (!userLoaded || !currentUser) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading user session...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
// //             <div className="text-center">
// //               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
// //               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading export data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Export Approved Timesheets
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Filters - Same as Timesheet */}
// //           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <div className="flex gap-2">
// //               <input
// //                 type="date"
// //                 value={searchDate}
// //                 onChange={e => setSearchDate(e.target.value)}
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 title="Filter by Date (MM-DD-YYYY Format)"
// //               />
// //               <input
// //                 type="text"
// //                 value={searchEmployeeId}
// //                 onChange={e => setSearchEmployeeId(e.target.value)}
// //                 placeholder="Employee ID"
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>

// //           <div
// //             className="border border-gray-300 rounded bg-white shadow"
// //             style={{
// //               marginLeft: 24,
// //               marginRight: 24,
// //               width: "calc(100vw - 220px)",
// //               maxWidth: "none",
// //               minWidth: 300,
// //               padding: "0.5rem",
// //               minHeight: "350px",
// //               maxHeight: "calc(100vh - 180px)",
// //               overflow: "hidden",
// //               marginBottom: "20px",
// //               display: "flex",
// //               flexDirection: "column"
// //             }}
// //           >
// //             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
// //               <div className="flex gap-2">
// //                 <span className="text-sm text-gray-600 self-center">
// //                   Showing {filteredRows.length} approved timesheet{filteredRows.length !== 1 ? 's' : ''}
// //                 </span>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleExportClick}
// //                   type="button"
// //                   disabled={actionLoading || filteredRows.length === 0}
// //                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {actionLoading ? "Processing..." : "Export CSV"}
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div
// //               style={{
// //                 overflowX: "auto",
// //                 overflowY: "auto",
// //                 maxHeight: "calc(100vh - 180px)",
// //                 minHeight: "200px",
// //                 width: "100%",
// //                 flex: 1,
// //                 border: "1px solid #e5e7eb",
// //                 borderRadius: "4px"
// //               }}
// //             >
// //               <table
// //                 style={{
// //                   borderCollapse: "collapse",
// //                   fontSize: "11px",
// //                   minWidth: `${minTableWidth}px`,
// //                   width: "max-content"
// //                 }}
// //               >
// //                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
// //                   <tr>
// //                     {columns.map(col => (
// //                       <th
// //                         key={col}
// //                         style={{
// //                           border: "1px solid #d1d5db",
// //                           padding: "8px",
// //                           fontSize: "12px",
// //                           minWidth: `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
// //                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {row[col] || ""}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={columns.length}
// //                         style={{
// //                           textAlign: "center",
// //                           padding: "20px",
// //                           fontStyle: "italic",
// //                           color: "#666"
// //                         }}>
// //                         No approved data available for export
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";


// // const showToast = (message, type = 'info') => {
// //   const bgColor = type === 'success' ? '#4ade80'
// //     : type === 'error' ? '#ef4444'
// //       : type === 'warning' ? '#f59e0b' : '#3b82f6';
// //   const toast = document.createElement('div');
// //   toast.textContent = message;
// //   toast.style.cssText = `
// //     position: fixed; top: 20px; right: 20px; z-index: 9999;
// //     background: ${bgColor}; color: white; padding: 12px 16px;
// //     border-radius: 6px; font-size: 14px; max-width: 300px;
// //     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
// //   `;
// //   document.body.appendChild(toast);
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, 1000);
// // };


// // const columnsExport = [
// //   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];


// // export default function ExportTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [selectAll, setSelectAll] = useState(false);


// //   const isAdmin = currentUser?.role === "Admin";
// //   const columns = ['Select', ...columnsExport];
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;


// //   // Format date to MM/DD/YYYY with leading zeros
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date.getTime())) return dateString;
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${month}/${day}/${year}`;
// //     } catch {
// //       return dateString;
// //     }
// //   };


// //   const formatHours = (hours) => {
// //     if (!hours && hours !== 0) return '';
// //     const numHours = parseFloat(hours);
// //     if (isNaN(numHours)) return hours;
// //     return numHours.toFixed(2);
// //   };


// //   const getSortedRows = (rowsToSort) => {
// //     return [...rowsToSort].sort((a, b) => {
// //       let aDate = new Date(a.originalDate || a["Date"]);
// //       let bDate = new Date(b.originalDate || b["Date"]);
// //       if (isNaN(aDate.getTime())) aDate = new Date(0);
// //       if (isNaN(bDate.getTime())) bDate = new Date(0);
// //       if (aDate.getTime() !== bDate.getTime()) {
// //         return aDate.getTime() - bDate.getTime();
// //       }
// //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
// //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
// //       return aEmpId.localeCompare(bEmpId);
// //     });
// //   };


// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         if (!parsedUser.username) {
// //           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
// //             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
// //         }
// //         setCurrentUser(parsedUser);
// //         setUserLoaded(true);
// //       } catch (error) {
// //         showToast("Session expired. Please login again.", "error");
// //         navigate("/");
// //       }
// //     } else {
// //       navigate("/");
// //     }
// //   }, [navigate]);


// //   useEffect(() => {
// //     if (userLoaded && currentUser) {
// //       fetchExportData();
// //     }
// //   }, [userLoaded, currentUser]);


// //   const fetchExportData = async () => {
// //     if (!userLoaded || !currentUser) return;
// //     try {
// //       setLoading(true);
// //       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
// //       const response = await fetch(apiUrl, { 
// //         method: 'GET', 
// //         headers: { 'Content-Type': 'application/json' } 
// //       });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `export-${index}`,
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
// //     } catch (error) {
// //       showToast('Failed to load export data. Please check your connection.', "error");
// //       setRows([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   const getFilteredRows = () => {
// //     let filtered = rows;
// //     if (!Array.isArray(filtered)) return [];
// //     if (searchDate) {
// //       filtered = filtered.filter(row => {
// //         const rowDateString = row["Date"];
// //         if (!rowDateString) return false;
// //         try {
// //           const rowDate = new Date(row.originalDate || rowDateString);
// //           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
// //           const selectedDate = new Date(searchDate);
// //           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
// //           return formattedRowDate === formattedSelectedDate;
// //         } catch {
// //           return false;
// //         }
// //       });
// //     }
// //     if (searchEmployeeId.trim()) {
// //       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
// //     }
// //     return getSortedRows(filtered);
// //   };


// //   const filteredRows = getFilteredRows();


// //   // Handle individual row selection
// //   const handleRowSelect = (rowId) => {
// //     const newSelectedRows = new Set(selectedRows);
// //     if (newSelectedRows.has(rowId)) {
// //       newSelectedRows.delete(rowId);
// //     } else {
// //       newSelectedRows.add(rowId);
// //     }
// //     setSelectedRows(newSelectedRows);
// //     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
// //   };


// //   // Handle select all
// //   const handleSelectAll = () => {
// //     if (selectAll) {
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //     } else {
// //       const allRowIds = new Set(filteredRows.map(row => row.id));
// //       setSelectedRows(allRowIds);
// //       setSelectAll(true);
// //     }
// //   };


// //   // Update selectAll state when filteredRows change
// //   useEffect(() => {
// //     if (filteredRows.length > 0) {
// //       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
// //       setSelectAll(allSelected);
// //     } else {
// //       setSelectAll(false);
// //     }
// //   }, [filteredRows, selectedRows]);


// //   const handleLogout = () => {
// //     localStorage.removeItem('currentUser');
// //     setCurrentUser(null);
// //     setUserLoaded(false);
// //     showToast("Logged out successfully", "info");
// //     navigate("/");
// //   };


// //   const handleExportClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedRows.size === 0) {
// //       showToast('Please select at least one timesheet to export', 'warning');
// //       return;
// //     }
    
// //     try {
// //       setActionLoading(true);
      
// //       // Get selected row data
// //       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));
      
// //       // Convert to CSV
// //       const csvHeaders = columnsExport.join(',');
// //       const csvRows = selectedData.map(row => 
// //         columnsExport.map(col => {
// //           const value = row[col] || '';
// //           // Escape commas and quotes in CSV
// //           return `"${String(value).replace(/"/g, '""')}"`;
// //         }).join(',')
// //       );
      
// //       const csvContent = [csvHeaders, ...csvRows].join('\n');
// //       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       window.URL.revokeObjectURL(url);
      
// //       showToast(`Exported ${selectedRows.size} selected timesheets successfully`, 'success');
// //     } catch (error) {
// //       showToast('Export failed', 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   // Only show for Admin
// //   if (!userLoaded || !currentUser) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading user session...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
// //             <div className="text-center">
// //               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
// //               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading export data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Export Approved Timesheets
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Filters */}
// //           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <div className="flex gap-2">
// //               <input
// //                 type="date"
// //                 value={searchDate}
// //                 onChange={e => setSearchDate(e.target.value)}
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 title="Filter by Date (MM-DD-YYYY Format)"
// //               />
// //               <input
// //                 type="text"
// //                 value={searchEmployeeId}
// //                 onChange={e => setSearchEmployeeId(e.target.value)}
// //                 placeholder="Employee ID"
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>


// //           <div
// //             className="border border-gray-300 rounded bg-white shadow"
// //             style={{
// //               marginLeft: 24,
// //               marginRight: 24,
// //               width: "calc(100vw - 220px)",
// //               maxWidth: "none",
// //               minWidth: 300,
// //               padding: "0.5rem",
// //               minHeight: "350px",
// //               maxHeight: "calc(100vh - 180px)",
// //               overflow: "hidden",
// //               marginBottom: "20px",
// //               display: "flex",
// //               flexDirection: "column"
// //             }}
// //           >
// //             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleExportClick}
// //                   type="button"
// //                   disabled={actionLoading || selectedRows.size === 0}
// //                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div
// //               style={{
// //                 overflowX: "auto",
// //                 overflowY: "auto",
// //                 maxHeight: "calc(100vh - 180px)",
// //                 minHeight: "200px",
// //                 width: "100%",
// //                 flex: 1,
// //                 border: "1px solid #e5e7eb",
// //                 borderRadius: "4px"
// //               }}
// //             >
// //               <table
// //                 style={{
// //                   borderCollapse: "collapse",
// //                   fontSize: "11px",
// //                   minWidth: `${minTableWidth}px`,
// //                   width: "max-content"
// //                 }}
// //               >
// //                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
// //                   <tr>
// //                     {columns.map((col, index) => (
// //                       <th
// //                         key={col}
// //                         style={{
// //                           border: "1px solid #d1d5db",
// //                           padding: "8px",
// //                           fontSize: "12px",
// //                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === 'Select' ? (
// //                           <input
// //                             type="checkbox"
// //                             checked={selectAll}
// //                             onChange={handleSelectAll}
// //                             className="cursor-pointer"
// //                             title="Select All"
// //                           />
// //                         ) : (
// //                           col
// //                         )}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
// //                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
// //                       >
// //                         {columns.map((col, colIndex) => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === 'Select' ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={selectedRows.has(row.id)}
// //                                 onChange={() => handleRowSelect(row.id)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : (
// //                               row[col] || ""
// //                             )}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={columns.length}
// //                         style={{
// //                           textAlign: "center",
// //                           padding: "20px",
// //                           fontStyle: "italic",
// //                           color: "#666"
// //                         }}>
// //                         No approved data available for export
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";


// // const showToast = (message, type = 'info') => {
// //   const bgColor = type === 'success' ? '#4ade80'
// //     : type === 'error' ? '#ef4444'
// //       : type === 'warning' ? '#f59e0b' : '#3b82f6';
// //   const toast = document.createElement('div');
// //   toast.textContent = message;
// //   toast.style.cssText = `
// //     position: fixed; top: 20px; right: 20px; z-index: 9999;
// //     background: ${bgColor}; color: white; padding: 12px 16px;
// //     border-radius: 6px; font-size: 14px; max-width: 300px;
// //     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
// //   `;
// //   document.body.appendChild(toast);
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, 1000);
// // };


// // const columnsExport = [
// //   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];


// // export default function ExportTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [selectAll, setSelectAll] = useState(false);


// //   const isAdmin = currentUser?.role === "Admin";
// //   const columns = ['Select', ...columnsExport];
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;


// //   // Format date to MM/DD/YYYY with leading zeros
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date.getTime())) return dateString;
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${month}/${day}/${year}`;
// //     } catch {
// //       return dateString;
// //     }
// //   };


// //   const formatHours = (hours) => {
// //     if (!hours && hours !== 0) return '';
// //     const numHours = parseFloat(hours);
// //     if (isNaN(numHours)) return hours;
// //     return numHours.toFixed(2);
// //   };


// //   const getSortedRows = (rowsToSort) => {
// //     return [...rowsToSort].sort((a, b) => {
// //       let aDate = new Date(a.originalDate || a["Date"]);
// //       let bDate = new Date(b.originalDate || b["Date"]);
// //       if (isNaN(aDate.getTime())) aDate = new Date(0);
// //       if (isNaN(bDate.getTime())) bDate = new Date(0);
// //       if (aDate.getTime() !== bDate.getTime()) {
// //         return aDate.getTime() - bDate.getTime();
// //       }
// //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
// //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
// //       return aEmpId.localeCompare(bEmpId);
// //     });
// //   };


// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         if (!parsedUser.username) {
// //           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
// //             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
// //         }
// //         setCurrentUser(parsedUser);
// //         setUserLoaded(true);
// //       } catch (error) {
// //         showToast("Session expired. Please login again.", "error");
// //         navigate("/");
// //       }
// //     } else {
// //       navigate("/");
// //     }
// //   }, [navigate]);


// //   useEffect(() => {
// //     if (userLoaded && currentUser) {
// //       fetchExportData();
// //     }
// //   }, [userLoaded, currentUser]);


// //   const fetchExportData = async () => {
// //     if (!userLoaded || !currentUser) return;
// //     try {
// //       setLoading(true);
// //       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
// //       const response = await fetch(apiUrl, { 
// //         method: 'GET', 
// //         headers: { 'Content-Type': 'application/json' } 
// //       });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `export-${index}`,
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
// //     } catch (error) {
// //       showToast('Failed to load export data. Please check your connection.', "error");
// //       setRows([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   const getFilteredRows = () => {
// //     let filtered = rows;
// //     if (!Array.isArray(filtered)) return [];
// //     if (searchDate) {
// //       filtered = filtered.filter(row => {
// //         const rowDateString = row["Date"];
// //         if (!rowDateString) return false;
// //         try {
// //           const rowDate = new Date(row.originalDate || rowDateString);
// //           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
// //           const selectedDate = new Date(searchDate);
// //           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
// //           return formattedRowDate === formattedSelectedDate;
// //         } catch {
// //           return false;
// //         }
// //       });
// //     }
// //     if (searchEmployeeId.trim()) {
// //       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
// //     }
// //     return getSortedRows(filtered);
// //   };


// //   const filteredRows = getFilteredRows();


// //   // Handle individual row selection
// //   const handleRowSelect = (rowId) => {
// //     const newSelectedRows = new Set(selectedRows);
// //     if (newSelectedRows.has(rowId)) {
// //       newSelectedRows.delete(rowId);
// //     } else {
// //       newSelectedRows.add(rowId);
// //     }
// //     setSelectedRows(newSelectedRows);
// //     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
// //   };


// //   // Handle select all
// //   const handleSelectAll = () => {
// //     if (selectAll) {
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //     } else {
// //       const allRowIds = new Set(filteredRows.map(row => row.id));
// //       setSelectedRows(allRowIds);
// //       setSelectAll(true);
// //     }
// //   };


// //   // Update selectAll state when filteredRows change
// //   useEffect(() => {
// //     if (filteredRows.length > 0) {
// //       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
// //       setSelectAll(allSelected);
// //     } else {
// //       setSelectAll(false);
// //     }
// //   }, [filteredRows, selectedRows]);


// //   const handleLogout = () => {
// //     localStorage.removeItem('currentUser');
// //     setCurrentUser(null);
// //     setUserLoaded(false);
// //     showToast("Logged out successfully", "info");
// //     navigate("/");
// //   };


// //   const handleExportClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedRows.size === 0) {
// //       showToast('Please select at least one timesheet to export', 'warning');
// //       return;
// //     }
    
// //     try {
// //       setActionLoading(true);
      
// //       // Get the full CSV from the export API
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         }
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Export API failed with status: ${response.status}`);
// //       }
      
// //       const fullCsvData = await response.text();
      
// //       // Get selected employee IDs for filtering
// //       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));
// //       const selectedEmployeeIds = new Set(selectedData.map(row => row["Employee ID"]));
      
// //       // Parse and filter the CSV data
// //       const csvLines = fullCsvData.split('\n').filter(line => line.trim());
// //       const filteredCsvLines = [];
      
// //       csvLines.forEach(line => {
// //         const columns = line.split(',');
// //         if (columns.length > 1) {
// //           const employeeId = columns[1].trim(); // Employee ID is in the second column
// //           if (selectedEmployeeIds.has(employeeId)) {
// //             filteredCsvLines.push(line);
// //           }
// //         }
// //       });
      
// //       if (filteredCsvLines.length === 0) {
// //         showToast('No matching data found in export for selected items', 'warning');
// //         return;
// //       }
      
// //       // Create the filtered CSV content
// //       const filteredCsvContent = filteredCsvLines.join('\n');
      
// //       // Download the filtered CSV
// //       const blob = new Blob([filteredCsvContent], { type: 'text/csv;charset=utf-8;' });
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       window.URL.revokeObjectURL(url);
      
// //       showToast(`Exported ${filteredCsvLines.length} selected timesheet records successfully`, 'success');
// //     } catch (error) {
// //       console.error('Export error:', error);
// //       showToast('Export failed. Please check your connection and try again.', 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   // Only show for Admin
// //   if (!userLoaded || !currentUser) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading user session...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
// //             <div className="text-center">
// //               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
// //               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading export data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Export Approved Timesheets
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Filters */}
// //           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <div className="flex gap-2">
// //               <input
// //                 type="date"
// //                 value={searchDate}
// //                 onChange={e => setSearchDate(e.target.value)}
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 title="Filter by Date (MM-DD-YYYY Format)"
// //               />
// //               <input
// //                 type="text"
// //                 value={searchEmployeeId}
// //                 onChange={e => setSearchEmployeeId(e.target.value)}
// //                 placeholder="Employee ID"
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>


// //           <div
// //             className="border border-gray-300 rounded bg-white shadow"
// //             style={{
// //               marginLeft: 24,
// //               marginRight: 24,
// //               width: "calc(100vw - 220px)",
// //               maxWidth: "none",
// //               minWidth: 300,
// //               padding: "0.5rem",
// //               minHeight: "350px",
// //               maxHeight: "calc(100vh - 180px)",
// //               overflow: "hidden",
// //               marginBottom: "20px",
// //               display: "flex",
// //               flexDirection: "column"
// //             }}
// //           >
// //             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleExportClick}
// //                   type="button"
// //                   disabled={actionLoading || selectedRows.size === 0}
// //                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div
// //               style={{
// //                 overflowX: "auto",
// //                 overflowY: "auto",
// //                 maxHeight: "calc(100vh - 180px)",
// //                 minHeight: "200px",
// //                 width: "100%",
// //                 flex: 1,
// //                 border: "1px solid #e5e7eb",
// //                 borderRadius: "4px"
// //               }}
// //             >
// //               <table
// //                 style={{
// //                   borderCollapse: "collapse",
// //                   fontSize: "11px",
// //                   minWidth: `${minTableWidth}px`,
// //                   width: "max-content"
// //                 }}
// //               >
// //                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
// //                   <tr>
// //                     {columns.map((col, index) => (
// //                       <th
// //                         key={col}
// //                         style={{
// //                           border: "1px solid #d1d5db",
// //                           padding: "8px",
// //                           fontSize: "12px",
// //                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === 'Select' ? (
// //                           <input
// //                             type="checkbox"
// //                             checked={selectAll}
// //                             onChange={handleSelectAll}
// //                             className="cursor-pointer"
// //                             title="Select All"
// //                           />
// //                         ) : (
// //                           col
// //                         )}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
// //                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
// //                       >
// //                         {columns.map((col, colIndex) => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === 'Select' ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={selectedRows.has(row.id)}
// //                                 onChange={() => handleRowSelect(row.id)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : (
// //                               row[col] || ""
// //                             )}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={columns.length}
// //                         style={{
// //                           textAlign: "center",
// //                           padding: "20px",
// //                           fontStyle: "italic",
// //                           color: "#666"
// //                         }}>
// //                         No approved data available for export
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // const showToast = (message, type = 'info') => {
// //   const bgColor = type === 'success' ? '#4ade80'
// //     : type === 'error' ? '#ef4444'
// //       : type === 'warning' ? '#f59e0b' : '#3b82f6';
// //   const toast = document.createElement('div');
// //   toast.textContent = message;
// //   toast.style.cssText = `
// //     position: fixed; top: 20px; right: 20px; z-index: 9999;
// //     background: ${bgColor}; color: white; padding: 12px 16px;
// //     border-radius: 6px; font-size: 14px; max-width: 300px;
// //     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
// //   `;
// //   document.body.appendChild(toast);
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, 1000);
// // };

// // const columnsExport = [
// //   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // export default function ExportTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const [selectAll, setSelectAll] = useState(false);

// //   const isAdmin = currentUser?.role === "Admin";
// //   const columns = ['Select', ...columnsExport];
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;

// //   // Format date to MM/DD/YYYY with leading zeros
// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date.getTime())) return dateString;
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${month}/${day}/${year}`;
// //     } catch {
// //       return dateString;
// //     }
// //   };

// //   const formatHours = (hours) => {
// //     if (!hours && hours !== 0) return '';
// //     const numHours = parseFloat(hours);
// //     if (isNaN(numHours)) return hours;
// //     return numHours.toFixed(2);
// //   };

// //   const getSortedRows = (rowsToSort) => {
// //     return [...rowsToSort].sort((a, b) => {
// //       let aDate = new Date(a.originalDate || a["Date"]);
// //       let bDate = new Date(b.originalDate || b["Date"]);
// //       if (isNaN(aDate.getTime())) aDate = new Date(0);
// //       if (isNaN(bDate.getTime())) bDate = new Date(0);
// //       if (aDate.getTime() !== bDate.getTime()) {
// //         return aDate.getTime() - bDate.getTime();
// //       }
// //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
// //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
// //       return aEmpId.localeCompare(bEmpId);
// //     });
// //   };

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         if (!parsedUser.username) {
// //           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
// //             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
// //         }
// //         setCurrentUser(parsedUser);
// //         setUserLoaded(true);
// //       } catch (error) {
// //         showToast("Session expired. Please login again.", "error");
// //         navigate("/");
// //       }
// //     } else {
// //       navigate("/");
// //     }
// //   }, [navigate]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser) {
// //       fetchExportData();
// //     }
// //   }, [userLoaded, currentUser]);

// //   const fetchExportData = async () => {
// //     if (!userLoaded || !currentUser) return;
// //     try {
// //       setLoading(true);
// //       // fetch all approved timesheets
// //       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `export-${index}`,
// //         originalDate: item.timesheetDate,
// //         originalItem: item, // Store original item for POST payload
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //     } catch (error) {
// //       showToast('Failed to load export data. Please check your connection.', "error");
// //       setRows([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getFilteredRows = () => {
// //     let filtered = rows;
// //     if (!Array.isArray(filtered)) return [];
// //     if (searchDate) {
// //       filtered = filtered.filter(row => {
// //         const rowDateString = row["Date"];
// //         if (!rowDateString) return false;
// //         try {
// //           const rowDate = new Date(row.originalDate || rowDateString);
// //           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
// //           const selectedDate = new Date(searchDate);
// //           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
// //           return formattedRowDate === formattedSelectedDate;
// //         } catch {
// //           return false;
// //         }
// //       });
// //     }
// //     if (searchEmployeeId.trim()) {
// //       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
// //     }
// //     return getSortedRows(filtered);
// //   };

// //   const filteredRows = getFilteredRows();

// //   // Handle individual row selection
// //   const handleRowSelect = (rowId) => {
// //     const newSelectedRows = new Set(selectedRows);
// //     if (newSelectedRows.has(rowId)) {
// //       newSelectedRows.delete(rowId);
// //     } else {
// //       newSelectedRows.add(rowId);
// //     }
// //     setSelectedRows(newSelectedRows);
// //     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
// //   };

// //   // Handle select all
// //   const handleSelectAll = () => {
// //     if (selectAll) {
// //       setSelectedRows(new Set());
// //       setSelectAll(false);
// //     } else {
// //       const allRowIds = new Set(filteredRows.map(row => row.id));
// //       setSelectedRows(allRowIds);
// //       setSelectAll(true);
// //     }
// //   };

// //   useEffect(() => {
// //     if (filteredRows.length > 0) {
// //       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
// //       setSelectAll(allSelected);
// //     } else {
// //       setSelectAll(false);
// //     }
// //   }, [filteredRows, selectedRows]);

// //   const handleLogout = () => {
// //     localStorage.removeItem('currentUser');
// //     setCurrentUser(null);
// //     setUserLoaded(false);
// //     showToast("Logged out successfully", "info");
// //     navigate("/");
// //   };

// //   // Export selected rows with POST request containing selected data
// //   const handleExportClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;

// //     if (selectedRows.size === 0) {
// //       showToast('Please select at least one timesheet to export', 'warning');
// //       return;
// //     }

// //     try {
// //       setActionLoading(true);

// //       // Get selected row data
// //       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));
      
// //       if (selectedData.length === 0) {
// //         showToast('No selected data to export', 'warning');
// //         return;
// //       }

// //       // Prepare payload with selected row data
// //       const payload = {
// //         selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
// //         exportRequest: {
// //           requestedBy: currentUser?.username || currentUser?.id || 'admin',
// //           requestDate: new Date().toISOString(),
// //           totalRecords: selectedData.length,
// //           filters: {
// //             date: searchDate || null,
// //             employeeId: searchEmployeeId || null
// //           }
// //         }
// //       };

// //       console.log(JSON.stringify(payload));

// //       // Send POST request with selected data
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload.selectedTimesheets)
// //       });

// //       if (response.ok) {
// //         // Check if response is CSV (text) or blob
// //         const contentType = response.headers.get('content-type');
        
// //         if (contentType && contentType.includes('text/csv')) {
// //           // Server returns CSV directly
// //           const csvData = await response.text();
          
// //           const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
// //           const url = window.URL.createObjectURL(blob);
// //           const a = document.createElement('a');
// //           a.href = url;
// //           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
// //           document.body.appendChild(a);
// //           a.click();
// //           a.remove();
// //           window.URL.revokeObjectURL(url);
          
// //           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
// //         } else {
// //           // Server doesn't return CSV, generate client-side
// //           const csvHeaders = columnsExport.join(',');
// //           const csvRows = selectedData.map(row => 
// //             columnsExport.map(col => {
// //               const value = row[col] || '';
// //               return `"${String(value).replace(/"/g, '""')}"`;
// //             }).join(',')
// //           );
// //           const csvContent = [csvHeaders, ...csvRows].join('\n');

// //           const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //           const url = window.URL.createObjectURL(blob);
// //           const a = document.createElement('a');
// //           a.href = url;
// //           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
// //           document.body.appendChild(a);
// //           a.click();
// //           a.remove();
// //           window.URL.revokeObjectURL(url);

// //           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
// //         }
// //       } else {
// //         throw new Error(`Export API failed with status: ${response.status}`);
// //       }

// //     } catch (error) {
// //       console.error('Export error:', error);
// //       showToast('Export failed. Please try again.', 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Only show for Admin
// //   if (!userLoaded || !currentUser) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading user session...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
// //             <div className="text-center">
// //               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
// //               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading export data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Export Approved Timesheets
// //             </h1>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Filters */}
// //           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <div className="flex gap-2">
// //               <input
// //                 type="date"
// //                 value={searchDate}
// //                 onChange={e => setSearchDate(e.target.value)}
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 title="Filter by Date (MM-DD-YYYY Format)"
// //               />
// //               <input
// //                 type="text"
// //                 value={searchEmployeeId}
// //                 onChange={e => setSearchEmployeeId(e.target.value)}
// //                 placeholder="Employee ID"
// //                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //               />
// //             </div>
// //           </div>

// //           <div
// //             className="border border-gray-300 rounded bg-white shadow"
// //             style={{
// //               marginLeft: 24,
// //               marginRight: 24,
// //               width: "calc(100vw - 220px)",
// //               maxWidth: "none",
// //               minWidth: 300,
// //               padding: "0.5rem",
// //               minHeight: "350px",
// //               maxHeight: "calc(100vh - 180px)",
// //               overflow: "hidden",
// //               marginBottom: "20px",
// //               display: "flex",
// //               flexDirection: "column"
// //             }}
// //           >
// //             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={handleExportClick}
// //                   type="button"
// //                   disabled={actionLoading || selectedRows.size === 0}
// //                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
// //                 </button>
// //               </div>
// //             </div>
            
// //             <div
// //               style={{
// //                 overflowX: "auto",
// //                 overflowY: "auto",
// //                 maxHeight: "calc(100vh - 180px)",
// //                 minHeight: "200px",
// //                 width: "100%",
// //                 flex: 1,
// //                 border: "1px solid #e5e7eb",
// //                 borderRadius: "4px"
// //               }}
// //             >
// //               <table
// //                 style={{
// //                   borderCollapse: "collapse",
// //                   fontSize: "11px",
// //                   minWidth: `${minTableWidth}px`,
// //                   width: "max-content"
// //                 }}
// //               >
// //                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
// //                   <tr>
// //                     {columns.map((col, index) => (
// //                       <th
// //                         key={col}
// //                         style={{
// //                           border: "1px solid #d1d5db",
// //                           padding: "8px",
// //                           fontSize: "12px",
// //                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === 'Select' ? (
// //                           <input
// //                             type="checkbox"
// //                             checked={selectAll}
// //                             onChange={handleSelectAll}
// //                             className="cursor-pointer"
// //                             title="Select All"
// //                           />
// //                         ) : (
// //                           col
// //                         )}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
// //                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
// //                       >
// //                         {columns.map((col, colIndex) => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === 'Select' ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={selectedRows.has(row.id)}
// //                                 onChange={() => handleRowSelect(row.id)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : (
// //                               row[col] || ""
// //                             )}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={columns.length}
// //                         style={{
// //                           textAlign: "center",
// //                           padding: "20px",
// //                           fontStyle: "italic",
// //                           color: "#666"
// //                         }}>
// //                         No approved data available for export
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { LogOut, X } from 'lucide-react'; // <-- ADD THIS LINE
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";

// // Toast notification utility (keep your implementation)
// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
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
//   }, 1000);
// };

// const columnsExport = [
//   "Date", "Employee ID","Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type","RLSE Number", 
// "PO Number",
// "PO Line Number",
//   "Hours", "Seq No", "Comment",
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = ['Select', ...columnsExport];
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Get sorted rows with arrow
//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];
//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;
//         if (sortConfig.key === 'Date') {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === 'Employee ID') {
//           aVal = String(a["Employee ID"] || '').toLowerCase();
//           bVal = String(b["Employee ID"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Name') {
//           aVal = String(a["Name"] || '').toLowerCase();
//           bVal = String(b["Name"] || '').toLowerCase();
//         }
//         if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//           if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//           return 0;
//         }
//         return 0;
//       });
//     } else {
//       // Default sorting when no sort is applied
//       sorted.sort((a, b) => {
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return aDate.getTime() - bDate.getTime();
//         }
//         const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//         const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }
//     return sorted;
//   };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name'].includes(key)) return;
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name'].includes(columnKey)) return null;
//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser) return;
//     try {
//       setLoading(true);
//       // fetch all approved timesheets
//       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         originalDate: item.timesheetDate,
//         originalItem: item, // Store original item for POST payload
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",

//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         // "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     // Filter by date string (local, robust to timezone)
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDate = new Date(row.originalDate);
//         const selectedDate = new Date(searchDate + 'T00:00:00');
//         return (
//           rowDate.getFullYear() === selectedDate.getFullYear() &&
//           rowDate.getMonth() === selectedDate.getMonth() &&
//           rowDate.getDate() === selectedDate.getDate()
//         );
//       });
//     }
//     // Employee ID filter
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }
//     // Employee Name filter
//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Export selected rows with POST request containing selected data
//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get selected row data
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

//       if (selectedData.length === 0) {
//         showToast('No selected data to export', 'warning');
//         return;
//       }

//       // Prepare payload with selected row data
//       const payload = {
//         selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
//         exportRequest: {
//           requestedBy: currentUser?.username || currentUser?.id || 'admin',
//           requestDate: new Date().toISOString(),
//           totalRecords: selectedData.length,
//           filters: {
//             date: searchDate || null,
//             employeeId: searchEmployeeId || null,
//             employeeName: searchEmployeeName || null,
//           }
//         }
//       };

//       // Send POST request with selected data
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload.selectedTimesheets)
//       });

//       if (response.ok) {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('text/csv')) {
//           const csvData = await response.text();
//           const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         } else {
//           const csvHeaders = columnsExport.join(',');
//           const csvRows = selectedData.map(row =>
//             columnsExport.map(col => {
//               const value = row[col] || '';
//               return `"${String(value).replace(/"/g, '""')}"`;
//             }).join(',')
//           );
//           const csvContent = [csvHeaders, ...csvRows].join('\n');
//           const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         }
//       } else {
//         throw new Error(`Export API failed with status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Export error:', error);
//       showToast('Export failed. Please try again.', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//     <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//       {/* <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8"> */}
//       <div className="flex-1 flex flex-col items-center justify-start p-6">
//         <div className="w-full flex flex-col items-center">
//           {/* <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div> */}
//           {/* Filters */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     // Force to local date without timezone adjustment
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">

//                <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     // Force to local date without timezone adjustment
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
              
              

//               {/* <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (YYYY-MM-DD Format)"
//               /> */}
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               // marginLeft: 24,
//               // marginRight: 24,
//               // width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name'].includes(col) && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="cursor-pointer"
//                             title="Select All"
//                           />
//                         ) : (
//                           <span>
//                             {col}{getSortIcon(col)}
//                           </span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
//                               />
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approved data available for export
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

const showToast = (message, type = 'info') => {
  const bgColor = type === 'success' ? '#4ade80'
    : type === 'error' ? '#ef4444'
      : type === 'warning' ? '#f59e0b' : '#3b82f6';
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);
  const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, displayTime);
};

const columnsExport = [
  "Select", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Approved By", "Fiscal Year", "Period",
  "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
];

export default function ExportTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set()); // Use a Set for IDs
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [searchDate, setSearchDate] = useState('');
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const colWidth = 120;
  const minTableWidth = columnsExport.length * colWidth;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch {
      return dateString;
    }
  };

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return '';
    const numHours = parseFloat(hours);
    if (isNaN(numHours)) return hours;
    return numHours.toFixed(2);
  };

  const formatDateFromInput = (inputDate) => {
    if (!inputDate) return '';
    try {
      const date = new Date(inputDate + 'T00:00:00');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch {
      return '';
    }
  };

  const getSortedRows = (rowsToSort) => {
    let sorted = [...rowsToSort];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal, bVal;
        if (sortConfig.key === 'Date') {
          aVal = new Date(a.originalDate || a['Date']);
          bVal = new Date(b.originalDate || b['Date']);
          if (isNaN(aVal.getTime())) aVal = new Date(0);
          if (isNaN(bVal.getTime())) bVal = new Date(0);
        } else if (sortConfig.key === 'Hours') {
          aVal = parseFloat(a[sortConfig.key]) || 0;
          bVal = parseFloat(b[sortConfig.key]) || 0;
        } else {
          aVal = String(a[sortConfig.key] || '').toLowerCase();
          bVal = String(b[sortConfig.key] || '').toLowerCase();
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default sorting
      sorted.sort((a, b) => {
        let aDate = new Date(a.originalDate || a['Date']);
        let bDate = new Date(b.originalDate || b['Date']);
        if (isNaN(aDate.getTime())) aDate = new Date(0);
        if (isNaN(bDate.getTime())) bDate = new Date(0);
        if (aDate.getTime() !== bDate.getTime()) return aDate.getTime() - bDate.getTime();
        const aEmpId = String(a['Employee ID'] || '').toLowerCase();
        const bEmpId = String(b['Employee ID'] || '').toLowerCase();
        return aEmpId.localeCompare(bEmpId);
      });
    }
    return sorted;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (columnKey === 'Select') return null;
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '⇅';
  };

  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    switch (statusUpper) {
      case 'APPROVED':
        return { backgroundColor: '#dcfce7', color: '#16a34a', fontWeight: '600', padding: '4px 8px', fontSize: '11px', display: 'inline-block' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#6b7280', fontWeight: '500', padding: '4px 8px', fontSize: '11px', display: 'inline-block' };
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('currentUser');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        showToast("Session expired. Please login again.", "error");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (userLoaded && currentUser && currentUser.role === "Admin") {
      fetchData();
    } else if (userLoaded) {
      showToast("Access denied. Admin role required.", "error");
      navigate("/dashboard");
    }
  }, [userLoaded, currentUser, navigate]);

  const fetchData = async () => {
    if (!userLoaded || !currentUser) return;
    try {
      setLoading(true);
      const apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved";
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
        id: item.timesheetId || item.id || `fallback-${index}`,
        requestId: item.requestId || item.id,
        levelNo: item.levelNo || 1,
        originalItem: item, // <-- ADD THIS LINE to store the raw API object
        selected: false,
        originalDate: item.timesheetDate,
        "Date": formatDate(item.timesheetDate),
        "Employee ID": item.employee?.employeeId || item.employeeId || "",
        "Timesheet Type Code": item.timesheetTypeCode || "",
        "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
        "Approved By": item.approvedBy || "",
        "Fiscal Year": item.fiscalYear || "",
        "Period": item.period || "",
        "Project ID": item.projectId || "",
        "PLC": item.projectLaborCategory || "",
        "Pay Type": item.payType || "",
        "RLSE Number": item.rlseNumber || "",
        "PO Number": item.poNumber || "",
        "PO Line Number": item.poLineNumber || "",
        "Hours": formatHours(item.hours),
        "Seq No": item.sequenceNumber || "",
        "Status": "APPROVED",
        "Comment": item.comment || "",
      })) : [];

      setRows(mappedData);
    } catch (error) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];
    if (searchDate) {
      const searchDateFormatted = formatDateFromInput(searchDate);
      filtered = filtered.filter(row => row["Date"] === searchDateFormatted);
    }
    if (searchEmployeeId.trim()) {
      filtered = filtered.filter(row =>
        (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
      );
    }
    if (searchEmployeeName.trim()) {
      filtered = filtered.filter(row =>
        (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
      );
    }
    return getSortedRows(filtered);
  };

  const filteredRows = getFilteredRows();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserLoaded(false);
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  // const handleRowSelect = (rowIndex, isSelected) => {
  //   const updatedRows = [...rows];
  //   const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
  //   updatedRows[actualRowIndex].selected = isSelected;
  //   setRows(updatedRows);
  //   const rowData = filteredRows[rowIndex];
  //   if (isSelected) {
  //     setSelectedRows(prev => [...prev, rowData]);
  //   } else {
  //     setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
  //     setSelectAll(false);
  //   }
  // };
const handleRowSelect = (rowIndex, isSelected) => {
  const rowData = filteredRows[rowIndex];
  const rowId = rowData.id;

  // Update the visual state in the main 'rows' array
  const updatedRows = rows.map(row =>
    row.id === rowId ? { ...row, selected: isSelected } : row
  );
  setRows(updatedRows);

  // Update the Set of selected IDs
  setSelectedRows(prev => {
    const newSet = new Set(prev);
    if (isSelected) {
      newSet.add(rowId);
    } else {
      newSet.delete(rowId);
    }
    return newSet;
  });

  // Uncheck "Select All" if any item is deselected
  if (!isSelected) {
    setSelectAll(false);
  }
};


  // const handleSelectAll = (isSelected) => {
  //   setSelectAll(isSelected);
  //   const updatedRows = [...rows];
  //   filteredRows.forEach(filteredRow => {
  //     const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
  //     if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
  //   });
  //   setRows(updatedRows);
  //   setSelectedRows(isSelected ? [...filteredRows] : []);
  // };

  const handleSelectAll = (isSelected) => {
  setSelectAll(isSelected);

  // Create a Set of IDs for the currently filtered rows
  const filteredRowIds = new Set(filteredRows.map(row => row.id));

  // Update the visual state in the main 'rows' array
  const updatedRows = rows.map(row => {
     // Only change selection if the row is currently visible
    if (filteredRowIds.has(row.id)) {
       return { ...row, selected: isSelected };
    }
    return row; // Keep others as they are
  });
  setRows(updatedRows);

  // Update the Set of selected IDs - only add currently filtered rows
  setSelectedRows(isSelected ? filteredRowIds : new Set());
};

  // const handleExportClick = async () => {
  //   if (selectedRows.length === 0) {
  //     showToast("Please select at least one row to export.", "warning");
  //     return;
  //   }
  //   setActionLoading(true);
  //   try {
  //     const timesheetIds = selectedRows.map(row => row.id);
  //     const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-to-csv', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(timesheetIds)
  //     });
  //     if (response.ok) {
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  //       a.download = `Exported_Timesheets_${timestamp}.csv`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       window.URL.revokeObjectURL(url);
  //       showToast("Exported successfully!", "success");
  //     } else {
  //       const errorText = await response.text();
  //       showToast(`Export failed: ${errorText}`, "error");
  //     }
  //   } catch (error) {
  //     showToast("An error occurred during export. Please try again.", "error");
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  // const handleExportClick = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (actionLoading) return;

  //   if (selectedRows.size === 0) {
  //     showToast('Please select at least one timesheet to export', 'warning');
  //     return;
  //   }

  //   try {
  //     setActionLoading(true);

  //     // Get selected row data
  //     const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

  //     if (selectedData.length === 0) {
  //       showToast('No selected data to export', 'warning');
  //       return;
  //     }

  //     // Prepare payload with selected row data
  //     const payload = {
  //       selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
  //       exportRequest: {
  //         requestedBy: currentUser?.username || currentUser?.id || 'admin',
  //         requestDate: new Date().toISOString(),
  //         totalRecords: selectedData.length,
  //         filters: {
  //           date: searchDate || null,
  //           employeeId: searchEmployeeId || null,
  //           employeeName: searchEmployeeName || null,
  //         }
  //       }
  //     };

  //     // Send POST request with selected data
  //     const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload.selectedTimesheets)
  //     });

  //     if (response.ok) {
  //       const contentType = response.headers.get('content-type');
  //       if (contentType && contentType.includes('text/csv')) {
  //         const csvData = await response.text();
  //         const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
  //       } else {
  //         const csvHeaders = columnsExport.join(',');
  //         const csvRows = selectedData.map(row =>
  //           columnsExport.map(col => {
  //             const value = row[col] || '';
  //             return `"${String(value).replace(/"/g, '""')}"`;
  //           }).join(',')
  //         );
  //         const csvContent = [csvHeaders, ...csvRows].join('\n');
  //         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
  //       }
  //     } else {
  //       throw new Error(`Export API failed with status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Export error:', error);
  //     showToast('Export failed. Please try again.', 'error');
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };
  const handleExportClick = async (e) => {
    // e.preventDefault(); // Not needed if button type="button"
    // e.stopPropagation(); // Not usually needed here
    if (actionLoading) return;

    if (selectedRows.size === 0) { // Check size of the Set
      showToast('Please select at least one timesheet to export', 'warning');
      return;
    }

    try {
      setActionLoading(true);

      // Get selected row data by filtering the main 'rows' array using the IDs in the Set
      const selectedData = rows.filter(row => selectedRows.has(row.id));

      if (selectedData.length === 0) {
        // This check might be redundant if selectedRows.size > 0, but good for safety
        showToast('No selected data found to export', 'warning');
        return;
      }

      // Prepare payload - Sending ONLY the original items as per your code structure
      const payloadToSend = selectedData.map(row => row.originalItem); // Send original API data stored earlier

      // Optional: If you needed the extra metadata payload structure from your example:
      // const fullPayload = {
      //   selectedTimesheets: payloadToSend,
      //   exportRequest: {
      //     requestedBy: currentUser?.username || currentUser?.id || 'admin',
      //     requestDate: new Date().toISOString(),
      //     totalRecords: selectedData.length,
      //     filters: {
      //       date: searchDate || null,
      //       employeeId: searchEmployeeId || null,
      //       employeeName: searchEmployeeName || null,
      //     }
      //   }
      // };

      // Send POST request with selected original data items
      const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', { // Note: Endpoint changed slightly in your example
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadToSend) // Sending the array of original items
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        // Check if API returned CSV data directly
        if (contentType && contentType.includes('text/csv')) {
          const csvData = await response.text();
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
        } else {
          // Fallback: Generate CSV locally from the selected (formatted) data
          // This part uses the formatted data shown in the table, not necessarily the originalItem
          console.warn("API did not return CSV, generating fallback CSV locally.");
          const csvHeaders = columnsExport.filter(col => col !== 'Select').join(','); // Exclude 'Select' column header
          const csvRows = selectedData.map(row =>
            columnsExport
              .filter(col => col !== 'Select') // Exclude 'Select' column data
              .map(col => {
                const value = row[col] || '';
                // Basic CSV escaping: double quotes for values containing comma, newline, or double quote
                const escaped = String(value).replace(/"/g, '""');
                 return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
              }).join(',')
          );
          const csvContent = [csvHeaders, ...csvRows].join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `exported_selected_timesheets_fallback_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          showToast(`Exported ${selectedData.length} selected timesheets successfully (local fallback)`, 'success');
        }
      } else {
         const errorText = await response.text();
         console.error('Export API Error:', errorText);
         showToast(`Export API failed: ${errorText || response.statusText}`, 'error');
        // throw new Error(`Export API failed with status: ${response.status}`); // Optionally throw
      }
    } catch (error) {
      console.error('Export error:', error);
      showToast('Export failed. Please try again.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearAllFilters = () => {
    setSearchDate('');
    setSearchEmployeeId('');
    setSearchEmployeeName('');
  };

  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading user session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading timesheet data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full flex flex-col items-center">

         {/* --- Improved Header Section with Logo --- */}
          <div className="w-full flex justify-between items-center mb-4 px-4 py-3 bg-gray-800 border-b border-gray-200 shadow-sm rounded-t-lg">
            
            {/* Left: Page Title (1/3 width) */}
            <div className="w-1/3">
              <h1 className="text-xl font-semibold text-gray-800">
                Export Approved Timesheets
              </h1>
            </div>
            
            {/* Center: Logo (1/3 width) */}
            <div className="w-1/3 flex justify-center">
              {/* This is the background for your white logo. Use the one you picked (e.g., bg-slate-800) */}
              <div className="bg-slate-800 rounded-md p-2 shadow-inner">
                <img 
                  src="/Columbus_Logo.png"  /* <-- MAKE SURE TO USE YOUR LOGO PATH */
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
          {/* --- End of Improved Header Section --- */}

          {/* --- Improved Filters Section --- */}
          <div
            className="w-full bg-gray-800 p-4 rounded-lg shadow border border-gray-200 mb-4 flex flex-wrap items-center justify-between gap-4"
          >
            {/* Left side: Search Inputs */}
            <div className="flex flex-wrap items-center gap-3">
              <DatePicker
                selected={
                  searchDate ? new Date(searchDate + 'T00:00:00') : null
                }
                onChange={(date) => {
                  if (date) {
                    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
                    const isoString = localDate.toISOString().split('T')[0];
                    setSearchDate(isoString);
                  } else {
                    setSearchDate('');
                  }
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="Filter by Date"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-32"
                showPopperArrow={false}
                autoComplete="off"
              />
              <input
                type="text"
                value={searchEmployeeId}
                onChange={e => setSearchEmployeeId(e.target.value)}
                placeholder="Filter by Employee ID"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-36"
              />
              <input
                type="text"
                value={searchEmployeeName}
                onChange={e => setSearchEmployeeName(e.target.value)}
                placeholder="Filter by Name"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-36"
              />
            </div>

            {/* Right side: Clear Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleClearAllFilters}
                className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                disabled={loading || actionLoading}
              >
                <X size={12} />
                Clear
              </button>
            </div>
          </div>
          {/* --- End of Improved Filters Section --- */}

          <div
            className="border border-gray-300 rounded bg-gray-800 shadow"
            style={{
              width: "100%",
              maxWidth: "none",
              minWidth: 300,
              padding: "0.5rem",
              minHeight: "350px",
              maxHeight: "calc(100vh - 240px)",
              overflow: "hidden",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div className="flex justify-end items-center mb-2 w-full px-2" style={{ flexShrink: 0 }}>
              <button
                onClick={handleExportClick}
                disabled={actionLoading || selectedRows.length === 0}
                className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* {actionLoading ? "Exporting..." : `Export Selected (${selectedRows.length})`} */}
                {actionLoading ? "Exporting..." : `Export Selected (${selectedRows.size})`}
              </button>
            </div>

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                minHeight: "200px",
                width: "100%",
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "4px"
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: `${minTableWidth}px`,
                  width: "max-content"
                }}
              >
                <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
                  <tr>
                    {columnsExport.map(col => (
                      <th
                        key={col}
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "8px",
                          fontSize: "12px",
                          minWidth: col === "Select" ? "80px" : `${colWidth}px`,
                          fontWeight: "bold",
                          color: "#1e40af",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9",
                          cursor: col === "Select" ? "default" : "pointer",
                          userSelect: "none"
                        }}
                        onClick={() => col !== 'Select' && handleSort(col)}
                      >
                        {col === "Select" ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={e => handleSelectAll(e.target.checked)}
                              className="cursor-pointer"
                            />
                            <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
                          </div>
                        ) : (
                          <span>{col}{getSortIcon(col)}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, rdx) => (
                      <tr
                        key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
                        style={{
                          backgroundColor: row.selected ? "#dbeafe" : (rdx % 2 === 0 ? "#f9fafb" : "white")
                        }}
                        onMouseEnter={e => !row.selected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")}
                        onMouseLeave={e => !row.selected && (e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white")}
                      >
                        {columnsExport.map((col) => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth: col === "Select" ? "80px" : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: "center",
                              ...(col === "Status" ? getStatusStyle(row[col]) : {})
                            }}>
                            {col === "Status" ? (
                              <span style={getStatusStyle(row[col])}>
                                {row[col]}
                              </span>
                            ) : col === "Select" ? (
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={e => handleRowSelect(rdx, e.target.checked)}
                                className="cursor-pointer"
                              />
                            ) : (
                              row[col] || ""
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columnsExport.length}
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontStyle: "italic",
                          color: "#666"
                        }}>
                        No approved timesheets found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}