// import { useState, useRef, useEffect } from "react";
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
//   }, 1000);
// };

// // IP address fetch utility
// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch {}
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// // Column headers
// const columnsAdmin = [
//   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period", 
//   "Project ID", "PLC", "Pay Type", 
//   "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period", 
//   "Project ID", "PLC", "Pay Type", 
//   "Hours", "Seq No"
// ];

// // Reason modal component
// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MainTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('Pending');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const fileInputRef = useRef(null);

//   // Reason Modal States
//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null); // 'approve' or 'reject'
//   // IP State
//   const [userIpAddress, setUserIpAddress] = useState('');

//   // const isAdmin = currentUser?.role === "Admin";
//   // const isAdmin = currentUser?.role === "Admin" || currentUser?.role === "admin";
//   // console.log('Current User:', currentUser);
//   // console.log('Current User Role:', currentUser?.role);
//   // console.log('Is Admin:', isAdmin);
//   // console.log(isAdmin);
//   // console.log((currentUser.role))
//   const isAdmin = currentUser?.role === "Admin";
//   const isUser = currentUser?.role === "User";

//   const columns = isAdmin ? columnsAdmin : columnsViewer;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Get IP address once
//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

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
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//   }, [statusFilter]);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin, statusFilter]);

//   // const fetchData = async () => {
//   //   if (!userLoaded || !currentUser || !currentUser.username) return;
//   //   try {
//   //     setLoading(true);
//   //     let apiUrl = '';
//   //      if (isAdmin) apiUrl = 'https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals';
       
       
//   //     else apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//   //     console.log(apiUrl);
//   //     // if (isAdmin) apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//   //     // else apiUrl = 'https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals';
//   //     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//   //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//   //     const apiData = await response.json();
//   //     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//   //       id: item.timesheetId || item.id || `fallback-${index}`,
//   //       requestId: item.requestId || item.id,
//   //       levelNo: item.levelNo || 1,
//   //       selected: false,
//   //       notifySelected: false,
//   //       isApproved: item.approvalStatus === 'APPROVED' || false,
//   //       isRejected: item.approvalStatus === 'REJECTED' || false,
//   //       isNotified: item.approvalStatus === 'NOTIFIED' || false,
//   //       status: item.approvalStatus?.toLowerCase() || 'pending',
//   //       "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
//   //       "Employee ID": item.employee?.employeeId || item.employeeId || "",
//   //       "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//   //       "Fiscal Year": item.fiscalYear || "",
//   //       "Period": item.period || "",
//   //       "Project ID": item.projectId || "",
//   //       "Account": item.accountId || "",
//   //       "Org": item.organizationId || "",
//   //       "PLC": item.projectLaborCategory || "",
//   //       "Pay Type": item.payType || "",
//   //       "Hours": item.hours || "",
//   //       "Seq No": item.sequenceNumber || ""
//   //     })) : [];
//   //     setRows(mappedData);
//   //     showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
//   //   } catch (error) {
//   //     showToast('Failed to load timesheet data. Please check your connection.', "error");
//   //     setRows([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // MM-DD-YYYY filtering
//   const fetchData = async () => {
//   if (!userLoaded || !currentUser || !currentUser.username) return;
//   try {
//     setLoading(true);
//     let apiUrl = "";
//     if (isAdmin) {
//       // Admin: all pending approvals
//       apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//     } else if (isUser) {
//       // User: pending approvals for that username and status
//       apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//     } else {
//       // Optionally, handle unknown roles here
//       setRows([]);
//       setLoading(false);
//       return;
//     }
//     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     const apiData = await response.json();
//     // ...map your rows logic here
//     setRows(/* mappedData */);
//     showToast(`Loaded ${apiData.length} timesheets successfully`, "success");
//   } catch (error) {
//     showToast('Failed to load timesheet data. Please check your connection.', "error");
//     setRows([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return filtered;
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleImportClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   // const handleImportFile = async (e) => {
//   //   const file = e.target.files?.[0];
//   //   if (!file) return;
//   //   if (!file.name.toLowerCase().endsWith('.csv')) {
//   //     showToast('Please select a CSV file', "error");
//   //     return;
//   //   }
//   //   const formData = new FormData();
//   //   formData.append('file', file);
//   //   try {
//   //     setActionLoading(true);
//   //     const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//   //       method: 'POST',
//   //       body: formData
//   //     });
//   //     if (importResponse.ok) {
//   //       const importedData = await importResponse.json();
//   //       if (importedData && importedData.message) {
//   //         showToast(importedData.message, "success");
//   //       } else if (Array.isArray(importedData)) {
//   //         showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//   //       } else {
//   //         showToast(`Successfully imported: ${file.name}`, "success");
//   //       }
//   //       if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//   //         const requestBody = importedData.map(item => ({
//   //           requestType: "TIMESHEET",
//   //           requesterId: 1,
//   //           timesheetId: item.timesheetId || item.id,
//   //           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`

//   //         })
//   //         );
//   //         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//   //           method: 'POST',
//   //           headers: { 'Content-Type': 'application/json' },
//   //           body: JSON.stringify(requestBody)
//   //         });
//   //         if (notifyResponse.ok) {
//   //           showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
//   //         } else {
//   //           showToast('Import successful but notifications failed', "warning");
//   //         }
//   //       }
//   //       setTimeout(() => fetchData(), 1500);
//   //     } else {
//   //       const errorResponse = await importResponse.json().catch(() => null);
//   //       const errorText = errorResponse?.message || await importResponse.text();
//   //       showToast('Import failed: ' + errorText, "error");
//   //     }
//   //   } catch {
//   //     showToast('Import failed. Please try again.', "error");
//   //   } finally {
//   //     setActionLoading(false);
//   //   }
//   // };
  
//   const handleImportFile = async (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   if (!file.name.toLowerCase().endsWith('.csv')) {
//     showToast('Please select a CSV file', "error");
//     return;
//   }
//   const formData = new FormData();
//   formData.append('file', file);
//   try {
//     setActionLoading(true);
    
//     // Fetch project ID from pending approvals
//     let projectId = null;
//     try {
//       const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
//       if (pendingResponse.ok) {
//         const pendingData = await pendingResponse.json();
//         if (Array.isArray(pendingData) && pendingData.length > 0) {
//           projectId = pendingData[0].projectId;
//         }
//       }
//     } catch (error) {
//       console.warn('Failed to fetch projectId, proceeding without it');
//     }
    
//     const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//       method: 'POST',
//       body: formData
//     });
    
//     if (importResponse.ok) {
//       const importedData = await importResponse.json();
//       if (importedData && importedData.message) {
//         showToast(importedData.message, "success");
//       } else if (Array.isArray(importedData)) {
//         showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//       } else {
//         showToast(`Successfully imported: ${file.name}`, "success");
//       }
      
//       if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//         const requestBody = importedData.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId, // Added projectId here
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
//       setTimeout(() => fetchData(), 1500);
//     } else {
//       const errorResponse = await importResponse.json().catch(() => null);
//       const errorText = errorResponse?.message || await importResponse.text();
//       showToast('Import failed: ' + errorText, "error");
//     }
//   } catch {
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//   }
// };

//   const handleNotifyRowSelect = (rowIndex, isSelected) => {
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].notifySelected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifySelectAll = (isSelected) => {
//     setNotifySelectAll(isSelected);
//     const updatedRows = [...rows];
//     filteredRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
//   };

//   // BulkNotify endpoint typo fixed
//   // const handleNotifyClick = async () => {
//   //   if (selectedNotifyRows.length === 0) {
//   //     showToast('Please select at least one timesheet to notify.', "warning");
//   //     return;
//   //   }
//   //   try {
//   //     setActionLoading(true);
//   //     const requestBody = selectedNotifyRows.map(row => ({
//   //       requestType: "TIMESHEET",
//   //       requesterId: 1,
//   //       timesheetId: row.id,
//   //       requestData: `Notification for timesheet ${row.id}`
//   //     }));
//   //     const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(requestBody)
//   //     });
//   //     if (response.ok) {
//   //       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//   //       const notifiedIds = selectedNotifyRows.map(row => row.id);
//   //       setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
//   //         { ...row, isNotified: true, status: 'notified', notifySelected: false } :
//   //         { ...row, notifySelected: false }
//   //       ));
//   //       setSelectedNotifyRows([]);
//   //       setNotifySelectAll(false);
//   //     } else {
//   //       showToast('Failed to send notifications. Please try again.', "error");
//   //     }
//   //   } catch {
//   //     showToast('Failed to send notifications. Please try again.', "error");
//   //   } finally {
//   //     setActionLoading(false);
//   //   }
//   // };
//   const handleNotifyClick = async () => {
//   if (selectedNotifyRows.length === 0) {
//     showToast('Please select at least one timesheet to notify.', "warning");
//     return;
//   }
//   try {
//     setActionLoading(true);
//     const requestBody = selectedNotifyRows.map(row => ({
//       requestType: "TIMESHEET",
//       requesterId: 1,
//       timesheetId: row.id,
//       ProjectId: row["Project ID"], // <-- Changed to capital P and using the correct field name
//       requestData: `Notification for timesheet ${row.id}`
//     }));
//     const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody)
//     });
//     if (response.ok) {
//       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//       const notifiedIds = selectedNotifyRows.map(row => row.id);
//       setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
//         { ...row, isNotified: true, status: 'notified', notifySelected: false } :
//         { ...row, notifySelected: false }
//       ));
//       setSelectedNotifyRows([]);
//       setNotifySelectAll(false);
//     } else {
//       showToast('Failed to send notifications. Please try again.', "error");
//     }
//   } catch {
//     showToast('Failed to send notifications. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//   }
// };



//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isAdmin) return;
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].selected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleSelectAll = (isSelected) => {
//     if (!isAdmin) return;
//     setSelectAll(isSelected);
//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//   };

//   // Build BulkApprove/Reject bodies with ipAddress key
//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   // Approve/Reject modal triggers
//   const handleBulkApproveClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
//   const handleBulkRejectClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };
//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//             { ...row, isApproved: true, status: 'approved', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const getStatusOptions = () => isAdmin ? ['Pending', 'Approved', 'Rejected'] : [];
//   const statusOptions = getStatusOptions();
//   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
//   const hasPendingRows = filteredRows.some(row => isRowActionable(row));

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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading timesheet data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Welcome, {currentUser?.name}
//             </h1>
//             <button
//               onClick={handleLogout}
//               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>

//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             {isAdmin && statusOptions.length > 0 && (
//               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
//                 {statusOptions.map(status => (
//                   <button
//                     key={status}
//                     onClick={() => setStatusFilter(status)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
//                       statusFilter === status
//                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
//                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
//                           : 'bg-red-600 text-white shadow-sm'
//                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
//                     }`}
//                   >
//                     {status}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
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
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {isAdmin && statusFilter === 'Pending' && hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 {!isAdmin && (
//                   <>
//                     <button
//                       onClick={handleNotifyClick}
//                       disabled={actionLoading || selectedNotifyRows.length === 0}
//                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                     </button>
//                     <button
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? "Importing..." : "Import"}
//                     </button>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       className="hidden"
//                       onChange={handleImportFile}
//                       accept=".csv"
//                     />
//                   </>
//                 )}
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
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "left",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9"
//                         }}>
//                         {col === "Select" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && !isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col
//                         }
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: (row.selected && isAdmin) || (row.notifySelected && !isAdmin)
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map(col => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
//                             }}>
//                             {col === "Select" && isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && !isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.notifySelected || false}
//                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                               />
//                             ) : row[col] || ""}
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
//                         No data available
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

// import { useState, useRef, useEffect } from "react";
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
//   }, 1000);
// };

// // IP address fetch utility
// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch {}
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// // Column headers
// const columnsAdmin = [
//   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period", 
//   "Project ID", "PLC", "Pay Type", 
//   "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period", 
//   "Project ID", "PLC", "Pay Type", 
//   "Hours", "Seq No"
// ];

// // Reason modal component
// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MainTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('Pending');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const fileInputRef = useRef(null);

//   // Reason Modal States
//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null); // 'approve' or 'reject'
//   // IP State
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const isUser = currentUser?.role === "User";

//   const columns = isAdmin ? columnsAdmin : columnsViewer;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Get IP address once
//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

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
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//   }, [statusFilter]);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin, statusFilter]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         // Admin: all pending approvals
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         // User: pending approvals for that username and status
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//       } else {
//         // Optionally, handle unknown roles here
//         setRows([]);
//         setLoading(false);
//         return;
//       }
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.approvalStatus?.toLowerCase() || 'pending',
//         "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": item.hours || "",
//         "Seq No": item.sequenceNumber || ""
//       })) : [];
//       setRows(mappedData);
//       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
//     } catch (error) {
//       showToast('Failed to load timesheet data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return filtered;
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleImportClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   const handleImportFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.name.toLowerCase().endsWith('.csv')) {
//       showToast('Please select a CSV file', "error");
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       setActionLoading(true);
      
//       // Fetch project ID from pending approvals
//       let projectId = null;
//       try {
//         const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
//         if (pendingResponse.ok) {
//           const pendingData = await pendingResponse.json();
//           if (Array.isArray(pendingData) && pendingData.length > 0) {
//             projectId = pendingData[0].projectId;
//           }
//         }
//       } catch (error) {
//         console.warn('Failed to fetch projectId, proceeding without it');
//       }
      
//       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//         method: 'POST',
//         body: formData
//       });
      
//       if (importResponse.ok) {
//         const importedData = await importResponse.json();
//         if (importedData && importedData.message) {
//           showToast(importedData.message, "success");
//         } else if (Array.isArray(importedData)) {
//           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//         } else {
//           showToast(`Successfully imported: ${file.name}`, "success");
//         }
        
//         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//           const requestBody = importedData.map(item => ({
//             requestType: "TIMESHEET",
//             requesterId: 1,
//             timesheetId: item.timesheetId || item.id,
//             projectId: projectId, // Added projectId here
//             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//           }));
          
//           const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestBody)
//           });
          
//           if (notifyResponse.ok) {
//             showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
//         setTimeout(() => fetchData(), 1500);
//       } else {
//         const errorResponse = await importResponse.json().catch(() => null);
//         const errorText = errorResponse?.message || await importResponse.text();
//         showToast('Import failed: ' + errorText, "error");
//       }
//     } catch {
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleNotifyRowSelect = (rowIndex, isSelected) => {
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].notifySelected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifySelectAll = (isSelected) => {
//     setNotifySelectAll(isSelected);
//     const updatedRows = [...rows];
//     filteredRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
//   };

//   const handleNotifyClick = async () => {
//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"], // <-- Changed to capital P and using the correct field name
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
//           { ...row, isNotified: true, status: 'notified', notifySelected: false } :
//           { ...row, notifySelected: false }
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isAdmin) return;
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].selected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleSelectAll = (isSelected) => {
//     if (!isAdmin) return;
//     setSelectAll(isSelected);
//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//   };

//   // Build BulkApprove/Reject bodies with ipAddress key
//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   // Approve/Reject modal triggers
//   const handleBulkApproveClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
//   const handleBulkRejectClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };
//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//             { ...row, isApproved: true, status: 'approved', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const getStatusOptions = () => isAdmin ? ['Pending', 'Approved', 'Rejected'] : [];
//   const statusOptions = getStatusOptions();
//   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading timesheet data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Welcome, {currentUser?.name}
//             </h1>
//             <button
//               onClick={handleLogout}
//               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>

//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             {isAdmin && statusOptions.length > 0 && (
//               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
//                 {statusOptions.map(status => (
//                   <button
//                     key={status}
//                     onClick={() => setStatusFilter(status)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
//                       statusFilter === status
//                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
//                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
//                           : 'bg-red-600 text-white shadow-sm'
//                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
//                     }`}
//                   >
//                     {status}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
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
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {isAdmin && statusFilter === 'Pending' && hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 {!isAdmin && (
//                   <>
//                     <button
//                       onClick={handleNotifyClick}
//                       disabled={actionLoading || selectedNotifyRows.length === 0}
//                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                     </button>
//                     <button
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? "Importing..." : "Import"}
//                     </button>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       className="hidden"
//                       onChange={handleImportFile}
//                       accept=".csv"
//                     />
//                   </>
//                 )}
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
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "left",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9"
//                         }}>
//                         {col === "Select" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && !isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col
//                         }
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: (row.selected && isAdmin) || (row.notifySelected && !isAdmin)
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map(col => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
//                             }}>
//                             {col === "Select" && isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && !isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.notifySelected || false}
//                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                               />
//                             ) : row[col] || ""}
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
//                         No data available
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


// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Simple toast function without container
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

// // IP address fetch utility
// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// const columnsAdmin = [
//   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type",
//   "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type",
//   "Hours", "Seq No"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MainTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('Pending');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const fileInputRef = useRef(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const isUser = currentUser?.role === "User";

//   const columns = isAdmin ? columnsAdmin : columnsViewer;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

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
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//   }, [statusFilter]);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin, statusFilter]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//       } else {
//         setRows([]);
//         setLoading(false);
//         return;
//       }
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.approvalStatus?.toLowerCase() || 'pending',
//         "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": item.hours || "",
//         "Seq No": item.sequenceNumber || ""
//       })) : [];
//       setRows(mappedData);
//       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
//     } catch (error) {
//       showToast('Failed to load timesheet data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return filtered;
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleImportClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   const handleImportFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.name.toLowerCase().endsWith('.csv')) {
//       showToast('Please select a CSV file', "error");
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       setActionLoading(true);
//       let projectId = null;
//       try {
//         const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
//         if (pendingResponse.ok) {
//           const pendingData = await pendingResponse.json();
//           if (Array.isArray(pendingData) && pendingData.length > 0) {
//             projectId = pendingData[0].projectId;
//           }
//         }
//       } catch (error) {
//         console.warn('Failed to fetch projectId, proceeding without it');
//       }
//       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//         method: 'POST',
//         body: formData
//       });
//       if (importResponse.ok) {
//         const importedData = await importResponse.json();
//         if (importedData && importedData.message) {
//           showToast(importedData.message, "success");
//         } else if (Array.isArray(importedData)) {
//           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//         } else {
//           showToast(`Successfully imported: ${file.name}`, "success");
//         }
//         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//           const requestBody = importedData.map(item => ({
//             requestType: "TIMESHEET",
//             requesterId: 1,
//             timesheetId: item.timesheetId || item.id,
//             projectId: projectId,
//             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//           }));
//           const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestBody)
//           });
//           if (notifyResponse.ok) {
//             showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
//         setTimeout(() => fetchData(), 1500);
//       } else {
//         const errorResponse = await importResponse.json().catch(() => null);
//         const errorText = errorResponse?.message || await importResponse.text();
//         showToast('Import failed: ' + errorText, "error");
//       }
//     } catch {
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleNotifyRowSelect = (rowIndex, isSelected) => {
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].notifySelected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifySelectAll = (isSelected) => {
//     setNotifySelectAll(isSelected);
//     const updatedRows = [...rows];
//     filteredRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
//   };

//   const handleNotifyClick = async () => {
//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
//           { ...row, isNotified: true, status: 'notified', notifySelected: false } :
//           { ...row, notifySelected: false }
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isAdmin) return;
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].selected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleSelectAll = (isSelected) => {
//     if (!isAdmin) return;
//     setSelectAll(isSelected);
//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
//   const handleBulkRejectClick = () => {
//     if (!isAdmin || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };
//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//             { ...row, isApproved: true, status: 'approved', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Status options only for User, not Admin
//   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
//   const statusOptions = getStatusOptions();
//   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading timesheet data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Welcome, {currentUser?.name}
//             </h1>
//             <button
//               onClick={handleLogout}
//               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             {isUser && statusOptions.length > 0 && (
//               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
//                 {statusOptions.map(status => (
//                   <button
//                     key={status}
//                     onClick={() => setStatusFilter(status)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
//                       statusFilter === status
//                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
//                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
//                           : 'bg-red-600 text-white shadow-sm'
//                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
//                     }`}
//                   >
//                     {status}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
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
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 {isAdmin && (
//                   <>
//                     <button
//                       onClick={handleNotifyClick}
//                       disabled={actionLoading || selectedNotifyRows.length === 0}
//                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                     </button>
//                     <button
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? "Importing..." : "Import"}
//                     </button>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       className="hidden"
//                       onChange={handleImportFile}
//                       accept=".csv"
//                     />
//                   </>
//                 )}
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
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "left",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9"
//                         }}>
//                         {col === "Select" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && !isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col
//                         }
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: (row.selected && isAdmin) || (row.notifySelected && !isAdmin)
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map(col => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
//                             }}>
//                             {col === "Select" && isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && !isAdmin ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.notifySelected || false}
//                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                               />
//                             ) : row[col] || ""}
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
//                         No data available
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

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Simple toast function without container
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

// // IP address fetch utility
// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// const columnsAdmin = [
//   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type",
//   "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type",
//   "Hours", "Seq No", 
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function MainTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [statusFilter, setStatusFilter] = useState('Pending');
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const fileInputRef = useRef(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const isUser = currentUser?.role === "User";

//   // SWAPPED: Admin gets Notify column, User gets Select column
//   const columns = isAdmin ? columnsAdmin : columnsViewer;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

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
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//   }, [statusFilter]);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin, statusFilter]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
//       } else {
//         setRows([]);
//         setLoading(false);
//         return;
//       }
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.approvalStatus?.toLowerCase() || 'pending',
//         "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": item.hours || "",
//         "Seq No": item.sequenceNumber || ""
//       })) : [];
//       setRows(mappedData);
//       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
//     } catch (error) {
//       showToast('Failed to load timesheet data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return filtered;
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleImportClick = () => {
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   const handleImportFile = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.name.toLowerCase().endsWith('.csv')) {
//       showToast('Please select a CSV file', "error");
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       setActionLoading(true);
//       let projectId = null;
//       try {
//         const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
//         if (pendingResponse.ok) {
//           const pendingData = await pendingResponse.json();
//           if (Array.isArray(pendingData) && pendingData.length > 0) {
//             projectId = pendingData[0].projectId;
//           }
//         }
//       } catch (error) {
//         console.warn('Failed to fetch projectId, proceeding without it');
//       }
//       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//         method: 'POST',
//         body: formData
//       });
//       if (importResponse.ok) {
//         const importedData = await importResponse.json();
//         if (importedData && importedData.message) {
//           showToast(importedData.message, "success");
//         } else if (Array.isArray(importedData)) {
//           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//         } else {
//           showToast(`Successfully imported: ${file.name}`, "success");
//         }
//         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//           const requestBody = importedData.map(item => ({
//             requestType: "TIMESHEET",
//             requesterId: 1,
//             timesheetId: item.timesheetId || item.id,
//             projectId: projectId,
//             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//           }));
//           const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(requestBody)
//           });
//           if (notifyResponse.ok) {
//             showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
//         // setTimeout(() => fetchData(), 1500);
//       } else {
//         const errorResponse = await importResponse.json().catch(() => null);
//         const errorText = errorResponse?.message || await importResponse.text();
//         showToast('Import failed: ' + errorText, "error");
//       }
//     } catch {
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleNotifyRowSelect = (rowIndex, isSelected) => {
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].notifySelected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifySelectAll = (isSelected) => {
//     setNotifySelectAll(isSelected);
//     const updatedRows = [...rows];
//     filteredRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
//   };

//   // const handleNotifyClick = async () => {
//   //   if (selectedNotifyRows.length === 0) {
//   //     showToast('Please select at least one timesheet to notify.', "warning");
//   //     return;
//   //   }
//   //   try {
//   //     setActionLoading(true);
//   //     const requestBody = selectedNotifyRows.map(row => ({
//   //       requestType: "TIMESHEET",
//   //       requesterId: 1,
//   //       timesheetId: row.id,
//   //       ProjectId: row["Project ID"],
//   //       requestData: `Notification for timesheet ${row.id}`
//   //     }));
//   //     const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(requestBody)
//   //     });
//   //     if (response.ok) {
//   //       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//   //       const notifiedIds = selectedNotifyRows.map(row => row.id);
//   //       setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
//   //         { ...row, isNotified: true, status: 'notified', notifySelected: false } :
//   //         { ...row, notifySelected: false }
//   //       ));
//   //       setSelectedNotifyRows([]);
//   //       setNotifySelectAll(false);
//   //     } else {
//   //       showToast('Failed to send notifications. Please try again.', "error");
//   //     }
//   //   } catch {
//   //     showToast('Failed to send notifications. Please try again.', "error");
//   //   } finally {
//   //     setActionLoading(false);
//   //   }
//   // };
// //   const handleNotifyClick = async () => {
// //   if (selectedNotifyRows.length === 0) {
// //     showToast('Please select at least one timesheet to notify.', "warning");
// //     return;
// //   }
// //   try {
// //     setActionLoading(true);
// //     const requestBody = selectedNotifyRows.map(row => ({
// //       requestType: "TIMESHEET",
// //       requesterId: 1,
// //       timesheetId: row.id,
// //       ProjectId: row["Project ID"],
// //       requestData: `Notification for timesheet ${row.id}`
// //     }));
// //     const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(requestBody)
// //     });
// //     if (response.ok) {
// //       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
      
// //       // ✅ This part ALREADY updates instantly without page reload
// //       const notifiedIds = selectedNotifyRows.map(row => row.id);
// //       setRows(prevRows => prevRows.map(row => notifiedIds.includes(row.id) ?
// //         { ...row, isNotified: true, status: 'notified', notifySelected: false } :
// //         { ...row, notifySelected: false }
// //       ));
// //       setSelectedNotifyRows([]);
// //       setNotifySelectAll(false);
      
// //       // ❌ DON'T call fetchData() here - it causes reload
// //       // setTimeout(() => fetchData(), 1500); // REMOVE THIS LINE
      
// //     } else {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     }
// //   } catch {
// //     showToast('Failed to send notifications. Please try again.', "error");
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };
  
// const handleNotifyClick = async () => {
//   if (selectedNotifyRows.length === 0) {
//     showToast('Please select at least one timesheet to notify.', "warning");
//     return;
//   }
//   try {
//     setActionLoading(true);
//     const requestBody = selectedNotifyRows.map(row => ({
//       requestType: "TIMESHEET",
//       requesterId: 1,
//       timesheetId: row.id,
//       ProjectId: row["Project ID"],
//       requestData: `Notification for timesheet ${row.id}`
//     }));
//     const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody)
//     });
//     if (response.ok) {
//       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
      
//       // ✅ Remove notified rows from the table (similar to approve/reject behavior)
//       const notifiedIds = selectedNotifyRows.map(row => row.id);
//       setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
      
//       // Clear selections
//       setSelectedNotifyRows([]);
//       setNotifySelectAll(false);
      
//     } else {
//       showToast('Failed to send notifications. Please try again.', "error");
//     }
//   } catch {
//     showToast('Failed to send notifications. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//   }
// };

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isUser) return; // Changed from isAdmin to isUser
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].selected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleSelectAll = (isSelected) => {
//     if (!isUser) return; // Changed from isAdmin to isUser
//     setSelectAll(isSelected);
//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (!isUser || selectedRows.length === 0) { // Changed from isAdmin to isUser
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
//   const handleBulkRejectClick = () => {
//     if (!isUser || selectedRows.length === 0) { // Changed from isAdmin to isUser
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };
//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//             { ...row, isApproved: true, status: 'approved', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         if (statusFilter === 'Pending') {
//           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
//         } else {
//           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
//         }
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Status options only for User, not Admin
//   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
//   const statusOptions = getStatusOptions();
//   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading timesheet data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Welcome, {currentUser?.name}
//             </h1>
//             <button
//               onClick={handleLogout}
//               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             {isUser && statusOptions.length > 0 && (
//               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
//                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
//                 {statusOptions.map(status => (
//                   <button
//                     key={status}
//                     onClick={() => setStatusFilter(status)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
//                       statusFilter === status
//                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
//                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
//                           : 'bg-red-600 text-white shadow-sm'
//                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
//                     }`}
//                   >
//                     {status}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
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
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {/* User shows Approve/Reject buttons */}
//                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 {/* Admin shows Notify/Import buttons */}
//                 {isAdmin && (
//                   <>
//                     <button
//                       onClick={handleNotifyClick}
//                       disabled={actionLoading || selectedNotifyRows.length === 0}
//                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                     </button>
//                     <button
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                     >
//                       {actionLoading ? "Importing..." : "Import"}
//                     </button>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       className="hidden"
//                       onChange={handleImportFile}
//                       accept=".csv"
//                     />
//                   </>
//                 )}
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
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "left",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9"
//                         }}>
//                         {col === "Select" && isUser ? ( // User gets Select column
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && isAdmin ? ( // Admin gets Notify column
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col
//                         }
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map(col => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
//                             }}>
//                             {col === "Select" && isUser ? ( // User gets Select checkboxes
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && isAdmin ? ( // Admin gets Notify checkboxes
//                               <input
//                                 type="checkbox"
//                                 checked={row.notifySelected || false}
//                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                               />
//                             ) : row[col] || ""}
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
//                         No data available
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

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// Simple toast function without container
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
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1000);
};


// IP address fetch utility
const getUserIPAddress = async () => {
  try {
    const endpoints = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://httpbin.org/ip'
    ];
    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          return data.ip || data.origin || '';
        }
      } catch { }
    }
    return '';
  } catch {
    return '';
  }
};


const columnsAdmin = [
  "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
  "Project ID", "PLC", "Pay Type",
  "Hours", "Seq No"
];


const columnsViewer = [
  "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
  "Project ID", "PLC", "Pay Type",
  "Hours", "Seq No", "Comment", "IP Address"
];


const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
  const [reason, setReason] = useState('');
  useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
  if (!isOpen) return null;
  const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
    else if (e.key === 'Escape') onCancel();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
          </h3>
          <p className="text-sm text-gray-600">
            You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
          </p>
        </div>
        <div className="mb-4">
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
            className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            autoFocus
          />
          <div className="text-xs text-gray-500 mt-1">
            {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function MainTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [notifySelectAll, setNotifySelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [searchDate, setSearchDate] = useState('');
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const fileInputRef = useRef(null);


  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userIpAddress, setUserIpAddress] = useState('');


  const isAdmin = currentUser?.role === "Admin";
  const isUser = currentUser?.role === "User";


  // SWAPPED: Admin gets Notify column, User gets Select column
  const columns = isAdmin ? columnsAdmin : columnsViewer;
  const colWidth = 120;
  const minTableWidth = columns.length * colWidth;


  useEffect(() => {
    getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
  }, []);


  useEffect(() => {
    const userInfo = localStorage.getItem('currentUser');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (!parsedUser.username) {
          parsedUser.username = parsedUser.id === "john" ? "john.doe" :
            parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
        }
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
    setSelectedRows([]);
    setSelectedNotifyRows([]);
    setSelectAll(false);
    setNotifySelectAll(false);
  }, [statusFilter]);


  useEffect(() => {
    if (userLoaded && currentUser && currentUser.username) fetchData();
  }, [userLoaded, currentUser, isAdmin, statusFilter]);


  const fetchData = async () => {
    if (!userLoaded || !currentUser || !currentUser.username) return;
    try {
      setLoading(true);
      let apiUrl = "";
      if (isAdmin) {
        apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
      } else if (isUser) {
        apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
      } else {
        setRows([]);
        setLoading(false);
        return;
      }
      const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();
      const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
        id: item.timesheetId || item.id || `fallback-${index}`,
        requestId: item.requestId || item.id,
        levelNo: item.levelNo || 1,
        selected: false,
        notifySelected: false,
        isApproved: item.approvalStatus === 'APPROVED' || false,
        isRejected: item.approvalStatus === 'REJECTED' || false,
        isNotified: item.approvalStatus === 'NOTIFIED' || false,
        status: item.approvalStatus?.toLowerCase() || 'pending',
        "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
        "Employee ID": item.employee?.employeeId || item.employeeId || "",
        "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
        "Fiscal Year": item.fiscalYear || "",
        "Period": item.period || "",
        "Project ID": item.projectId || "",
        "Account": item.accountId || "",
        "Org": item.organizationId || "",
        "PLC": item.projectLaborCategory || "",
        "Pay Type": item.payType || "",
        "Hours": item.hours || "",
        "Seq No": item.sequenceNumber || "",
        "Comment": item.comment || "",
        "IP Address": item.ipAddress || ""
      })) : [];
      setRows(mappedData);
      showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
    } catch (error) {
      showToast('Failed to load timesheet data. Please check your connection.', "error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };


  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];
    if (searchDate) {
      filtered = filtered.filter(row => {
        const rowDateString = row["Date"];
        if (!rowDateString) return false;
        try {
          const rowDate = new Date(rowDateString);
          const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
          const selectedDate = new Date(searchDate);
          const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
          return formattedRowDate === formattedSelectedDate;
        } catch {
          return false;
        }
      });
    }
    if (searchEmployeeId.trim()) {
      filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
    }
    return filtered;
  };


  const filteredRows = getFilteredRows();


  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserLoaded(false);
    showToast("Logged out successfully", "info");
    navigate("/");
  };


  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };


  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.csv')) {
      showToast('Please select a CSV file', "error");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      setActionLoading(true);
      let projectId = null;
      try {
        const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
        if (pendingResponse.ok) {
          const pendingData = await pendingResponse.json();
          if (Array.isArray(pendingData) && pendingData.length > 0) {
            projectId = pendingData[0].projectId;
          }
        }
      } catch (error) {
        console.warn('Failed to fetch projectId, proceeding without it');
      }
      const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
        method: 'POST',
        body: formData
      });
      if (importResponse.ok) {
        const importedData = await importResponse.json();
        if (importedData && importedData.message) {
          showToast(importedData.message, "success");
        } else if (Array.isArray(importedData)) {
          showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
        } else {
          showToast(`Successfully imported: ${file.name}`, "success");
        }
        if (importedData && Array.isArray(importedData) && importedData.length > 0) {
          const requestBody = importedData.map(item => ({
            requestType: "TIMESHEET",
            requesterId: 1,
            timesheetId: item.timesheetId || item.id,
            projectId: projectId,
            requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
          }));
          const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });
          if (notifyResponse.ok) {
            showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
          } else {
            showToast('Import successful but notifications failed', "warning");
          }
        }
        // setTimeout(() => fetchData(), 1500);
      } else {
        const errorResponse = await importResponse.json().catch(() => null);
        const errorText = errorResponse?.message || await importResponse.text();
        showToast('Import failed: ' + errorText, "error");
      }
    } catch {
      showToast('Import failed. Please try again.', "error");
    } finally {
      setActionLoading(false);
    }
  };


  const handleNotifyRowSelect = (rowIndex, isSelected) => {
    const updatedRows = [...rows];
    const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
    updatedRows[actualRowIndex].notifySelected = isSelected;
    setRows(updatedRows);
    const rowData = filteredRows[rowIndex];
    if (isSelected) {
      setSelectedNotifyRows(prev => [...prev, rowData]);
    } else {
      setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
      setNotifySelectAll(false);
    }
  };


  const handleNotifySelectAll = (isSelected) => {
    setNotifySelectAll(isSelected);
    const updatedRows = [...rows];
    filteredRows.forEach(filteredRow => {
      const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
      if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
    });
    setRows(updatedRows);
    setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
  };


const handleNotifyClick = async () => {
  if (selectedNotifyRows.length === 0) {
    showToast('Please select at least one timesheet to notify.', "warning");
    return;
  }
  try {
    setActionLoading(true);
    const requestBody = selectedNotifyRows.map(row => ({
      requestType: "TIMESHEET",
      requesterId: 1,
      timesheetId: row.id,
      ProjectId: row["Project ID"],
      requestData: `Notification for timesheet ${row.id}`
    }));
    const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
      
      // ✅ Remove notified rows from the table (similar to approve/reject behavior)
      const notifiedIds = selectedNotifyRows.map(row => row.id);
      setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
      
      // Clear selections
      setSelectedNotifyRows([]);
      setNotifySelectAll(false);
      
    } else {
      showToast('Failed to send notifications. Please try again.', "error");
    }
  } catch {
    showToast('Failed to send notifications. Please try again.', "error");
  } finally {
    setActionLoading(false);
  }
};


  const handleRowSelect = (rowIndex, isSelected) => {
    if (!isUser) return; // Changed from isAdmin to isUser
    const updatedRows = [...rows];
    const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
    updatedRows[actualRowIndex].selected = isSelected;
    setRows(updatedRows);
    const rowData = filteredRows[rowIndex];
    if (isSelected) {
      setSelectedRows(prev => [...prev, rowData]);
    } else {
      setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
      setSelectAll(false);
    }
  };


  const handleSelectAll = (isSelected) => {
    if (!isUser) return; // Changed from isAdmin to isUser
    setSelectAll(isSelected);
    const updatedRows = [...rows];
    const actionableRows = filteredRows.filter(row => isRowActionable(row));
    actionableRows.forEach(filteredRow => {
      const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
      if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
    });
    setRows(updatedRows);
    setSelectedRows(isSelected ? [...actionableRows] : []);
  };


  const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
    return selectedRows.map(row => ({
      requestId: row.requestId || row.id,
      levelNo: row.levelNo || 1,
      approverUserId: 1,
      comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
      ipAddress: ipAddress
    }));
  };


  const handleBulkApproveClick = () => {
    if (!isUser || selectedRows.length === 0) { // Changed from isAdmin to isUser
      showToast("Please select at least one timesheet to approve.", "warning");
      return;
    }
    setPendingAction('approve');
    setShowReasonModal(true);
  };
  const handleBulkRejectClick = () => {
    if (!isUser || selectedRows.length === 0) { // Changed from isAdmin to isUser
      showToast("Please select at least one timesheet to reject.", "warning");
      return;
    }
    setPendingAction('reject');
    setShowReasonModal(true);
  };


  const handleReasonConfirm = (reason) => {
    setShowReasonModal(false);
    if (pendingAction === 'approve') {
      performBulkApprove(reason);
    } else if (pendingAction === 'reject') {
      performBulkReject(reason);
    }
    setPendingAction(null);
  };
  const handleReasonCancel = () => {
    setShowReasonModal(false);
    setPendingAction(null);
  };


  const performBulkApprove = async (reason) => {
    setActionLoading(true);
    try {
      const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
      const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
      });
      if (response.ok) {
        showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
        const approvedIds = selectedRows.map(row => row.id);
        if (statusFilter === 'Pending') {
          setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
        } else {
          setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
            { ...row, isApproved: true, status: 'approved', selected: false } : row));
        }
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast('Failed to approve some timesheets. Please try again.', "error");
      }
    } catch {
      showToast('Failed to approve timesheets. Please check your connection.', "error");
    } finally {
      setActionLoading(false);
    }
  };


  const performBulkReject = async (reason) => {
    setActionLoading(true);
    try {
      const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
      const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
      });
      if (response.ok) {
        showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
        const rejectedIds = selectedRows.map(row => row.id);
        if (statusFilter === 'Pending') {
          setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
        } else {
          setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
            { ...row, isRejected: true, status: 'rejected', selected: false } : row));
        }
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast('Failed to reject some timesheets. Please try again.', "error");
      }
    } catch {
      showToast('Failed to reject timesheets. Please check your connection.', "error");
    } finally {
      setActionLoading(false);
    }
  };


  // Status options only for User, not Admin
  const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
  const statusOptions = getStatusOptions();
  const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
  const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;


  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
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
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
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
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
      <ReasonModal
        isOpen={showReasonModal}
        action={pendingAction}
        selectedCount={selectedRows.length}
        onConfirm={handleReasonConfirm}
        onCancel={handleReasonCancel}
      />
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
            <h1 className="text-lg font-semibold text-gray-700">
              Welcome, {currentUser?.name}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
          <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
            <div className="flex gap-2">
              <input
                type="date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                title="Filter by Date (MM-DD-YYYY Format)"
              />
              <input
                type="text"
                value={searchEmployeeId}
                onChange={e => setSearchEmployeeId(e.target.value)}
                placeholder="Employee ID"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {isUser && statusOptions.length > 0 && (
              <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
                {statusOptions.map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      statusFilter === status
                        ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
                          : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
                          : 'bg-red-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>


          <div
            className="border border-gray-300 rounded bg-white shadow"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              maxWidth: "none",
              minWidth: 300,
              padding: "0.5rem",
              minHeight: "350px",
              maxHeight: "calc(100vh - 180px)",
              overflow: "hidden",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
              <div className="flex gap-2">
                {/* User shows Approve/Reject buttons */}
                {isUser && statusFilter === 'Pending' && hasPendingRows && (
                  <>
                    <button
                      onClick={handleBulkApproveClick}
                      disabled={actionLoading || selectedRows.length === 0}
                      className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
                    </button>
                    <button
                      onClick={handleBulkRejectClick}
                      disabled={actionLoading || selectedRows.length === 0}
                      className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {/* Admin shows Notify/Import buttons */}
                {isAdmin && (
                  <>
                    <button
                      onClick={handleNotifyClick}
                      disabled={actionLoading || selectedNotifyRows.length === 0}
                      className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
                      onClick={handleImportClick}
                      type="button"
                      disabled={actionLoading}
                    >
                      {actionLoading ? "Importing..." : "Import"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleImportFile}
                      accept=".csv"
                    />
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "calc(100vh - 180px)",
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
                    {columns.map(col => (
                      <th
                        key={col}
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "8px",
                          fontSize: "12px",
                          minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
                          fontWeight: "bold",
                          color: "#1e40af",
                          textAlign: "left",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9"
                        }}>
                        {col === "Select" && isUser ? ( // User gets Select column
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={e => handleSelectAll(e.target.checked)}
                              className="cursor-pointer"
                              disabled={statusFilter !== 'Pending' || !hasPendingRows}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
                          </div>
                        ) : col === "Notify" && isAdmin ? ( // Admin gets Notify column
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <input
                              type="checkbox"
                              checked={notifySelectAll}
                              onChange={e => handleNotifySelectAll(e.target.checked)}
                              className="cursor-pointer"
                            />
                            <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
                          </div>
                        ) : col
                        }
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, rdx) => (
                      <tr
                        key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
                        style={{
                          backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
                            ? "#dbeafe"
                            : rdx % 2 === 0 ? "#f9fafb" : "white"
                        }}
                        onMouseEnter={e =>
                          !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
                        }
                        onMouseLeave={e =>
                          !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
                            rdx % 2 === 0 ? "#f9fafb" : "white")
                        }
                      >
                        {columns.map(col => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
                            }}>
                            {col === "Select" && isUser ? ( // User gets Select checkboxes
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={e => handleRowSelect(rdx, e.target.checked)}
                                className="cursor-pointer"
                                disabled={!isRowActionable(row)}
                              />
                            ) : col === "Notify" && isAdmin ? ( // Admin gets Notify checkboxes
                              <input
                                type="checkbox"
                                checked={row.notifySelected || false}
                                onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
                                className="cursor-pointer"
                              />
                            ) : row[col] || ""}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontStyle: "italic",
                          color: "#666"
                        }}>
                        No data available
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
