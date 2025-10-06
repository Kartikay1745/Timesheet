// // import { useState, useRef, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";


// // // Simple toast function without container
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


// // // IP address fetch utility
// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };


// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type",
// //   "Hours", "Seq No"
// // ];


// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type",
// //   "Hours", "Seq No", "Comment", "IP Address"
// // ];


// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);


// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');


// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";


// //   // SWAPPED: Admin gets Notify column, User gets Select column
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;


// //   useEffect(() => {
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);


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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);


// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);


// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         "Date": item.timesheetDate ? new Date(item.timesheetDate).toLocaleDateString() : "",
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": item.hours || "",
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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
// //           const rowDate = new Date(rowDateString);
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
// //     return filtered;
// //   };


// //   const filteredRows = getFilteredRows();


// //   const handleLogout = () => {
// //     localStorage.removeItem('currentUser');
// //     setCurrentUser(null);
// //     setUserLoaded(false);
// //     showToast("Logged out successfully", "info");
// //     navigate("/");
// //   };


// //   const handleImportClick = () => {
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };


// //   const handleImportFile = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       let projectId = null;
// //       try {
// //         const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
// //         if (pendingResponse.ok) {
// //           const pendingData = await pendingResponse.json();
// //           if (Array.isArray(pendingData) && pendingData.length > 0) {
// //             projectId = pendingData[0].projectId;
// //           }
// //         }
// //       } catch (error) {
// //         console.warn('Failed to fetch projectId, proceeding without it');
// //       }
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
// //         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
// //           const requestBody = importedData.map(item => ({
// //             requestType: "TIMESHEET",
// //             requesterId: 1,
// //             timesheetId: item.timesheetId || item.id,
// //             projectId: projectId,
// //             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
// //           }));
// //           const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(requestBody)
// //           });
// //           if (notifyResponse.ok) {
// //             showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
// //           } else {
// //             showToast('Import successful but notifications failed', "warning");
// //           }
// //         }
        
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };


// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };


// // const handleNotifyClick = async () => {
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
      
      
// //       const notifiedIds = selectedNotifyRows.map(row => row.id);
// //       setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
      
// //       // Clear selections
// //       setSelectedNotifyRows([]);
// //       setNotifySelectAll(false);
      
// //     } else {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     }
// //   } catch {
// //     showToast('Failed to send notifications. Please try again.', "error");
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };


// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return; 
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };


// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return; 
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };


// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };


// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) { 
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) { 
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };


// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };


// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   // Status options only for User, not Admin
// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;


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


// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
// //             </h1>
// //             <button
// //               onClick={handleLogout}
// //               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //             >
// //               Logout
// //             </button>
// //           </div>
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {/* User shows Approve/Reject buttons */}
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin shows Notify/Import buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                     >
// //                       {actionLoading ? "Importing..." : "Import"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "left",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9"
// //                         }}>
// //                         {col === "Select" && isUser ? ( 
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? ( 
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col
// //                         }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: (col === "Select" || col === "Notify") ? "center" : "left"
// //                             }}>
// //                             {col === "Select" && isUser ? ( // User gets Select checkboxes
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? ( 
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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


// // import { useState, useRef, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // // Simple toast function without container - increased time for import messages
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
  
// //   // Increased display time for import-related messages
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
  
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // // IP address fetch utility
// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type",
// //   "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type",
// //   "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [sortConfig, setSortConfig] = useState({ key: 'Date', direction: 'asc' });
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";

// //   // SWAPPED: Admin gets Notify column, User gets Select column
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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

// //   // Format hours to decimal with 2 decimal places
// //   const formatHours = (hours) => {
// //     if (!hours && hours !== 0) return '';
// //     const numHours = parseFloat(hours);
// //     if (isNaN(numHours)) return hours;
// //     return numHours.toFixed(2);
// //   };

// //   // Get sorted rows - automatically sorts by Date and Employee ID in ascending order
// //   const getSortedRows = (rowsToSort) => {
// //     return [...rowsToSort].sort((a, b) => {
// //       // Primary sort by Date
// //       let aDate = new Date(a.originalDate || a["Date"]);
// //       let bDate = new Date(b.originalDate || b["Date"]);
// //       if (isNaN(aDate.getTime())) aDate = new Date(0);
// //       if (isNaN(bDate.getTime())) bDate = new Date(0);
      
// //       if (aDate.getTime() !== bDate.getTime()) {
// //         return aDate.getTime() - bDate.getTime(); // Ascending order
// //       }
      
// //       // Secondary sort by Employee ID if dates are equal
// //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
// //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
      
// //       return aEmpId.localeCompare(bEmpId); // Ascending order
// //     });
// //   };

// //   useEffect(() => {
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate, // Store original date for sorting
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   const handleImportClick = () => {
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       let projectId = null;
// //       try {
// //         const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
// //         if (pendingResponse.ok) {
// //           const pendingData = await pendingResponse.json();
// //           if (Array.isArray(pendingData) && pendingData.length > 0) {
// //             projectId = pendingData[0].projectId;
// //           }
// //         }
// //       } catch (error) {
// //         console.warn('Failed to fetch projectId, proceeding without it');
// //       }
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
// //         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
// //           const requestBody = importedData.map(item => ({
// //             requestType: "TIMESHEET",
// //             requesterId: 1,
// //             timesheetId: item.timesheetId || item.id,
// //             projectId: projectId,
// //             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
// //           }));
// //           const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify(requestBody)
// //           });
// //           if (notifyResponse.ok) {
// //             showToast(`Notifications sent for ${importedData.length} imported timesheets!`, "success");
// //           } else {
// //             showToast('Import successful but notifications failed', "warning");
// //           }
// //         }
        
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// // const handleNotifyClick = async () => {
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
      
      
// //       const notifiedIds = selectedNotifyRows.map(row => row.id);
// //       setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
      
// //       // Clear selections
// //       setSelectedNotifyRows([]);
// //       setNotifySelectAll(false);
      
// //     } else {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     }
// //   } catch {
// //     showToast('Failed to send notifications. Please try again.', "error");
// //   } finally {
// //     setActionLoading(false);
// //   }
// // };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return; 
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return; 
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) { 
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) { 
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Status options only for User, not Admin
// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
// //             </h1>
// //             <button
// //               onClick={handleLogout}
// //               className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //             >
// //               Logout
// //             </button>
// //           </div>
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {/* User shows Approve/Reject buttons */}
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin shows Notify/Import buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                     >
// //                       {actionLoading ? "Importing..." : "Import"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? ( 
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? ( 
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col
// //                         }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? ( // User gets Select checkboxes
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? ( 
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const UpdatePasswordModal = ({
// //   isOpen, userId, onClose
// // }) => {
// //   const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
// //   const [loading, setLoading] = useState(false);
// //   if (!isOpen) return null;
// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   const handleSubmit = async () => {
// //     if (!form.currentPassword || !form.newPassword) {
// //       showToast('Both fields are required', 'warning');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/update-password`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(form)
// //       });
// //       if (res.ok) {
// //         showToast('Password updated successfully', 'success');
// //         onClose();
// //       } else {
// //         const msg = await res.text();
// //         showToast(msg || 'Update failed', 'error');
// //       }
// //     } catch {
// //       showToast('Update failed', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
// //       <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
// //         <h2 className="text-lg font-semibold mb-4">Update Password</h2>
// //         <input
// //           name="currentPassword"
// //           type="password"
// //           className="w-full mb-3 px-3 py-2 border rounded"
// //           placeholder="Current Password"
// //           value={form.currentPassword}
// //           onChange={handleChange}
// //           disabled={loading}
// //         />
// //         <input
// //           name="newPassword"
// //           type="password"
// //           className="w-full mb-4 px-3 py-2 border rounded"
// //           placeholder="New Password"
// //           value={form.newPassword}
// //           onChange={handleChange}
// //           disabled={loading}
// //         />
// //         <div className="flex justify-end gap-4">
// //           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 bg-blue-600 text-white rounded"
// //             disabled={loading}
// //           >
// //             {loading ? 'Updating...' : 'Update'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const ResetPasswordModal = ({
// //   isOpen, userId, onClose
// // }) => {
// //   const [loading, setLoading] = useState(false);
// //   if (!isOpen) return null;
// //   const handleSubmit = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/reset-password`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //       });
// //       if (res.ok) {
// //         showToast('Password reset successfully', 'success');
// //         onClose();
// //       } else {
// //         const msg = await res.text();
// //         showToast(msg || 'Reset failed', 'error');
// //       }
// //     } catch {
// //       showToast('Reset failed', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
// //       <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
// //         <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
// //         <p className="text-sm mb-6">Are you sure you want to reset your password?</p>
// //         <div className="flex justify-end gap-4">
// //           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 bg-red-600 text-white rounded"
// //             disabled={loading}
// //           >
// //             {loading ? 'Resetting...' : 'Reset'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [userId, setUserId] = useState('');
// //   const [showUpdateModal, setShowUpdateModal] = useState(false);
// //   const [showResetModal, setShowResetModal] = useState(false);
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const resp = await fetch(`https://timesheet-latest.onrender.com/api/User`);
// //         if (!resp.ok) return;
// //         const arr = await resp.json();
// //         const curr = localStorage.getItem('currentUser');
// //         if (curr && arr && Array.isArray(arr)) {
// //           const parsedCurr = JSON.parse(curr);
// //           const found = arr.find(u => u.username === parsedCurr.username);
// //           setUserId(found ? found.userId : '');
// //         }
// //       } catch {}
// //     };
// //     fetchUser();
// //   }, [userLoaded]);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   const handleImportClick = () => {
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   // Only Import logic, no Notify calls
// //   const handleImportFile = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   // Only Notify logic, no Import calls
// //   const handleNotifyClick = async () => {
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleExportClick = async () => {
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
// //         a.download = 'exported_timesheets.csv';
// //         document.body.appendChild(a);
// //         a.click();
// //         a.remove();
// //         window.URL.revokeObjectURL(url);
// //         showToast('Export succeeded', 'success');
// //       } else {
// //         showToast('Export failed', 'error');
// //       }
// //     } catch {
// //       showToast('Export failed', 'error');
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />
// //       {isUser && (
// //         <>
// //           <UpdatePasswordModal isOpen={showUpdateModal} userId={userId} onClose={() => setShowUpdateModal(false)} />
// //           <ResetPasswordModal isOpen={showResetModal} userId={userId} onClose={() => setShowResetModal(false)} />
// //         </>
// //       )}
// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
// //             </h1>
// //             <div className="flex gap-2">
// //               {isUser && (
// //                 <>
// //                   <button
// //                     onClick={() => setShowUpdateModal(true)}
// //                     className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors"
// //                   >Update Password</button>
// //                   <button
// //                     onClick={() => setShowResetModal(true)}
// //                     className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors"
// //                   >Reset Password</button>
// //                 </>
// //               )}
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium"
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                     >
// //                       {actionLoading ? "Importing..." : "Import"}
// //                     </button>
// //                     <button
// //                       className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-900 transition-colors text-xs font-medium"
// //                       onClick={handleExportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                     >
// //                       {actionLoading ? "Exporting..." : "Export"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const UpdatePasswordModal = ({ isOpen, userId, onClose }) => {
// //   const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
// //   const [loading, setLoading] = useState(false);
  
// //   useEffect(() => {
// //     if (isOpen) {
// //       setForm({ currentPassword: '', newPassword: '' });
// //       setLoading(false);
// //     }
// //   }, [isOpen]);

// //   if (!isOpen) return null;
  
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
    
// //     if (!form.currentPassword || !form.newPassword) {
// //       showToast('Both fields are required', 'warning');
// //       return;
// //     }
    
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/update-password`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           currentPassword: form.currentPassword,
// //           newPassword: form.newPassword
// //         })
// //       });
// //       if (res.ok) {
// //         showToast('Password updated successfully', 'success');
// //         setForm({ currentPassword: '', newPassword: '' });
// //         onClose();
// //       } else {
// //         const errorText = await res.text();
// //         showToast(errorText || 'Update failed', 'error');
// //       }
// //     } catch (error) {
// //       showToast('Update failed', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
// //       <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
// //         <h2 className="text-lg font-semibold mb-4">Update Password</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             name="currentPassword"
// //             type="password"
// //             className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             placeholder="Current Password"
// //             value={form.currentPassword}
// //             onChange={handleChange}
// //             disabled={loading}
// //             required
// //           />
// //           <input
// //             name="newPassword"
// //             type="password"
// //             className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             placeholder="New Password"
// //             value={form.newPassword}
// //             onChange={handleChange}
// //             disabled={loading}
// //             required
// //           />
// //           <div className="flex justify-end gap-4">
// //             <button 
// //               type="button" 
// //               onClick={onClose} 
// //               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
// //               disabled={loading}
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
// //               disabled={loading}
// //             >
// //               {loading ? 'Updating...' : 'Update'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // const ResetPasswordModal = ({ isOpen, userId, onClose }) => {
// //   const [loading, setLoading] = useState(false);
  
// //   useEffect(() => {
// //     if (isOpen) {
// //       setLoading(false);
// //     }
// //   }, [isOpen]);

// //   if (!isOpen) return null;
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
    
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/reset-password`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //       });
// //       if (res.ok) {
// //         showToast('Password reset successfully', 'success');
// //         onClose();
// //       } else {
// //         const errorText = await res.text();
// //         showToast(errorText || 'Reset failed', 'error');
// //       }
// //     } catch (error) {
// //       showToast('Reset failed', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
// //       <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
// //         <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
// //         <p className="text-sm mb-6 text-gray-600">Are you sure you want to reset your password? This action cannot be undone.</p>
// //         <div className="flex justify-end gap-4">
// //           <button 
// //             type="button" 
// //             onClick={onClose} 
// //             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
// //             disabled={loading}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSubmit}
// //             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
// //             disabled={loading}
// //           >
// //             {loading ? 'Resetting...' : 'Reset Password'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const [userId, setUserId] = useState('');
// //   const [showUpdateModal, setShowUpdateModal] = useState(false);
// //   const [showResetModal, setShowResetModal] = useState(false);
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

// //   // Fetch user ID for password operations
// //   useEffect(() => {
// //     const fetchUserId = async () => {
// //       if (!currentUser?.username || !isUser) return;
      
// //       try {
// //         const response = await fetch('https://timesheet-latest.onrender.com/api/User');
// //         if (response.ok) {
// //           const users = await response.json();
// //           if (Array.isArray(users)) {
// //             const foundUser = users.find(user => user.username === currentUser.username);
// //             if (foundUser && foundUser.userId) {
// //               setUserId(foundUser.userId);
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.warn('Failed to fetch user ID:', error);
// //       }
// //     };

// //     if (userLoaded && currentUser) {
// //       fetchUserId();
// //     }
// //   }, [userLoaded, currentUser, isUser]);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   // Separate handlers to prevent multiple triggers
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
// //         // Refresh data after successful import
// //         fetchData();
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //       // Reset file input
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };

// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
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

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />
      
// //       {/* Password Modals - Only show for Users */}
// //       {isUser && (
// //         <>
// //           <UpdatePasswordModal 
// //             isOpen={showUpdateModal} 
// //             userId={userId} 
// //             onClose={() => setShowUpdateModal(false)} 
// //           />
// //           <ResetPasswordModal 
// //             isOpen={showResetModal} 
// //             userId={userId} 
// //             onClose={() => setShowResetModal(false)} 
// //           />
// //         </>
// //       )}

// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
// //             </h1>
// //             <div className="flex gap-2">
// //               {/* Password buttons - Only show for Users */}
// //               {isUser && (
// //                 <>
// //                   <button
// //                     onClick={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       setShowUpdateModal(true);
// //                     }}
// //                     className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors"
// //                   >
// //                     Update Password
// //                   </button>
// //                   <button
// //                     onClick={(e) => {
// //                       e.preventDefault();
// //                       e.stopPropagation();
// //                       setShowResetModal(true);
// //                     }}
// //                     className="bg-red-600 text-white px-3 py-1.5 rounded text-xs hover:bg-red-700 transition-colors"
// //                   >
// //                     Reset Password
// //                   </button>
// //                 </>
// //               )}
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //             </div>
// //           </div>
          
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {/* User buttons */}
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Import"}
// //                     </button>
// //                     <button
// //                       onClick={handleExportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Export"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   // Separate handlers to prevent multiple triggers
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
// //         // Refresh data after successful import
// //         fetchData();
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //       // Reset file input
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };

// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
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

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />

// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {/* User buttons */}
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Import"}
// //                     </button>
// //                     <button
// //                       onClick={handleExportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Export"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const columnsImportAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsExport = [
// //   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState('timesheet'); // 'timesheet', 'import', 'export'
// //   const [rows, setRows] = useState([]);
// //   const [importRows, setImportRows] = useState([]);
// //   const [exportRows, setExportRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [importLoading, setImportLoading] = useState(false);
// //   const [exportLoading, setExportLoading] = useState(false);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
  
// //   // Get columns based on active tab and user role
// //   const getColumns = () => {
// //     if (activeTab === 'import') {
// //       return isAdmin ? columnsImportAdmin : columnsViewer;
// //     } else if (activeTab === 'export') {
// //       return columnsExport;
// //     } else {
// //       return isAdmin ? columnsAdmin : columnsViewer;
// //     }
// //   };
  
// //   const columns = getColumns();
// //   const colWidth = 120;
// //   const minTableWidth = columns.length * colWidth;

// //   // Get current data based on active tab
// //   const getCurrentRows = () => {
// //     if (activeTab === 'import') return importRows;
// //     if (activeTab === 'export') return exportRows;
// //     return rows;
// //   };

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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter, activeTab]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) {
// //       if (activeTab === 'timesheet') {
// //         fetchData();
// //       }
// //     }
// //   }, [userLoaded, currentUser, isAdmin, statusFilter, activeTab]);

// //   // Fetch export data when export tab is selected
// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username && activeTab === 'export') {
// //       fetchExportData();
// //     }
// //   }, [userLoaded, currentUser, activeTab]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //          apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
// //         // apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
// //       setRows([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchExportData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setExportLoading(true);
// //       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=Approved`;
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
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
// //       setExportRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
// //     } catch (error) {
// //       showToast('Failed to load export data. Please check your connection.', "error");
// //       setExportRows([]);
// //     } finally {
// //       setExportLoading(false);
// //     }
// //   };

// //   const getFilteredRows = () => {
// //     let filtered = getCurrentRows();
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

// //   const handleTabClick = (tab) => {
// //     setActiveTab(tab);
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //     setSearchDate('');
// //     setSearchEmployeeId('');
// //   };

// //   // Import file handler
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setImportLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
        
// //         // Process imported data and add to import tab
// //         const mappedImportData = Array.isArray(importedData) ? importedData.map((item, index) => ({
// //           id: item.timesheetId || item.id || `import-${index}`,
// //           notifySelected: false,
// //           selected: false,
// //           originalDate: item.timesheetDate,
// //           "Date": formatDate(item.timesheetDate),
// //           "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //           "Fiscal Year": item.fiscalYear || "",
// //           "Period": item.period || "",
// //           "Project ID": item.projectId || "",
// //           "PLC": item.projectLaborCategory || "",
// //           "Pay Type": item.payType || "",
// //           "Hours": formatHours(item.hours),
// //           "Seq No": item.sequenceNumber || "",
// //           "Comment": item.comment || "",
// //           "IP Address": item.ipAddress || ""
// //         })) : [];
        
// //         setImportRows(mappedImportData);
// //         setActiveTab('import');
        
// //         showToast(`Successfully imported ${mappedImportData.length} records from: ${file.name}`, "success");
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setImportLoading(false);
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };

// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         if (activeTab === 'import') {
// //           setImportRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         }
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
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

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const currentRows = getCurrentRows();
// //     const updatedRows = [...currentRows];
// //     const actualRowIndex = currentRows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
    
// //     if (activeTab === 'import') {
// //       setImportRows(updatedRows);
// //     } else {
// //       setRows(updatedRows);
// //     }
    
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const currentRows = getCurrentRows();
// //     const updatedRows = [...currentRows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = currentRows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
    
// //     if (activeTab === 'import') {
// //       setImportRows(updatedRows);
// //     } else {
// //       setRows(updatedRows);
// //     }
    
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const currentRows = getCurrentRows();
// //     const updatedRows = [...currentRows];
// //     const actualRowIndex = currentRows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const currentRows = getCurrentRows();
// //     const updatedRows = [...currentRows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = currentRows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading && activeTab === 'timesheet') {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (exportLoading && activeTab === 'export') {
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
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />

// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
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

// //           {/* Tabs */}
// //           <div className="w-full mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <div className="flex border-b border-gray-200">
// //               <button
// //                 onClick={() => handleTabClick('timesheet')}
// //                 className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
// //                   activeTab === 'timesheet'
// //                     ? 'border-blue-500 text-blue-600 bg-blue-50'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 Timesheet
// //               </button>
// //               {isAdmin && (
// //                 <>
// //                   <button
// //                     onClick={() => handleTabClick('import')}
// //                     className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
// //                       activeTab === 'import'
// //                         ? 'border-blue-500 text-blue-600 bg-blue-50'
// //                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                     }`}
// //                   >
// //                     Import
// //                   </button>
// //                   <button
// //                     onClick={() => handleTabClick('export')}
// //                     className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
// //                       activeTab === 'export'
// //                         ? 'border-blue-500 text-blue-600 bg-blue-50'
// //                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                     }`}
// //                   >
// //                     Export
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
          
// //           {/* Search and Status Filters - Only show for timesheet tab or if user role */}
// //           {(activeTab === 'timesheet' || isUser) && (
// //             <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //               <div className="flex gap-2">
// //                 <input
// //                   type="date"
// //                   value={searchDate}
// //                   onChange={e => setSearchDate(e.target.value)}
// //                   className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                   title="Filter by Date (MM-DD-YYYY Format)"
// //                 />
// //                 <input
// //                   type="text"
// //                   value={searchEmployeeId}
// //                   onChange={e => setSearchEmployeeId(e.target.value)}
// //                   placeholder="Employee ID"
// //                   className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                 />
// //               </div>
// //               {isUser && statusOptions.length > 0 && activeTab === 'timesheet' && (
// //                 <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                   <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                   {statusOptions.map(status => (
// //                     <button
// //                       key={status}
// //                       onClick={() => setStatusFilter(status)}
// //                       className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                         statusFilter === status
// //                           ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                             : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                             : 'bg-red-600 text-white shadow-sm'
// //                           : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                       }`}
// //                     >
// //                       {status}
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

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
// //                 {/* User buttons - Only for timesheet tab */}
// //                 {isUser && activeTab === 'timesheet' && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     {/* Show notify button for timesheet and import tabs */}
// //                     {(activeTab === 'timesheet' || activeTab === 'import') && (
// //                       <button
// //                         onClick={handleNotifyClick}
// //                         disabled={actionLoading || selectedNotifyRows.length === 0}
// //                         className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                       </button>
// //                     )}
// //                     {/* Show import button for timesheet tab */}
// //                     {activeTab === 'timesheet' && (
// //                       <button
// //                         onClick={handleImportClick}
// //                         type="button"
// //                         disabled={importLoading}
// //                         className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         {importLoading ? "Processing..." : "Import"}
// //                       </button>
// //                     )}
// //                     {/* Show export button for export tab */}
// //                     {activeTab === 'export' && (
// //                       <button
// //                         onClick={handleExportClick}
// //                         type="button"
// //                         disabled={actionLoading}
// //                         className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         {actionLoading ? "Processing..." : "Export CSV"}
// //                       </button>
// //                     )}
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin && activeTab !== 'export' ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser && activeTab === 'timesheet' ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin && activeTab !== 'export' ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         {activeTab === 'import' 
// //                           ? importLoading 
// //                             ? "Loading imported data..." 
// //                             : "No imported data available. Click Import to upload CSV files."
// //                           : activeTab === 'export'
// //                           ? "No approved data available for export"
// //                           : "No data available"
// //                         }
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [statusFilter, setStatusFilter] = useState('Pending');
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, [statusFilter]);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin, statusFilter]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=${statusFilter}`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   // Import handlers
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
        
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
        
// //         // Automatically refresh data to show imported records
// //         await fetchData();
        
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };

// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !approvedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //             { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         if (statusFilter === 'Pending') {
// //           setRows(prevRows => prevRows.filter(row => !rejectedIds.includes(row.id)));
// //         } else {
// //           setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //             { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         }
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const getStatusOptions = () => isUser ? ['Pending', 'Approved', 'Rejected'] : [];
// //   const statusOptions = getStatusOptions();
// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />

// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
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
// //             {isUser && statusOptions.length > 0 && (
// //               <div className="flex gap-1 p-2 bg-gray-50 rounded-lg border border-gray-200">
// //                 <span className="text-xs font-medium text-gray-600 mr-2 self-center">Status:</span>
// //                 {statusOptions.map(status => (
// //                   <button
// //                     key={status}
// //                     onClick={() => setStatusFilter(status)}
// //                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
// //                       statusFilter === status
// //                         ? status === 'Pending' ? 'bg-orange-600 text-white shadow-sm'
// //                           : status === 'Approved' ? 'bg-green-600 text-white shadow-sm'
// //                           : 'bg-red-600 text-white shadow-sm'
// //                         : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
// //                     }`}
// //                   >
// //                     {status}
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
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
// //                 {/* User buttons */}
// //                 {isUser && statusFilter === 'Pending' && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Import"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={statusFilter !== 'Pending' || !hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };


// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };


// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];


// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// // ];


// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);


// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');


// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);


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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, []);


// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin]);


// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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


// //   // Import handlers
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };


// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
        
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
        
// //         // Automatically refresh data to show imported records
// //         await fetchData();
        
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };


// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };


// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };


// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };


// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };


// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };


// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };


// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };


// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //           { ...row, isApproved: true, status: 'approved', selected: false } : row));
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //           { ...row, isRejected: true, status: 'rejected', selected: false } : row));
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };


// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;


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


// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }


// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />


// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
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
// //                 {/* User buttons */}
// //                 {isUser && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Import"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={!hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center"
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// // import { useState, useRef, useEffect } from "react";
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
// //   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
// //   setTimeout(() => {
// //     toast.style.opacity = '0';
// //     setTimeout(() => document.body.removeChild(toast), 300);
// //   }, displayTime);
// // };

// // const getUserIPAddress = async () => {
// //   try {
// //     const endpoints = [
// //       'https://api.ipify.org?format=json',
// //       'https://ipapi.co/json/',
// //       'https://httpbin.org/ip'
// //     ];
// //     for (const url of endpoints) {
// //       try {
// //         const res = await fetch(url);
// //         if (res.ok) {
// //           const data = await res.json();
// //           return data.ip || data.origin || '';
// //         }
// //       } catch { }
// //     }
// //     return '';
// //   } catch {
// //     return '';
// //   }
// // };

// // const columnsAdmin = [
// //   "Notify", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// // ];

// // const columnsViewer = [
// //   "Select", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "Status", "IP Address"
// // ];

// // const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
// //   const [reason, setReason] = useState('');
// //   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
// //   if (!isOpen) return null;       
// //   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
// //   const handleKeyPress = e => {
// //     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
// //     else if (e.key === 'Escape') onCancel();
// //   };
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
// //       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
// //         <div className="mb-4">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
// //           </h3>
// //           <p className="text-sm text-gray-600">
// //             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
// //           </p>
// //         </div>
// //         <div className="mb-4">
// //           <textarea
// //             value={reason}
// //             onChange={e => setReason(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
// //             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             maxLength={500}
// //             autoFocus
// //           />
// //           <div className="text-xs text-gray-500 mt-1">
// //             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
// //           </div>
// //         </div>
// //         <div className="flex justify-end gap-3">
// //           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
// //           <button
// //             onClick={handleConfirm}
// //             disabled={!reason.trim()}
// //             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
// //               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
// //             }`}
// //           >
// //             {action === 'approve' ? 'Approve' : 'Reject'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function MainTable() {
// //   const navigate = useNavigate();
// //   const [rows, setRows] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [selectedRows, setSelectedRows] = useState([]);
// //   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
// //   const [selectAll, setSelectAll] = useState(false);
// //   const [notifySelectAll, setNotifySelectAll] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [userLoaded, setUserLoaded] = useState(false);
// //   const [searchDate, setSearchDate] = useState('');
// //   const [searchEmployeeId, setSearchEmployeeId] = useState('');
// //   const fileInputRef = useRef(null);

// //   const [showReasonModal, setShowReasonModal] = useState(false);
// //   const [pendingAction, setPendingAction] = useState(null);
// //   const [userIpAddress, setUserIpAddress] = useState('');

// //   const isAdmin = currentUser?.role === "Admin";
// //   const isUser = currentUser?.role === "User";
// //   const columns = isAdmin ? columnsAdmin : columnsViewer;
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

// //   const getStatusStyle = (status) => {
// //     switch (status?.toUpperCase()) {
// //       case 'APPROVED':
// //         return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
// //       case 'REJECTED':
// //         return { backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 'bold' };
// //       case 'PENDING':
// //         return { backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' };
// //       case 'NOTIFIED':
// //         return { backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' };
// //       default:
// //         return { backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 'normal' };
// //     }
// //   };

// //   useEffect(() => {
// //     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
// //   }, []);

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
// //     setSelectedRows([]);
// //     setSelectedNotifyRows([]);
// //     setSelectAll(false);
// //     setNotifySelectAll(false);
// //   }, []);

// //   useEffect(() => {
// //     if (userLoaded && currentUser && currentUser.username) fetchData();
// //   }, [userLoaded, currentUser, isAdmin]);

// //   const fetchData = async () => {
// //     if (!userLoaded || !currentUser || !currentUser.username) return;
// //     try {
// //       setLoading(true);
// //       let apiUrl = "";
// //       if (isAdmin) {
// //         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
// //       } else if (isUser) {
// //         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
// //       } else {
// //         setRows([]);
// //         setLoading(false);
// //         return;
// //       }
// //       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
// //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// //       const apiData = await response.json();
// //       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
// //         id: item.timesheetId || item.id || `fallback-${index}`,
// //         requestId: item.requestId || item.id,
// //         levelNo: item.levelNo || 1,
// //         selected: false,
// //         notifySelected: false,
// //         isApproved: item.approvalStatus === 'APPROVED' || false,
// //         isRejected: item.approvalStatus === 'REJECTED' || false,
// //         isNotified: item.approvalStatus === 'NOTIFIED' || false,
// //         status: item.approvalStatus?.toLowerCase() || 'pending',
// //         originalDate: item.timesheetDate,
// //         "Date": formatDate(item.timesheetDate),
// //         "Employee ID": item.employee?.employeeId || item.employeeId || "",
// //         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
// //         "Fiscal Year": item.fiscalYear || "",
// //         "Period": item.period || "",
// //         "Project ID": item.projectId || "",
// //         "Account": item.accountId || "",
// //         "Org": item.organizationId || "",
// //         "PLC": item.projectLaborCategory || "",
// //         "Pay Type": item.payType || "",
// //         "Hours": formatHours(item.hours),
// //         "Seq No": item.sequenceNumber || "",
// //         "Comment": item.comment || "",
// //         "Status": item.approvalStatus || "PENDING",
// //         "IP Address": item.ipAddress || ""
// //       })) : [];
// //       setRows(mappedData);
// //       showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
// //     } catch (error) {
// //       showToast('Failed to load timesheet data. Please check your connection.', "error");
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

// //   // Import handlers
// //   const handleImportClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
// //     if (fileInputRef.current) fileInputRef.current.click();
// //   };

// //   const handleImportFile = async (e) => {
// //     e.stopPropagation();
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     if (!file.name.toLowerCase().endsWith('.csv')) {
// //       showToast('Please select a CSV file', "error");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append('file', file);
// //     try {
// //       setActionLoading(true);
// //       const importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
// //         method: 'POST',
// //         body: formData
// //       });
// //       if (importResponse.ok) {
// //         const importedData = await importResponse.json();
        
// //         if (importedData && importedData.message) {
// //           showToast(importedData.message, "success");
// //         } else if (Array.isArray(importedData)) {
// //           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
// //         } else {
// //           showToast(`Successfully imported: ${file.name}`, "success");
// //         }
        
// //         // Automatically refresh data to show imported records
// //         await fetchData();
        
// //       } else {
// //         const errorResponse = await importResponse.json().catch(() => null);
// //         const errorText = errorResponse?.message || await importResponse.text();
// //         showToast('Import failed: ' + errorText, "error");
// //       }
// //     } catch (error) {
// //       showToast('Import failed. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //       if (fileInputRef.current) {
// //         fileInputRef.current.value = '';
// //       }
// //     }
// //   };

// //   const handleNotifyClick = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (actionLoading) return;
    
// //     if (selectedNotifyRows.length === 0) {
// //       showToast('Please select at least one timesheet to notify.', "warning");
// //       return;
// //     }
// //     try {
// //       setActionLoading(true);
// //       const requestBody = selectedNotifyRows.map(row => ({
// //         requestType: "TIMESHEET",
// //         requesterId: 1,
// //         timesheetId: row.id,
// //         ProjectId: row["Project ID"],
// //         requestData: `Notification for timesheet ${row.id}`
// //       }));
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
// //         const notifiedIds = selectedNotifyRows.map(row => row.id);
// //         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
// //         setSelectedNotifyRows([]);
// //         setNotifySelectAll(false);
// //       } else {
// //         showToast('Failed to send notifications. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to send notifications. Please try again.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleNotifyRowSelect = (rowIndex, isSelected) => {
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].notifySelected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedNotifyRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setNotifySelectAll(false);
// //     }
// //   };

// //   const handleNotifySelectAll = (isSelected) => {
// //     setNotifySelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     filteredRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedNotifyRows(isSelected ? [...filteredRows] : []);
// //   };

// //   const handleRowSelect = (rowIndex, isSelected) => {
// //     if (!isUser) return;
// //     const updatedRows = [...rows];
// //     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
// //     updatedRows[actualRowIndex].selected = isSelected;
// //     setRows(updatedRows);
// //     const rowData = filteredRows[rowIndex];
// //     if (isSelected) {
// //       setSelectedRows(prev => [...prev, rowData]);
// //     } else {
// //       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
// //       setSelectAll(false);
// //     }
// //   };

// //   const handleSelectAll = (isSelected) => {
// //     if (!isUser) return;
// //     setSelectAll(isSelected);
// //     const updatedRows = [...rows];
// //     const actionableRows = filteredRows.filter(row => isRowActionable(row));
// //     actionableRows.forEach(filteredRow => {
// //       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
// //       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
// //     });
// //     setRows(updatedRows);
// //     setSelectedRows(isSelected ? [...actionableRows] : []);
// //   };

// //   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
// //     return selectedRows.map(row => ({
// //       requestId: row.requestId || row.id,
// //       levelNo: row.levelNo || 1,
// //       approverUserId: 1,
// //       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
// //       ipAddress: ipAddress
// //     }));
// //   };

// //   const handleBulkApproveClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to approve.", "warning");
// //       return;
// //     }
// //     setPendingAction('approve');
// //     setShowReasonModal(true);
// //   };
  
// //   const handleBulkRejectClick = () => {
// //     if (!isUser || selectedRows.length === 0) {
// //       showToast("Please select at least one timesheet to reject.", "warning");
// //       return;
// //     }
// //     setPendingAction('reject');
// //     setShowReasonModal(true);
// //   };

// //   const handleReasonConfirm = (reason) => {
// //     setShowReasonModal(false);
// //     if (pendingAction === 'approve') {
// //       performBulkApprove(reason);
// //     } else if (pendingAction === 'reject') {
// //       performBulkReject(reason);
// //     }
// //     setPendingAction(null);
// //   };
  
// //   const handleReasonCancel = () => {
// //     setShowReasonModal(false);
// //     setPendingAction(null);
// //   };

// //   const performBulkApprove = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkApprove', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const approvedIds = selectedRows.map(row => row.id);
// //         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
// //           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to approve some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to approve timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const performBulkReject = async (reason) => {
// //     setActionLoading(true);
// //     try {
// //       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
// //       const response = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkReject', {
// //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
// //       });
// //       if (response.ok) {
// //         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
// //         const rejectedIds = selectedRows.map(row => row.id);
// //         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
// //           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
// //         setSelectedRows([]);
// //         setSelectAll(false);
// //       } else {
// //         showToast('Failed to reject some timesheets. Please try again.', "error");
// //       }
// //     } catch (error) {
// //       showToast('Failed to reject timesheets. Please check your connection.', "error");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const isRowActionable = row => row.status === 'pending' && !row.isApproved && !row.isRejected;
// //   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

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

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
// //         <div className="flex-1 flex items-center justify-center">
// //           <div className="flex items-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //             <span className="ml-2">Loading timesheet data...</span>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
// //       <ReasonModal
// //         isOpen={showReasonModal}
// //         action={pendingAction}
// //         selectedCount={selectedRows.length}
// //         onConfirm={handleReasonConfirm}
// //         onCancel={handleReasonCancel}
// //       />

// //       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
// //         <div className="w-full flex flex-col items-center">
// //           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
// //             <h1 className="text-lg font-semibold text-gray-700">
// //               Welcome, {currentUser?.name}
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
// //                 {/* User buttons */}
// //                 {isUser && hasPendingRows && (
// //                   <>
// //                     <button
// //                       onClick={handleBulkApproveClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleBulkRejectClick}
// //                       disabled={actionLoading || selectedRows.length === 0}
// //                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
// //                     </button>
// //                   </>
// //                 )}
// //               </div>
// //               <div className="flex gap-2">
// //                 {/* Admin buttons */}
// //                 {isAdmin && (
// //                   <>
// //                     <button
// //                       onClick={handleNotifyClick}
// //                       disabled={actionLoading || selectedNotifyRows.length === 0}
// //                       className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
// //                     </button>
// //                     <button
// //                       onClick={handleImportClick}
// //                       type="button"
// //                       disabled={actionLoading}
// //                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       {actionLoading ? "Processing..." : "Import"}
// //                     </button>
// //                     <input
// //                       ref={fileInputRef}
// //                       type="file"
// //                       className="hidden"
// //                       onChange={handleImportFile}
// //                       accept=".csv"
// //                     />
// //                   </>
// //                 )}
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
// //                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                           fontWeight: "bold",
// //                           color: "#1e40af",
// //                           textAlign: "center",
// //                           whiteSpace: "nowrap",
// //                           backgroundColor: "#f1f5f9",
// //                           cursor: "default",
// //                           userSelect: "none"
// //                         }}>
// //                         {col === "Select" && isUser ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={selectAll}
// //                               onChange={e => handleSelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                               disabled={!hasPendingRows}
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col === "Notify" && isAdmin ? (
// //                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
// //                             <input
// //                               type="checkbox"
// //                               checked={notifySelectAll}
// //                               onChange={e => handleNotifySelectAll(e.target.checked)}
// //                               className="cursor-pointer"
// //                             />
// //                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
// //                           </div>
// //                         ) : col }
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredRows.length > 0 ? (
// //                     filteredRows.map((row, rdx) => (
// //                       <tr
// //                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
// //                         style={{
// //                           backgroundColor: (row.selected && isUser) || (row.notifySelected && isAdmin)
// //                             ? "#dbeafe"
// //                             : rdx % 2 === 0 ? "#f9fafb" : "white"
// //                         }}
// //                         onMouseEnter={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
// //                         }
// //                         onMouseLeave={e =>
// //                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
// //                             rdx % 2 === 0 ? "#f9fafb" : "white")
// //                         }
// //                       >
// //                         {columns.map(col => (
// //                           <td
// //                             key={col}
// //                             style={{
// //                               border: "1px solid #e5e7eb",
// //                               padding: "8px",
// //                               fontSize: "11px",
// //                               minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
// //                               whiteSpace: "nowrap",
// //                               textAlign: "center",
// //                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
// //                             }}>
// //                             {col === "Select" && isUser ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.selected || false}
// //                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                                 disabled={!isRowActionable(row)}
// //                               />
// //                             ) : col === "Notify" && isAdmin ? (
// //                               <input
// //                                 type="checkbox"
// //                                 checked={row.notifySelected || false}
// //                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
// //                                 className="cursor-pointer"
// //                               />
// //                             ) : row[col] || ""}
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
// //                         No data available
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

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

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
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Select", "Status", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'APPROVED':
//         return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
//       case 'REJECTED':
//         return { backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 'bold' };
//       case 'PENDING':
//         return { backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' };
//       case 'NOTIFIED':
//         return { backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' };
//       default:
//         return { backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 'normal' };
//     }
//   };

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
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
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
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.approvalStatus || "PENDING",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
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
//           const rowDate = new Date(row.originalDate || rowDateString);
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
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Import handlers
//   const handleImportClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   // const handleImportFile = async (e) => {
//   //   e.stopPropagation();
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
        
//   //       // Automatically refresh data to show imported records
//   //       await fetchData();
        
//   //     } else {
//   //       const errorResponse = await importResponse.json().catch(() => null);
//   //       const errorText = errorResponse?.message || await importResponse.text();
//   //       showToast('Import failed: ' + errorText, "error");
//   //     }
//   //   } catch (error) {
//   //     showToast('Import failed. Please try again.', "error");
//   //   } finally {
//   //     setActionLoading(false);
//   //     if (fileInputRef.current) {
//   //       fileInputRef.current.value = '';
//   //     }
//   //   }
//   // };
//   //   const handleImportFile = async (e) => {
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
//   //     let projectId = null;
//   //     try {
//   //       const pendingResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals');
//   //       if (pendingResponse.ok) {
//   //         const pendingData = await pendingResponse.json();
//   //         if (Array.isArray(pendingData) && pendingData.length > 0) {
//   //           projectId = pendingData[0].projectId;
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.warn('Failed to fetch projectId, proceeding without it');
//   //     }
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
//   //           projectId: projectId,
//   //           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//   //         }));
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
        
//         // Show success message
//         if (importedData && importedData.message) {
//           showToast(importedData.message, "success");
//         } else if (Array.isArray(importedData)) {
//           showToast(`Successfully imported ${importedData.length} records from: ${file.name}`, "success");
//         } else {
//           showToast(`Successfully imported: ${file.name}`, "success");
//         }
        
//         // **KEY FIX: Update UI state with imported data**
//         if (importedData && Array.isArray(importedData) && importedData.length > 0) {
//           // Add imported data to existing table data
//           setTableData(prevData => [...prevData, ...importedData]);
//           // OR if you want to replace all data:
//           // setTableData(importedData);
          
//           // Handle notifications
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
        
//       } else {
//         const errorResponse = await importResponse.json().catch(() => null);
//         const errorText = errorResponse?.message || await importResponse.text();
//         showToast('Import failed: ' + errorText, "error");
//       }
//     } catch {
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//       // Clear the file input so same file can be selected again if needed
//       e.target.value = '';
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
    
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
//         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
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

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isUser) return;
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
//     if (!isUser) return;
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
//     if (!isUser || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
  
//   const handleBulkRejectClick = () => {
//     if (!isUser || selectedRows.length === 0) {
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
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
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
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

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
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
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
//                 {/* User buttons */}
//                 {isUser && hasPendingRows && (
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
//                 {/* Admin buttons */}
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
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : "Import"}
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
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col === "Select" && isUser ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col }
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
//                               textAlign: "center",
//                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
//                             }}>
//                             {col === "Select" && isUser ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && isAdmin ? (
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
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

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
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Select", "Status", "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'APPROVED':
//         return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
//       case 'REJECTED':
//         return { backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 'bold' };
//       case 'PENDING':
//         return { backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' };
//       case 'NOTIFIED':
//         return { backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' };
//       default:
//         return { backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 'normal' };
//     }
//   };

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
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
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
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.approvalStatus || "PENDING",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       // showToast(`Loaded ${mappedData.length} timesheets successfully`, "success");
//     } catch (error) {
//       // showToast('Failed to load timesheet data. Please check your connection.', "error");
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
//           const rowDate = new Date(row.originalDate || rowDateString);
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
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Import handlers
//   const handleImportClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
//     if (fileInputRef.current) fileInputRef.current.click();
//   };

//   // **UPDATED IMPORT FUNCTION WITH PROPER DATA HANDLING**
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
        
//         // Handle different response formats
//         let dataToProcess = null;
//         let successMessage = '';
        
//         if (importedData && importedData.message) {
//           // If response has a message, show it
//           successMessage = importedData.message;
//           showToast(successMessage, "success");
          
//           // If there's also data in the response, process it
//           if (importedData.data && Array.isArray(importedData.data)) {
//             dataToProcess = importedData.data;
//           }
//         } else if (Array.isArray(importedData)) {
//           // If response is directly an array
//           dataToProcess = importedData;
//           successMessage = `Successfully imported ${importedData.length} records from: ${file.name}`;
//           showToast(successMessage, "success");
//         } else {
//           // Generic success message
//           successMessage = `Successfully imported: ${file.name}`;
//           showToast(successMessage, "success");
//         }
        
//         // **UPDATE UI WITH IMPORTED DATA**
//         if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//           // Format imported data to match table structure
//           const formattedImportedData = dataToProcess.map((item, index) => ({
//             id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//             requestId: item.requestId || item.id,
//             levelNo: item.levelNo || 1,
//             selected: false,
//             notifySelected: false,
//             isApproved: item.approvalStatus === 'APPROVED' || false,
//             isRejected: item.approvalStatus === 'REJECTED' || false,
//             isNotified: item.approvalStatus === 'NOTIFIED' || false,
//             status: item.approvalStatus?.toLowerCase() || 'pending',
//             originalDate: item.timesheetDate,
//             "Date": formatDate(item.timesheetDate),
//             "Employee ID": item.employee?.employeeId || item.employeeId || "",
//             "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//             "Fiscal Year": item.fiscalYear || "",
//             "Period": item.period || "",
//             "Project ID": item.projectId || "",
//             "Account": item.accountId || "",
//             "Org": item.organizationId || "",
//             "PLC": item.projectLaborCategory || "",
//             "Pay Type": item.payType || "",
//             "Hours": formatHours(item.hours),
//             "Seq No": item.sequenceNumber || "",
//             "Status": item.approvalStatus || "PENDING",
//             "Comment": item.comment || "",
//             "IP Address": item.ipAddress || ""
//           }));
          
//           // Add formatted data to existing rows
//           setRows(prevRows => [...prevRows, ...formattedImportedData]);
          
//           // Handle notifications
//           const requestBody = dataToProcess.map(item => ({
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
//             showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
        
//       } else {
//         // Handle error responses
//         try {
//           const errorResponse = await importResponse.json();
//           const errorText = errorResponse?.message || JSON.stringify(errorResponse);
//           showToast('Import failed: ' + errorText, "error");
//         } catch {
//           const errorText = await importResponse.text();
//           showToast('Import failed: ' + errorText, "error");
//         }
//       }
//     } catch (error) {
//       console.error('Import error:', error);
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//       // Clear the file input so same file can be selected again if needed
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
    
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
//         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
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

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isUser) return;
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
//     if (!isUser) return;
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
//     if (!isUser || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
  
//   const handleBulkRejectClick = () => {
//     if (!isUser || selectedRows.length === 0) {
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
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
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
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

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
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
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
//                 {/* User buttons */}
//                 {isUser && hasPendingRows && (
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
//                 {/* Admin buttons */}
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
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : "Import"}
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
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col === "Select" && isUser ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col }
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
//                               textAlign: "center",
//                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
//                             }}>
//                             {col === "Select" && isUser ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && isAdmin ? (
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
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

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
//   "Notify", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No"
// ];

// const columnsViewer = [
//   "Select", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
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
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const isUser = currentUser?.role === "User";
//   const columns = isAdmin ? columnsAdmin : columnsViewer;
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

//   // Convert MM/DD/YYYY to MM-DD-YYYY for date input
//   const formatDateForInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}-${day}-${year}`;
//     } catch {
//       return '';
//     }
//   };

//   // Convert MM-DD-YYYY input format back to Date for comparison
//   const parseInputDate = (inputDateString) => {
//     if (!inputDateString) return null;
//     try {
//       const [month, day, year] = inputDateString.split('-');
//       return new Date(year, month - 1, day);
//     } catch {
//       return null;
//     }
//   };

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

//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'APPROVED':
//         return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
//       case 'REJECTED':
//         return { backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 'bold' };
//       case 'PENDING':
//         return { backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' };
//       case 'NOTIFIED':
//         return { backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' };
//       default:
//         return { backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 'normal' };
//     }
//   };

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
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
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
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.approvalStatus || "PENDING",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
    
//     if (searchDate) {
//       const inputDate = parseInputDate(searchDate);
//       if (inputDate) {
//         filtered = filtered.filter(row => {
//           try {
//             const rowDate = new Date(row.originalDate || row["Date"]);
//             return rowDate.toDateString() === inputDate.toDateString();
//           } catch {
//             return false;
//           }
//         });
//       }
//     }
    
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => 
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }
    
//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row => 
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }
    
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleImportClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
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
        
//         let dataToProcess = null;
//         let successMessage = '';
        
//         if (importedData && importedData.message) {
//           successMessage = importedData.message;
//           showToast(successMessage, "success");
          
//           if (importedData.data && Array.isArray(importedData.data)) {
//             dataToProcess = importedData.data;
//           }
//         } else if (Array.isArray(importedData)) {
//           dataToProcess = importedData;
//           successMessage = `Successfully imported ${importedData.length} records from: ${file.name}`;
//           showToast(successMessage, "success");
//         } else {
//           successMessage = `Successfully imported: ${file.name}`;
//           showToast(successMessage, "success");
//         }
        
//         if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//           const formattedImportedData = dataToProcess.map((item, index) => ({
//             id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//             requestId: item.requestId || item.id,
//             levelNo: item.levelNo || 1,
//             selected: false,
//             notifySelected: false,
//             isApproved: item.approvalStatus === 'APPROVED' || false,
//             isRejected: item.approvalStatus === 'REJECTED' || false,
//             isNotified: item.approvalStatus === 'NOTIFIED' || false,
//             status: item.approvalStatus?.toLowerCase() || 'pending',
//             originalDate: item.timesheetDate,
//             "Date": formatDate(item.timesheetDate),
//             "Employee ID": item.employee?.employeeId || item.employeeId || "",
//             "Timesheet Type Code": item.timesheetTypeCode || "",
//             "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//             "Fiscal Year": item.fiscalYear || "",
//             "Period": item.period || "",
//             "Project ID": item.projectId || "",
//             "Account": item.accountId || "",
//             "Org": item.organizationId || "",
//             "PLC": item.projectLaborCategory || "",
//             "Pay Type": item.payType || "",
//             "Hours": formatHours(item.hours),
//             "Seq No": item.sequenceNumber || "",
//             "Status": item.approvalStatus || "PENDING",
//             "Comment": item.comment || "",
//             "IP Address": item.ipAddress || ""
//           }));
          
//           setRows(prevRows => [...prevRows, ...formattedImportedData]);
          
//           const requestBody = dataToProcess.map(item => ({
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
//             showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
        
//       } else {
//         try {
//           const errorResponse = await importResponse.json();
//           const errorText = errorResponse?.message || JSON.stringify(errorResponse);
//           showToast('Import failed: ' + errorText, "error");
//         } catch {
//           const errorText = await importResponse.text();
//           showToast('Import failed: ' + errorText, "error");
//         }
//       }
//     } catch (error) {
//       console.error('Import error:', error);
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;
    
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
//         setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
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

//   const handleRowSelect = (rowIndex, isSelected) => {
//     if (!isUser) return;
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
//     if (!isUser) return;
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
//     if (!isUser || selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };
  
//   const handleBulkRejectClick = () => {
//     if (!isUser || selectedRows.length === 0) {
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
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
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
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

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
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
          
//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <input
//                 type="text"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 placeholder="MM-DD-YYYY"
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
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex gap-2 items-center">
//               <span className="text-xs text-gray-600">Sort by:</span>
//               <select
//                 value={sortConfig.key || ''}
//                 onChange={(e) => {
//                   if (e.target.value) {
//                     handleSort(e.target.value);
//                   } else {
//                     setSortConfig({ key: null, direction: 'asc' });
//                   }
//                 }}
//                 className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="">Default</option>
//                 <option value="Date">Date</option>
//                 <option value="Employee ID">Employee ID</option>
//                 <option value="Name">Name</option>
//               </select>
//               {sortConfig.key && (
//                 <button
//                   onClick={() => {
//                     setSortConfig({
//                       key: sortConfig.key,
//                       direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
//                     });
//                   }}
//                   className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
//                 >
//                   {sortConfig.direction === 'asc' ? '↑ Asc' : '↓ Desc'}
//                 </button>
//               )}
//             </div>
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
//                 {isUser && hasPendingRows && (
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
//                       onClick={handleImportClick}
//                       type="button"
//                       disabled={actionLoading}
//                       className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : "Import"}
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
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name'].includes(col) && handleSort(col)}
//                       >
//                         {col === "Select" && isUser ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" && isAdmin ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
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
//                               textAlign: "center",
//                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
//                             }}>
//                             {col === "Select" && isUser ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" && isAdmin ? (
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
  "Notify", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
  "Project ID", "PLC", "Pay Type","RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
];

const columnsViewer = [
  "Select", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
  "Project ID", "PLC", "Pay Type","RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No", "Comment"
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
  const [searchDate, setSearchDate] = useState('');
  const [searchEmployeeId, setSearchEmployeeId] = useState('');
  const [searchEmployeeName, setSearchEmployeeName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const fileInputRef = useRef(null);

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userIpAddress, setUserIpAddress] = useState('');

  const isAdmin = currentUser?.role === "Admin";
  const isUser = currentUser?.role === "User";
  const columns = isAdmin ? columnsAdmin : columnsViewer;
  const colWidth = 120;
  const minTableWidth = columns.length * colWidth;

  // Format date to MM/DD/YYYY with leading zeros
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

  // Convert date to YYYY-MM-DD for HTML date input
  const formatDateForDateInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
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
  
  const getSortedRows = (rowsToSort) => {
  let sorted = [...rowsToSort];
  
  if (sortConfig.key) {
    sorted.sort((a, b) => {
      let aVal, bVal;
      
      if (sortConfig.key === 'Date') {
        aVal = new Date(a.originalDate || a["Date"]);
        bVal = new Date(b.originalDate || b["Date"]);
        if (isNaN(aVal.getTime())) aVal = new Date(0);
        if (isNaN(bVal.getTime())) bVal = new Date(0);
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      } else if (sortConfig.key === 'Employee ID') {
        aVal = String(a["Employee ID"] || '').toLowerCase();
        bVal = String(b["Employee ID"] || '').toLowerCase();
      } else if (sortConfig.key === 'Name') {
        aVal = String(a["Name"] || '').toLowerCase();
        bVal = String(b["Name"] || '').toLowerCase();
      } else if (sortConfig.key === 'Status') {
        // Custom priority order: Un-Notified first, then Pending, then others
        // const getStatusPriority = (status) => {
        //   const statusUpper = String(status || 'PENDING').toUpperCase();
        //   switch (statusUpper) {
        //     case 'UN-NOTIFIED': 
        //     case 'UNNOTIFIED': return 1;  // Un-Notified shows FIRST
        //     case 'PENDING': return 2;     // Pending shows SECOND
        //     case 'APPROVED': return 3;    // Approved shows THIRD
        //     case 'REJECTED': return 4;    // Rejected shows FOURTH
        //     default: return 5;            // Other statuses show LAST
        //   }
        // };
        const getStatusPriority = (status) => {
  const statusUpper = String(status || 'PENDING').toUpperCase();
  switch (statusUpper) {
    case 'OPEN': return 1;        // OPEN shows FIRST
    case 'PENDING': return 2;     // Pending shows SECOND
    case 'APPROVED': return 3;    // Approved shows THIRD
    case 'REJECTED': return 4;    // Rejected shows FOURTH
    default: return 5;            // Other statuses show LAST
  }
};

        
        aVal = getStatusPriority(a["Status"]);
        bVal = getStatusPriority(b["Status"]);
        
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      
      return 0;
    });
  } else {
    // Default sorting when no sort is applied
    sorted.sort((a, b) => {
      let aDate = new Date(a.originalDate || a["Date"]);
      let bDate = new Date(b.originalDate || b["Date"]);
      if (isNaN(aDate.getTime())) aDate = new Date(0);
      if (isNaN(bDate.getTime())) bDate = new Date(0);
      if (aDate.getTime() !== bDate.getTime()) {
        return aDate.getTime() - bDate.getTime();
      }
      const aEmpId = String(a["Employee ID"] || '').toLowerCase();
      const bEmpId = String(b["Employee ID"] || '').toLowerCase();
      return aEmpId.localeCompare(bEmpId);
    });
  }
  
  return sorted;
};

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name'].includes(key)) return;
    
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };
const handleSort = (key) => {
  if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;
  
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });
};

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name'].includes(columnKey)) return null;
    
//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'APPROVED':
//         return { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
//       case 'REJECTED':
//         return { backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 'bold' };
//       case 'PENDING':
//         return { backgroundColor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' };
//       case 'NOTIFIED':
//         return { backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' };
//       default:
//         return { backgroundColor: '#f9fafb', color: '#6b7280', fontWeight: 'normal' };
//     }
//   };
const getSortIcon = (columnKey) => {
  if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;
  
  if (sortConfig.key === columnKey) {
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  }
  return ' ⇅';
};

// const getStatusStyle = (status) => {
//   const statusUpper = status?.toUpperCase() || "PENDING";
  
//   switch (statusUpper) {
//     case 'APPROVED':
//       return {
//         backgroundColor: '#dcfce7',
//         color: '#16a34a',
//         fontWeight: '600',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//     case 'REJECTED':
//       return {
//         backgroundColor: '#fef2f2',
//         color: '#dc2626',
//         fontWeight: '600',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//     case 'PENDING':
//       return {
//         backgroundColor: '#fef3c7',
//         color: '#d97706',
//         fontWeight: '600',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//     case 'NOTIFIED':
//       return {
//         backgroundColor: '#dbeafe',
//         color: '#2563eb',
//         fontWeight: '600',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//     case 'UN-NOTIFIED':
//     case 'UNNOTIFIED':
//       return {
//         backgroundColor: '#dcfce7',  // Green background (same as APPROVED)
//         color: '#16a34a',            // Green text (same as APPROVED)
//         fontWeight: '600',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//     default:
//       return {
//         backgroundColor: '#f3f4f6',
//         color: '#6b7280',
//         fontWeight: '500',
//         padding: '4px 8px',
//         // borderRadius: '9999px',
//         fontSize: '11px',
//         display: 'inline-block'
//       };
//   }
// };

const getStatusStyle = (status) => {
  const statusUpper = status?.toUpperCase() || "PENDING";
  
  switch (statusUpper) {
    case 'OPEN':
      return {
        backgroundColor: '#dbeafe',  // Blue background
        color: '#2563eb',            // Blue text
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    case 'APPROVED':
      return {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    case 'REJECTED':
      return {
        backgroundColor: '#fce7f3',  // Pink background
        color: '#ec4899',            // Pink text
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    case 'PENDING':
      return {
        backgroundColor: '#fef9c3',  // More yellow background
        color: '#ca8a04',            // More yellow text
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    case 'NOTIFIED':
      return {
        backgroundColor: '#dbeafe',
        color: '#2563eb',
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    case 'UN-NOTIFIED':
    case 'UNNOTIFIED':
      return {
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        fontWeight: '600',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
    default:
      return {
        backgroundColor: '#f3f4f6',
        color: '#6b7280',
        fontWeight: '500',
        padding: '4px 8px',
        fontSize: '11px',
        display: 'inline-block'
      };
  }
};

// Helper function to convert array of objects to CSV string
const arrayToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) return '';
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  // Convert each row to CSV format
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header] || '';
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      const escaped = String(value).replace(/"/g, '""');
      return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
    }).join(',');
  });
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Helper function to download CSV file
const downloadCSV = (csvContent, filename = 'imported_data.csv') => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
};

// Helper function to parse CSV text to array of objects
const parseCSVText = (csvText) => {
  if (!csvText || typeof csvText !== 'string') return [];
  
  const lines = csvText.trim().split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  // Define headers based on your CSV structure
  const headers = [
    'Date', 'Employee ID', 'Timesheet Type Code', 'Name', 'Fiscal Year', 'Period',
    'Project ID', 'Account', 'Org', 'PLC', 'Pay Type', 'RLSE Number', 'Hours',
    'PO Number', 'PO Line Number', 'Field16', 'Field17', 'Field18', 'Field19',
    'Field20', 'Field21', 'Field22', 'Field23', 'Seq No', 'Field25', 'Field26',
    'Field27', 'Field28', 'Field29', 'Field30'
  ];
  
  return lines.map((line, index) => {
    const values = line.split(',').map(val => val.trim());
    const obj = {};
    
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    
    // Add additional fields for tracking
    obj.id = `csv-row-${index}`;
    obj.Status = 'IMPORTED';
    obj.Comment = `Imported from CSV at ${new Date().toLocaleString()}`;
    
    return obj;
  });
};


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
  }, []);

  useEffect(() => {
    if (userLoaded && currentUser && currentUser.username) fetchData();
  }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       let apiUrl = "";
//       if (isAdmin) {
//         apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//       } else if (isUser) {
//         apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
//       } else {
//         setRows([]);
//         setLoading(false);
//         return;
//       }
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//     //   const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//     //     id: item.timesheetId || item.id || `fallback-${index}`,
//     //     requestId: item.requestId || item.id,
//     //     levelNo: item.levelNo || 1,
//     //     selected: false,
//     //     notifySelected: false,
//     //     isApproved: item.approvalStatus === 'APPROVED' || false,
//     //     isRejected: item.approvalStatus === 'REJECTED' || false,
//     //     isNotified: item.approvalStatus === 'NOTIFIED' || false,
//     //     status: item.approvalStatus?.toLowerCase() || 'pending',
//     //     originalDate: item.timesheetDate,
//     //     "Date": formatDate(item.timesheetDate),
//     //     "Employee ID": item.employee?.employeeId || item.employeeId || "",
//     //     "Timesheet Type Code": item.timesheetTypeCode || "",
//     //     "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//     //     "Fiscal Year": item.fiscalYear || "",
//     //     "Period": item.period || "",
//     //     "Project ID": item.projectId || "",
//     //     "Account": item.accountId || "",
//     //     "Org": item.organizationId || "",
//     //     "PLC": item.projectLaborCategory || "",
//     //     "Pay Type": item.payType || "",
//     //     "Hours": formatHours(item.hours),
//     //     "Seq No": item.sequenceNumber || "",
//     //     // "Status": item.approvalStatus || "PENDING",
//     //     "Comment": item.comment || "",
//     //     // "Status": item.status || "PENDING",  // ADD THIS LINE - Map the status field
//     //      isNotified: (item.status || "").toLowerCase() === "notified",  // ADD THIS LINE - Helper for disabled 
//     //     // "IP Address": item.ipAddress || ""
//     //   })) : [];
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//   id: item.timesheetId || item.id || `fallback-${index}`,
//   requestId: item.requestId || item.id,
//   levelNo: item.levelNo || 1,
//   selected: false,
//   notifySelected: false,
//   isApproved: item.approvalStatus === 'APPROVED' || false,
//   isRejected: item.approvalStatus === 'REJECTED' || false,
//   isNotified: item.approvalStatus === 'NOTIFIED' || false,
//   status: item.approvalStatus?.toLowerCase() || 'pending',
//   originalDate: item.timesheetDate,
//   "Date": formatDate(item.timesheetDate),
//   "Employee ID": item.employee?.employeeId || item.employeeId || "",
//   "Timesheet Type Code": item.timesheetTypeCode || "",
//   "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//   "Fiscal Year": item.fiscalYear || "",
//   "Period": item.period || "",
//   "Project ID": item.projectId || "",
//   "Account": item.accountId || "",
//   "Org": item.organizationId || "",
//   "PLC": item.projectLaborCategory || "",
//   "Pay Type": item.payType || "",
//   "Hours": formatHours(item.hours),
//   "Seq No": item.sequenceNumber || "",
//   // ADD THIS LINE - Map approvalStatus to Status column
//   "Status": item.approvalStatus || "PENDING",
//   "Comment": item.comment || "",
//   // Update isNotified logic
//   isNotified: (item.approvalStatus || "").toLowerCase() === "notified",
// })) : [];

 
//     setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };
   
const fetchData = async () => {
  if (!userLoaded || !currentUser || !currentUser.username) return;
  try {
    setLoading(true);
    let apiUrl = "";
    if (isAdmin) {
      apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
    } else if (isUser) {
      apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
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
      // CONDITIONAL STATUS MAPPING: Admin uses item.status, User uses item.approvalStatus
      status: isAdmin 
        ? (item.status?.toLowerCase() || 'un-notified')
        : (item.approvalStatus?.toLowerCase() || 'pending'),
      originalDate: item.timesheetDate,
      "Date": formatDate(item.timesheetDate),
      "Employee ID": item.employee?.employeeId || item.employeeId || "",
      "Timesheet Type Code": item.timesheetTypeCode || "",
      "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
      "Fiscal Year": item.fiscalYear || "",
      "Period": item.period || "",
      "Project ID": item.projectId || "",
      "Account": item.accountId || "",
      "Org": item.organizationId || "",
      "PLC": item.projectLaborCategory || "",
      "Pay Type": item.payType || "",
      "Hours": formatHours(item.hours),
      "Seq No": item.sequenceNumber || "",
      // CONDITIONAL STATUS COLUMN: Admin uses item.status, User uses item.approvalStatus
      "Status": isAdmin 
        ? (item.status || "Un-Notified")
        : (item.approvalStatus || "PENDING"),
      "Comment": item.comment || "",
      // CONDITIONAL ISNOTIFIED LOGIC: Admin uses item.status, User uses item.approvalStatus
    //   isNotified: isAdmin
    //     ? ((item.status || "").toLowerCase() === "un-notified")
    //     : ((item.approvalStatus || "").toLowerCase() === "notified"),
    // })) : [];
    isNotified: isAdmin
      ? ((item.status || "").toLowerCase() === "notified")  // Only "notified" is disabled for Admin
      : ((item.approvalStatus || "").toLowerCase() === "notified"), // Only "notified" is disabled for User
  })) : [];

    setRows(mappedData);
  } catch (error) {
    setRows([]);
  } finally {
    setLoading(false);
  }
};

// const fetchData = async () => {
//   if (!userLoaded || !currentUser || !currentUser.username) return;
//   try {
//     setLoading(true);
//     let apiUrl = "";
//     if (isAdmin) {
//       apiUrl = "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals";
//     } else if (isUser) {
//       apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
//     } else {
//       setRows([]);
//       setLoading(false);
//       return;
//     }
//     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     const apiData = await response.json();

//     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//       id: item.timesheetId || item.id || `fallback-${index}`,
//       requestId: item.requestId || item.id,
//       levelNo: item.levelNo || 1,
//       selected: false,
//       notifySelected: false,
//       isApproved: item.approvalStatus === 'APPROVED' || false,
//       isRejected: item.approvalStatus === 'REJECTED' || false,
//       isNotified: item.approvalStatus === 'NOTIFIED' || false,
      
//       // FIX: For User view, check BOTH approvalStatus AND status fields
//       status: isAdmin 
//         ? (item.status?.toLowerCase() || 'un-notified')
//         : (item.approvalStatus?.toLowerCase() || item.status?.toLowerCase() || 'pending'),
      
//       originalDate: item.timesheetDate,
//       "Date": formatDate(item.timesheetDate),
//       "Employee ID": item.employee?.employeeId || item.employeeId || "",
//       "Timesheet Type Code": item.timesheetTypeCode || "",
//       "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//       "Fiscal Year": item.fiscalYear || "",
//       "Period": item.period || "",
//       "Project ID": item.projectId || "",
//       "Account": item.accountId || "",
//       "Org": item.organizationId || "",
//       "PLC": item.projectLaborCategory || "",
//       "Pay Type": item.payType || "",
//       "Hours": formatHours(item.hours),
//       "Seq No": item.sequenceNumber || "",
      
//       // FIX: For User view, check BOTH approvalStatus AND status fields for display
//       "Status": isAdmin 
//         ? (item.status || "Un-Notified")
//         : (item.approvalStatus || item.status || "PENDING"),
      
//       "Comment": item.comment || "",
      
//       // FIX: For User view, check BOTH fields for notification status
//       isNotified: isAdmin
//         ? ((item.status || "").toLowerCase() === "notified")
//         : ((item.approvalStatus || "").toLowerCase() === "notified" || 
//            (item.status || "").toLowerCase() === "notified"),
//     })) : [];

//     setRows(mappedData);
//   } catch (error) {
//     setRows([]);
//   } finally {
//     setLoading(false);
//   }
// };

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];
    
    // if (searchDate) {
    //   const searchDateFormatted = formatDateFromInput(searchDate);
    //   filtered = filtered.filter(row => {
    //     const rowDate = row["Date"];
    //     return rowDate === searchDateFormatted;
    //   });
    // }

//     if (searchDate) {
//   const searchTerm = searchDate.trim();
//   filtered = filtered.filter(row => {
//     const rowDate = row["Date"];
//     return rowDate.includes(searchTerm);
//   });
// }

if (searchDate) {
  const searchDateFormatted = formatDateFromInput(searchDate);
  filtered = filtered.filter(row => {
    const rowDate = row["Date"];
    return rowDate === searchDateFormatted;
  });
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

     // Add this status filter logic
  if (searchStatus.trim()) {
    filtered = filtered.filter(row => 
      row['Status'].toLowerCase().includes(searchStatus.trim().toLowerCase())
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

  const handleImportClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (actionLoading) return;
    if (fileInputRef.current) fileInputRef.current.click();
  };

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
        
//         let dataToProcess = null;
//         let successMessage = '';
        
//         if (importedData && importedData.message) {
//           successMessage = importedData.message;
//           showToast(successMessage, "success");
          
//           if (importedData.data && Array.isArray(importedData.data)) {
//             dataToProcess = importedData.data;
//           }
//         } else if (Array.isArray(importedData)) {
//           dataToProcess = importedData;
//           successMessage = `Successfully imported ${importedData.length} records from: ${file.name}`;
//           showToast(successMessage, "success");
//         } else {
//           successMessage = `Successfully imported: ${file.name}`;
//           showToast(successMessage, "success");
//         }
        
//         if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//           const formattedImportedData = dataToProcess.map((item, index) => ({
//             id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//             requestId: item.requestId || item.id,
//             levelNo: item.levelNo || 1,
//             selected: false,
//             notifySelected: false,
//             isApproved: item.approvalStatus === 'APPROVED' || false,
//             isRejected: item.approvalStatus === 'REJECTED' || false,
//             isNotified: item.approvalStatus === 'NOTIFIED' || false,
//             status: item.approvalStatus?.toLowerCase() || 'pending',
//             originalDate: item.timesheetDate,
//             "Date": formatDate(item.timesheetDate),
//             "Employee ID": item.employee?.employeeId || item.employeeId || "",
//             "Timesheet Type Code": item.timesheetTypeCode || "",
//             "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//             "Fiscal Year": item.fiscalYear || "",
//             "Period": item.period || "",
//             "Project ID": item.projectId || "",
//             "Account": item.accountId || "",
//             "Org": item.organizationId || "",
//             "PLC": item.projectLaborCategory || "",
//             "Pay Type": item.payType || "",
//             "Hours": formatHours(item.hours),
//             "Seq No": item.sequenceNumber || "",
//             "Status": item.approvalStatus || "PENDING",
//             "Comment": item.comment || "",
//             "IP Address": item.ipAddress || ""
//           }));
          
// //         const formattedImportedData = csvData.map((item, index) => ({
// //   id: item.timesheetId || item.id || `imported-${index}`,
// //   originalDate: item.timesheetDate || item["Timesheet Date"],
// //   originalItem: item,
// //   "Date": formatDate(item.timesheetDate || item["Timesheet Date"]),
// //   "Employee ID": item.employeeId || item["Employee ID"] || "",
// //   "Timesheet Type Code": item.timesheetTypeCode || item["Timesheet Type Code"] || "",
// //   "Name": item.displayedName || item["Name"] || `Employee ${item.employeeId || item["Employee ID"]}` || "",
// //   "Fiscal Year": item.fiscalYear || item["Fiscal Year"] || "",
// //   "Period": item.period || item["Period"] || "",
// //   "Project ID": item.projectId || item["Project ID"] || "",
// //   "PLC": item.projectLaborCategory || item["PLC"] || "",
// //   "Pay Type": item.payType || item["Pay Type"] || "",
// //   "Hours": formatHours(item.hours || item["Hours"]),
// //   "Seq No": item.sequenceNumber || item["Seq No"] || "",
// //   "Comment": item.comment || item["Comment"] || "",
// // "Status": item.status || item["Status"] || "PENDING",  // ADD THIS LINE
// //   isNotified: (item.status || item["Status"] || "").toLowerCase() === "notified",  // ADD THIS LINE
// //   notifySelected: false
// // }));

//           setRows(prevRows => [...prevRows, ...formattedImportedData]);
          
//           const requestBody = dataToProcess.map(item => ({
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
//             showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//           } else {
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
        
//       } else {
//         try {
//           const errorResponse = await importResponse.json();
//           const errorText = errorResponse?.message || JSON.stringify(errorResponse);
//           showToast('Import failed: ' + errorText, "error");
//         } catch {
//           const errorText = await importResponse.text();
//           showToast('Import failed: ' + errorText, "error");
//         }
//       }
//     } catch (error) {
//       console.error('Import error:', error);
//       showToast('Import failed. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     }
//   };
  
// const handleImportFile = async (e) => {
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
      
//       let dataToProcess = null;
//       let successMessage = '';
      
//       if (importedData && importedData.message) {
//         successMessage = importedData.message;
//         showToast(successMessage, "success");
        
//         if (importedData.data && Array.isArray(importedData.data)) {
//           dataToProcess = importedData.data;
//         }
//       } else if (Array.isArray(importedData)) {
//         dataToProcess = importedData;
//         successMessage = `Successfully imported ${importedData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//       }
      
//       // CHECK FOR DOWNLOADABLE CSV DATA
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         try {
//           // Convert data to CSV and trigger download
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast(`CSV file downloaded: ${filename}`, "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
//       } else if (importedData) {
//         // Try to download even if dataToProcess is null but importedData exists
//         try {
//           let downloadData = importedData.data || importedData;
//           if (Array.isArray(downloadData) && downloadData.length > 0) {
//             const csvContent = arrayToCSV(downloadData);
//             if (csvContent) {
//               const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//               downloadCSV(csvContent, filename);
//               showToast(`CSV file downloaded: ${filename}`, "success");
//             }
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV from alternative data:', downloadError);
//         }
//       }
      
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         const formattedImportedData = dataToProcess.map((item, index) => ({
//           id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === 'APPROVED' || false,
//           isRejected: item.approvalStatus === 'REJECTED' || false,
//           isNotified: item.approvalStatus === 'NOTIFIED' || false,
//           status: item.approvalStatus?.toLowerCase() || 'pending',
//           originalDate: item.timesheetDate,
//           "Date": formatDate(item.timesheetDate),
//           "Employee ID": item.employee?.employeeId || item.employeeId || "",
//           "Timesheet Type Code": item.timesheetTypeCode || "",
//           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//           "Fiscal Year": item.fiscalYear || "",
//           "Period": item.period || "",
//           "Project ID": item.projectId || "",
//           "Account": item.accountId || "",
//           "Org": item.organizationId || "",
//           "PLC": item.projectLaborCategory || "",
//           "Pay Type": item.payType || "",
//           "Hours": formatHours(item.hours),
//           "Seq No": item.sequenceNumber || "",
//           "Status": item.approvalStatus || "PENDING",
//           "Comment": item.comment || "",
//           "IP Address": item.ipAddress || ""
//         }));

//         setRows(prevRows => [...prevRows, ...formattedImportedData]);
        
//         const requestBody = dataToProcess.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId,
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
      
//     } else {
//       try {
//         const errorResponse = await importResponse.json();
        
//         // CHECK IF ERROR RESPONSE CONTAINS DOWNLOADABLE DATA
//         if (errorResponse && (errorResponse.data || Array.isArray(errorResponse))) {
//           try {
//             let downloadData = errorResponse.data || errorResponse;
//             if (Array.isArray(downloadData) && downloadData.length > 0) {
//               const csvContent = arrayToCSV(downloadData);
//               if (csvContent) {
//                 const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//                 downloadCSV(csvContent, filename);
//                 showToast(`Import failed but data downloaded: ${filename}`, "warning");
//                 return; // Exit early since we found downloadable data
//               }
//             }
//           } catch (downloadError) {
//             console.warn('Failed to download CSV from error response:', downloadError);
//           }
//         }
        
//         const errorText = errorResponse?.message || JSON.stringify(errorResponse);
//         showToast('Import failed: ' + errorText, "error");
//       } catch (parseError) {
//         const errorText = await importResponse.text();
        
//         // CHECK IF TEXT RESPONSE IS CSV DATA
//         if (errorText && (errorText.includes(',') || errorText.includes('\n'))) {
//           try {
//             // First try to parse as CSV and convert to array
//             const parsedData = parseCSVText(errorText);
//             if (parsedData && parsedData.length > 0) {
//               const csvContent = arrayToCSV(parsedData);
//               const filename = `parsed_csv_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//               downloadCSV(csvContent, filename);
//               showToast(`CSV response parsed and downloaded: ${filename}`, "success");
//               return;
//             }
            
//             // If parsing fails, download raw CSV text
//             const filename = `raw_csv_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(errorText, filename);
//             showToast(`Raw CSV response downloaded: ${filename}`, "warning");
//             return;
//           } catch (downloadError) {
//             console.warn('Failed to download CSV from text response:', downloadError);
//           }
//         }
        
//         showToast('Import failed: ' + errorText, "error");
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

// const handleImportFile = async (e) => {
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
      
//       let dataToProcess = null;
//       let successMessage = '';
      
//       if (importedData && importedData.message) {
//         successMessage = importedData.message;
//         showToast(successMessage, "success");
        
//         if (importedData.data && Array.isArray(importedData.data)) {
//           dataToProcess = importedData.data;
//         }
//       } else if (Array.isArray(importedData)) {
//         dataToProcess = importedData;
//         successMessage = `Successfully imported ${importedData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//       }
      
//       // CHECK FOR DOWNLOADABLE CSV DATA
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         try {
//           // Convert data to CSV and trigger download
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast(`CSV file downloaded: ${filename}`, "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
//       } else if (importedData) {
//         // Try to download even if dataToProcess is null but importedData exists
//         try {
//           let downloadData = importedData.data || importedData;
//           if (Array.isArray(downloadData) && downloadData.length > 0) {
//             const csvContent = arrayToCSV(downloadData);
//             if (csvContent) {
//               const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//               downloadCSV(csvContent, filename);
//               showToast(`CSV file downloaded: ${filename}`, "success");
//             }
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV from alternative data:', downloadError);
//         }
//       }
      
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         const formattedImportedData = dataToProcess.map((item, index) => ({
//           id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === 'APPROVED' || false,
//           isRejected: item.approvalStatus === 'REJECTED' || false,
//           isNotified: item.approvalStatus === 'NOTIFIED' || false,
//           status: item.approvalStatus?.toLowerCase() || 'pending',
//           originalDate: item.timesheetDate,
//           "Date": formatDate(item.timesheetDate),
//           "Employee ID": item.employee?.employeeId || item.employeeId || "",
//           "Timesheet Type Code": item.timesheetTypeCode || "",
//           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//           "Fiscal Year": item.fiscalYear || "",
//           "Period": item.period || "",
//           "Project ID": item.projectId || "",
//           "Account": item.accountId || "",
//           "Org": item.organizationId || "",
//           "PLC": item.projectLaborCategory || "",
//           "Pay Type": item.payType || "",
//           "Hours": formatHours(item.hours),
//           "Seq No": item.sequenceNumber || "",
//           "Status": item.approvalStatus || "PENDING",
//           "Comment": item.comment || "",
//           "IP Address": item.ipAddress || ""
//         }));

//         setRows(prevRows => [...prevRows, ...formattedImportedData]);
        
//         const requestBody = dataToProcess.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId,
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
      
//     } else {
//       // FIRST TRY TO GET TEXT RESPONSE (FOR CSV DATA)
//       try {
//         const textResponse = await importResponse.text();
        
//         // CHECK IF TEXT RESPONSE IS CSV DATA
//         if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
//           console.log('Detected CSV text response:', textResponse.substring(0, 200) + '...');
          
//           try {
//             // Download the raw CSV text directly
//             const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(textResponse, filename);
//             showToast(`CSV response downloaded: ${filename}`, "success");
            
//             // ALSO try to parse and process the CSV data
//             const parsedData = parseCSVText(textResponse);
//             if (parsedData && parsedData.length > 0) {
//               showToast(`Successfully parsed ${parsedData.length} records from CSV response`, "info");
//               // You can also add these to your table if needed
//             }
            
//             return; // Exit early since we successfully handled the CSV
//           } catch (downloadError) {
//             console.warn('Failed to download CSV from text response:', downloadError);
//             showToast('Received CSV data but download failed', "warning");
//           }
//         } else {
//           // Not CSV data, treat as error message
//           showToast('Import failed: ' + textResponse, "error");
//         }
//       } catch (textError) {
//         // Fallback: try to parse as JSON error response
//         try {
//           importResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//             method: 'POST',
//             body: formData
//           });
//           const errorResponse = await importResponse.json();
//           const errorText = errorResponse?.message || JSON.stringify(errorResponse);
//           showToast('Import failed: ' + errorText, "error");
//         } catch (finalError) {
//           showToast('Import failed: Unable to parse response', "error");
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

// const handleImportFile = async (e) => {
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
//       // FIX: First check content type, then try text first for CSV responses
//       const contentType = importResponse.headers.get('content-type');
//       console.log('Response Content-Type:', contentType);
      
//       let responseData;
//       let isCSVResponse = false;
      
//       // Check if response is CSV or text
//       if (contentType && (contentType.includes('text/csv') || contentType.includes('text/plain'))) {
//         responseData = await importResponse.text();
//         isCSVResponse = true;
//         console.log('Detected CSV/text response');
//       } else {
//         // Try JSON first, fallback to text if it fails
//         try {
//           responseData = await importResponse.json();
//           console.log('Successfully parsed JSON response');
//         } catch (jsonError) {
//           console.log('JSON parsing failed, trying text...', jsonError.message);
//           // Reset the response by making a new request (since response can only be consumed once)
//           const retryResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//             method: 'POST',
//             body: formData
//           });
//           responseData = await retryResponse.text();
//           isCSVResponse = true;
//           console.log('Fallback to text response successful');
//         }
//       }
      
//       // Handle CSV text response
//       if (isCSVResponse && typeof responseData === 'string') {
//         console.log('Processing CSV text response:', responseData.substring(0, 200) + '...');
        
//         // Download the raw CSV text directly
//         const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//         downloadCSV(responseData, filename);
//         showToast(`CSV file downloaded: ${filename}`, "success");
        
//         // Optional: Also try to parse and display the CSV data in your table
//         try {
//           const parsedData = parseCSVText(responseData);
//           if (parsedData && parsedData.length > 0) {
//             // showToast(`Successfully parsed ${parsedData.length} records from CSV`, "info");
//             // You could also add these to your table here if needed
//           }
//         } catch (parseError) {
//           console.warn('Could not parse CSV for display:', parseError);
//         }
        
//         return; // Exit since we handled the CSV response
//       }
      
//       // Handle JSON response (original logic)
//       let dataToProcess = null;
//       let successMessage = '';
      
//       if (responseData && responseData.message) {
//         successMessage = responseData.message;
//         showToast(successMessage, "success");
        
//         if (responseData.data && Array.isArray(responseData.data)) {
//           dataToProcess = responseData.data;
//         }
//       } else if (Array.isArray(responseData)) {
//         dataToProcess = responseData;
//         successMessage = `Successfully imported ${responseData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//       }
      
//       // Process JSON data (rest of your existing logic)
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         try {
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast(`CSV file downloaded: ${filename}`, "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
        
//         // Add to table and notify (your existing logic)
//         const formattedImportedData = dataToProcess.map((item, index) => ({
//           id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === 'APPROVED' || false,
//           isRejected: item.approvalStatus === 'REJECTED' || false,
//           isNotified: item.approvalStatus === 'NOTIFIED' || false,
//           status: item.approvalStatus?.toLowerCase() || 'pending',
//           originalDate: item.timesheetDate,
//           "Date": formatDate(item.timesheetDate),
//           "Employee ID": item.employee?.employeeId || item.employeeId || "",
//           "Timesheet Type Code": item.timesheetTypeCode || "",
//           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//           "Fiscal Year": item.fiscalYear || "",
//           "Period": item.period || "",
//           "Project ID": item.projectId || "",
//           "Account": item.accountId || "",
//           "Org": item.organizationId || "",
//           "PLC": item.projectLaborCategory || "",
//           "Pay Type": item.payType || "",
//           "Hours": formatHours(item.hours),
//           "Seq No": item.sequenceNumber || "",
//           "Status": item.approvalStatus || "PENDING",
//           "Comment": item.comment || "",
//           "IP Address": item.ipAddress || ""
//         }));

//         setRows(prevRows => [...prevRows, ...formattedImportedData]);
        
//         const requestBody = dataToProcess.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId,
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
      
//     } else {
//       // Handle failed response (your existing error handling)
//       try {
//         const textResponse = await importResponse.text();
        
//         if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
//           console.log('Detected CSV text in error response:', textResponse.substring(0, 200) + '...');
          
//           const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//           downloadCSV(textResponse, filename);
//         //   showToast(`CSV response downloaded: ${filename}`, "warning");
//         showToast("CSV response downloaded", "warning");
//           return;
//         } else {
//           showToast('Import failed: ' + textResponse, "error");
//         }
//       } catch (textError) {
//         showToast('Import failed: Unable to parse response', "error");
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

// const handleImportFile = async (e) => {
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
//       // FIX: First check content type, then try text first for CSV responses
//       const contentType = importResponse.headers.get('content-type');
//       console.log('Response Content-Type:', contentType);
      
//       let responseData;
//       let isCSVResponse = false;
      
//       // Check if response is CSV or text
//       if (contentType && (contentType.includes('text/csv') || contentType.includes('text/plain'))) {
//         responseData = await importResponse.text();
//         isCSVResponse = true;
//         console.log('Detected CSV/text response');
//       } else {
//         // Try JSON first, fallback to text if it fails
//         try {
//           responseData = await importResponse.json();
//           console.log('Successfully parsed JSON response');
//         } catch (jsonError) {
//           console.log('JSON parsing failed, trying text...', jsonError.message);
//           // Reset the response by making a new request (since response can only be consumed once)
//           const retryResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//             method: 'POST',
//             body: formData
//           });
//           responseData = await retryResponse.text();
//           isCSVResponse = true;
//           console.log('Fallback to text response successful');
//         }
//       }
      
//       // Handle CSV text response
//       if (isCSVResponse && typeof responseData === 'string') {
//         console.log('Processing CSV text response:', responseData.substring(0, 200) + '...');
        
//         // Download the raw CSV text directly
//         const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//         downloadCSV(responseData, filename);
//         showToast("CSV File Downloaded", "success");
        
//         // DON'T add downloaded CSV to table - only show import success message
//         showToast("Import completed successfully", "info");
        
//         return; // Exit since we handled the CSV response
//       }
      
//       // Handle JSON response (original logic) - THIS is where imported data gets added to table
//       let dataToProcess = null;
//       let successMessage = '';
      
//       if (responseData && responseData.message) {
//         successMessage = responseData.message;
//         showToast(successMessage, "success");
        
//         if (responseData.data && Array.isArray(responseData.data)) {
//           dataToProcess = responseData.data;
//         }
//       } else if (Array.isArray(responseData)) {
//         dataToProcess = responseData;
//         successMessage = `Successfully imported ${responseData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//       }
      
//       // Process JSON data (rest of your existing logic) - THIS adds imported data to table
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         try {
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast("CSV File Downloaded", "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
        
//         // Add to table and notify (your existing logic) - THIS IS THE IMPORTANT PART
//         const formattedImportedData = dataToProcess.map((item, index) => ({
//           id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === 'APPROVED' || false,
//           isRejected: item.approvalStatus === 'REJECTED' || false,
//           isNotified: item.approvalStatus === 'NOTIFIED' || false,
//           status: item.approvalStatus?.toLowerCase() || 'pending',
//           originalDate: item.timesheetDate,
//           "Date": formatDate(item.timesheetDate),
//           "Employee ID": item.employee?.employeeId || item.employeeId || "",
//           "Timesheet Type Code": item.timesheetTypeCode || "",
//           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//           "Fiscal Year": item.fiscalYear || "",
//           "Period": item.period || "",
//           "Project ID": item.projectId || "",
//           "Account": item.accountId || "",
//           "Org": item.organizationId || "",
//           "PLC": item.projectLaborCategory || "",
//           "Pay Type": item.payType || "",
//           "Hours": formatHours(item.hours),
//           "Seq No": item.sequenceNumber || "",
//           "Status": item.approvalStatus || "PENDING",
//           "Comment": item.comment || "",
//           "IP Address": item.ipAddress || ""
//         }));

//         // FIX: This adds the imported data to your table immediately (no reload needed)
//         setRows(prevRows => [...prevRows, ...formattedImportedData]);
        
//         const requestBody = dataToProcess.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId,
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
      
//     } else {
//       // Handle failed response (your existing error handling)
//       try {
//         const textResponse = await importResponse.text();
        
//         if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
//           console.log('Detected CSV text in error response:', textResponse.substring(0, 200) + '...');
          
//           const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//           downloadCSV(textResponse, filename);
//           showToast("CSV File Downloaded", "success");
//           return;
//         } else {
//           showToast('Import failed: ' + textResponse, "error");
//         }
//       } catch (textError) {
//         showToast('Import failed: Unable to parse response', "error");
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

// const handleImportFile = async (e) => {
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
//       // Try JSON first, fallback to text if it fails
//       let responseData;
//       let isCSVResponse = false;
      
//       try {
//         responseData = await importResponse.json();
//         console.log('Successfully parsed JSON response');
//       } catch (jsonError) {
//         console.log('JSON parsing failed, trying text...', jsonError.message);
//         // Reset the response by making a new request (since response can only be consumed once)
//         const retryResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
//           method: 'POST',
//           body: formData
//         });
//         responseData = await retryResponse.text();
//         isCSVResponse = true;
//         console.log('Fallback to text response successful');
//       }
      
//       // Handle CSV/text response - ONLY download, don't add to table
//       if (isCSVResponse && typeof responseData === 'string') {
//         console.log('Processing CSV text response:', responseData.substring(0, 200) + '...');
        
//         // Download the raw CSV text directly
//         const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//         downloadCSV(responseData, filename);
//         showToast("Downloaded Successfully", "success");
        
//         return; // Exit - don't add CSV/text response to table
//       }
      
//       // Handle JSON response - THIS adds imported data to table
//       let dataToProcess = null;
//       let successMessage = '';
      
//       if (responseData && responseData.message) {
//         successMessage = responseData.message;
//         showToast(successMessage, "success");
        
//         if (responseData.data && Array.isArray(responseData.data)) {
//           dataToProcess = responseData.data;
//         }
//       } else if (Array.isArray(responseData)) {
//         dataToProcess = responseData;
//         successMessage = `Successfully imported ${responseData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//       }
      
//       // Process JSON data and add to table
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         try {
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast("Downloaded Successfully", "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
        
//         // Add imported JSON data to table
//         const formattedImportedData = dataToProcess.map((item, index) => ({
//           id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === 'APPROVED' || false,
//           isRejected: item.approvalStatus === 'REJECTED' || false,
//           isNotified: item.approvalStatus === 'NOTIFIED' || false,
//           status: item.approvalStatus?.toLowerCase() || 'pending',
//           originalDate: item.timesheetDate,
//           "Date": formatDate(item.timesheetDate),
//           "Employee ID": item.employee?.employeeId || item.employeeId || "",
//           "Timesheet Type Code": item.timesheetTypeCode || "",
//           "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//           "Fiscal Year": item.fiscalYear || "",
//           "Period": item.period || "",
//           "Project ID": item.projectId || "",
//           "Account": item.accountId || "",
//           "Org": item.organizationId || "",
//           "PLC": item.projectLaborCategory || "",
//           "Pay Type": item.payType || "",
//           "Hours": formatHours(item.hours),
//           "Seq No": item.sequenceNumber || "",
//           "Status": item.approvalStatus || "PENDING",
//           "Comment": item.comment || "",
//           "IP Address": item.ipAddress || ""
//         }));

//         // FIX: Add imported data to table immediately (no reload needed)
//         setRows(prevRows => [...prevRows, ...formattedImportedData]);
        
//         const requestBody = dataToProcess.map(item => ({
//           requestType: "TIMESHEET",
//           requesterId: 1,
//           timesheetId: item.timesheetId || item.id,
//           projectId: projectId,
//           requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//         }));
        
//         const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });
        
//         if (notifyResponse.ok) {
//           showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//         } else {
//           showToast('Import successful but notifications failed', "warning");
//         }
//       }
      
//     } else {
//       // Handle failed response
//       try {
//         const textResponse = await importResponse.text();
        
//         if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
//           console.log('Detected CSV text in error response:', textResponse.substring(0, 200) + '...');
          
//           const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//           downloadCSV(textResponse, filename);
//           showToast("Downloaded Successfully", "success");
//           return;
//         } else {
//           showToast('Import failed: ' + textResponse, "error");
//         }
//       } catch (textError) {
//         showToast('Import failed: Unable to parse response', "error");
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

// const handleImportFile = async (e) => {
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
//       // First try to get the response as text to handle both JSON and CSV responses
//       const responseText = await importResponse.text();
//       console.log('Raw response:', responseText.substring(0, 200) + '...');
      
//       let responseData;
//       let isCSVResponse = false;
      
//       // Try to parse as JSON first
//       try {
//         responseData = JSON.parse(responseText);
//         console.log('Successfully parsed as JSON:', responseData);
//       } catch (jsonError) {
//         // If JSON parsing fails, treat as CSV
//         responseData = responseText;
//         isCSVResponse = true;
//         console.log('Treating as CSV response');
//       }
      
//       // Handle CSV/text response - ONLY download, don't add to table
//       if (isCSVResponse && typeof responseData === 'string') {
//         console.log('Processing CSV text response:', responseData.substring(0, 200) + '...');
        
//         // Download the raw CSV text directly
//         const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//         downloadCSV(responseData, filename);
//         showToast("Downloaded Successfully", "success");
        
//         return; // Exit - don't add CSV/text response to table
//       }
      
//       // Handle JSON response - THIS adds imported data to table
//       let dataToProcess = null;
//       let successMessage = '';
      
//       console.log('Processing JSON response:', responseData);
      
//       if (responseData && responseData.message) {
//         successMessage = responseData.message;
//         showToast(successMessage, "success");
        
//         if (responseData.data && Array.isArray(responseData.data)) {
//           dataToProcess = responseData.data;
//           console.log('Found data array with', dataToProcess.length, 'items');
//         }
//       } else if (Array.isArray(responseData)) {
//         dataToProcess = responseData;
//         successMessage = `Successfully imported ${responseData.length} records from: ${file.name}`;
//         showToast(successMessage, "success");
//         console.log('Response is array with', dataToProcess.length, 'items');
//       } else {
//         successMessage = `Successfully imported: ${file.name}`;
//         showToast(successMessage, "success");
//         console.log('No array data found, but import successful');
//       }
      
//       // Process JSON data and add to table
//       if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
//         console.log('Processing', dataToProcess.length, 'records for table update');
        
//         try {
//           const csvContent = arrayToCSV(dataToProcess);
//           if (csvContent) {
//             const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//             downloadCSV(csvContent, filename);
//             showToast("Downloaded Successfully", "success");
//           }
//         } catch (downloadError) {
//           console.warn('Failed to download CSV:', downloadError);
//           showToast('Import successful but download failed', "warning");
//         }
        
//         // Add imported JSON data to table
//         const formattedImportedData = dataToProcess.map((item, index) => {
//           console.log(`Formatting item ${index}:`, item);
//           return {
//             id: item.timesheetId || item.id || `imported-${Date.now()}-${index}`,
//             requestId: item.requestId || item.id || `imported-${Date.now()}-${index}`,
//             levelNo: item.levelNo || 1,
//             selected: false,
//             notifySelected: false,
//             isApproved: item.approvalStatus === 'APPROVED' || false,
//             isRejected: item.approvalStatus === 'REJECTED' || false,
//             isNotified: item.approvalStatus === 'NOTIFIED' || false,
//             status: item.approvalStatus?.toLowerCase() || 'pending',
//             originalDate: item.timesheetDate,
//             "Date": formatDate(item.timesheetDate),
//             "Employee ID": item.employee?.employeeId || item.employeeId || "",
//             "Timesheet Type Code": item.timesheetTypeCode || "",
//             "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//             "Fiscal Year": item.fiscalYear || "",
//             "Period": item.period || "",
//             "Project ID": item.projectId || "",
//             "Account": item.accountId || "",
//             "Org": item.organizationId || "",
//             "PLC": item.projectLaborCategory || "",
//             "Pay Type": item.payType || "",
//             "RLSE Number": item.rlseNumber || "",
//             "Hours": formatHours(item.hours),
//             "PO Number": item.poNumber || "",
//             "PO Line Number": item.poLineNumber || "",
//             "Seq No": item.sequenceNumber || "",
//             "Status": item.approvalStatus || "PENDING",
//             "Comment": item.comment || `Imported from ${file.name}`,
//             "IP Address": item.ipAddress || ""
//           };
//         });

//         console.log('Formatted data for table:', formattedImportedData);

//         // FIX: Add imported data to table immediately (no reload needed)
//         // Force re-render by creating completely new array reference
//         setRows(prevRows => {
//           const newRows = [...prevRows, ...formattedImportedData];
//           console.log('Table updated! Previous count:', prevRows.length, 'New count:', newRows.length);
//           return newRows;
//         });
        
//         showToast(`Added ${formattedImportedData.length} records to table`, "success");
        
//         // Send notifications if we have projectId
//         if (projectId) {
//           const requestBody = dataToProcess.map(item => ({
//             requestType: "TIMESHEET",
//             requesterId: 1,
//             timesheetId: item.timesheetId || item.id,
//             projectId: projectId,
//             requestData: `Notification for imported timesheet ${item.timesheetId || item.id}`
//           }));
          
//           try {
//             const notifyResponse = await fetch('https://timesheet-latest.onrender.com/api/Approval/BulkNotify', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(requestBody)
//             });
            
//             if (notifyResponse.ok) {
//               showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
//             } else {
//               showToast('Import successful but notifications failed', "warning");
//             }
//           } catch (notifyError) {
//             console.warn('Notification failed:', notifyError);
//             showToast('Import successful but notifications failed', "warning");
//           }
//         }
//       } else {
//         console.log('No data to add to table');
//         showToast('Import completed but no records found to display', "warning");
//       }
      
//     } else {
//       // Handle failed response
//       try {
//         const textResponse = await importResponse.text();
        
//         if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
//           console.log('Detected CSV text in error response:', textResponse.substring(0, 200) + '...');
          
//           const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
//           downloadCSV(textResponse, filename);
//           showToast("Downloaded Successfully", "success");
//           return;
//         } else {
//           showToast('Import failed: ' + textResponse, "error");
//         }
//       } catch (textError) {
//         showToast('Import failed: Unable to parse response', "error");
//       }
//     }
//   } catch (error) {
//     console.error('Import error:', error);
//     showToast('Import failed. Please try again.', "error");
//   } finally {
//     setActionLoading(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }
// };

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
      // Try JSON first, fallback to text if it fails
      let responseData;
      let isCSVResponse = false;
      
      try {
        responseData = await importResponse.json();
        console.log('Successfully parsed JSON response');
      } catch (jsonError) {
        console.log('JSON parsing failed, trying text...', jsonError.message);
        // Reset the response by making a new request (since response can only be consumed once)
        const retryResponse = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/import-csv', {
          method: 'POST',
          body: formData
        });
        responseData = await retryResponse.text();
        isCSVResponse = true;
        console.log('Fallback to text response successful');
      }
      
      // Handle CSV/text response - ONLY download, don't add to table
      if (isCSVResponse && typeof responseData === 'string') {
        console.log('Processing CSV text response:', responseData.substring(0, 200) + '...');
        
        // Download the raw CSV text directly
        const filename = `api_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
        downloadCSV(responseData, filename);
        showToast("Downloaded Successfully", "success");
        
        // FIX: Refresh data by calling fetchData() after successful import
        showToast("Import completed successfully", "info");
        await fetchData(); // This will refresh the table with latest data
        
        return; // Exit - CSV/text response handled
      }
      
      // Handle JSON response - THIS adds imported data to table
      let dataToProcess = null;
      let successMessage = '';
      
      if (responseData && responseData.message) {
        successMessage = responseData.message;
        showToast(successMessage, "success");
        
        if (responseData.data && Array.isArray(responseData.data)) {
          dataToProcess = responseData.data;
        }
      } else if (Array.isArray(responseData)) {
        dataToProcess = responseData;
        successMessage = `Successfully imported ${responseData.length} records from: ${file.name}`;
        showToast(successMessage, "success");
      } else {
        successMessage = `Successfully imported: ${file.name}`;
        showToast(successMessage, "success");
      }
      
      // Process JSON data and add to table
      if (dataToProcess && Array.isArray(dataToProcess) && dataToProcess.length > 0) {
        try {
          const csvContent = arrayToCSV(dataToProcess);
          if (csvContent) {
            const filename = `imported_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
            downloadCSV(csvContent, filename);
            showToast("Downloaded Successfully", "success");
          }
        } catch (downloadError) {
          console.warn('Failed to download CSV:', downloadError);
          showToast('Import successful but download failed', "warning");
        }
        
        // Send notifications
        const requestBody = dataToProcess.map(item => ({
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
          showToast(`Notifications sent for ${dataToProcess.length} imported timesheets!`, "success");
        } else {
          showToast('Import successful but notifications failed', "warning");
        }
      }
      
      // FIX: Refresh data by calling fetchData() after successful import
      await fetchData(); // This will refresh the table with latest data including imported records
      
    } else {
      // Handle failed response
      try {
        const textResponse = await importResponse.text();
        
        if (textResponse && (textResponse.includes(',') || textResponse.includes('\n'))) {
          console.log('Detected CSV text in error response:', textResponse.substring(0, 200) + '...');
          
          const filename = `error_response_${file.name.replace('.csv', '')}_${Date.now()}.csv`;
          downloadCSV(textResponse, filename);
          showToast("Downloaded Successfully", "success");
          return;
        } else {
          showToast('Import failed: ' + textResponse, "error");
        }
      } catch (textError) {
        showToast('Import failed: Unable to parse response', "error");
      }
    }
  } catch (error) {
    console.error('Import error:', error);
    showToast('Import failed. Please try again.', "error");
  } finally {
    setActionLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
};










  const handleNotifyClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (actionLoading) return;
    
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
        const notifiedIds = selectedNotifyRows.map(row => row.id);
        // setRows(prevRows => prevRows.filter(row => !notifiedIds.includes(row.id)));
        setSelectedNotifyRows([]);
        setNotifySelectAll(false);
      } else {
        showToast('Failed to send notifications. Please try again.', "error");
      }
    } catch (error) {
      showToast('Failed to send notifications. Please try again.', "error");
    } finally {
      setActionLoading(false);
    }
  };


  
// const handleNotifyClick = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   if (actionLoading) return;
//   if (selectedNotifyRows.length === 0) {
//     showToast("Please select at least one timesheet to notify.", "warning");
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
    
//     const response = await fetch("https://timesheet-latest.onrender.com/api/Approval/BulkNotify", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestBody)
//     });
    
//     if (response.ok) {
//       showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
      
//       // FIX: Don't remove rows! Update their status instead
//       const notifiedIds = selectedNotifyRows.map(row => row.id);
//       setRows(prevRows => prevRows.map(row => 
//         notifiedIds.includes(row.id) 
//           ? { 
//               ...row, 
//               status: "notified", 
//               "Status": "NOTIFIED", 
//               isNotified: true, 
//               notifySelected: false 
//             }
//           : row
//       ));
      
//       // FIX: Refresh data after 2 seconds to ensure User sees the changes
//       setTimeout(() => {
//         fetchData();
//       }, 2000);
      
//       setSelectedNotifyRows([]);
//       setNotifySelectAll(false);
//     } else {
//       showToast("Failed to send notifications. Please try again.", "error");
//     }
//   } catch (error) {
//     showToast("Failed to send notifications. Please try again.", "error");
//   } finally {
//     setActionLoading(false);
//   }
// };

  const handleNotifyRowSelect = (rowIndex, isSelected) => {

    const rowData = filteredRows[rowIndex];
  
  // Prevent selection of NOTIFIED rows
  if (rowData.isNotified || rowData.status === 'notified' || rowData["Status"] === 'NOTIFIED') {
    return;
  }
    const updatedRows = [...rows];
    const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
    updatedRows[actualRowIndex].notifySelected = isSelected;
    setRows(updatedRows);
    // const rowData = filteredRows[rowIndex];
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

    // Filter out NOTIFIED rows from bulk selection
  const selectableRows = filteredRows.filter(row => 
    !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
  );

    selectableRows.forEach(filteredRow => {
      const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
      if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
    });
    setRows(updatedRows);
    setSelectedNotifyRows(isSelected ? [...selectableRows] : []);
  };

  const handleRowSelect = (rowIndex, isSelected) => {
    if (!isUser) return;
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
    if (!isUser) return;
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
    if (!isUser || selectedRows.length === 0) {
      showToast("Please select at least one timesheet to approve.", "warning");
      return;
    }
    setPendingAction('approve');
    setShowReasonModal(true);
  };
  
  const handleBulkRejectClick = () => {
    if (!isUser || selectedRows.length === 0) {
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
        setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
          { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast('Failed to approve some timesheets. Please try again.', "error");
      }
    } catch (error) {
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
        setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
          { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast('Failed to reject some timesheets. Please try again.', "error");
      }
    } catch (error) {
      showToast('Failed to reject timesheets. Please check your connection.', "error");
    } finally {
      setActionLoading(false);
    }
  };

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
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          
          <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
            <div className="flex gap-2 flex-wrap">
              {/* <input
                type="date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                title="Filter by Date"
                placeholder="MM/DD/YYYY"
              /> */}
              {/* <input
  type="text"
  value={searchDate}
  onChange={e => setSearchDate(e.target.value)}
  placeholder="MM/DD/YYYY"
  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
  title="Filter by Date (MM/DD/YYYY Format)"
/> */}

{/* <DatePicker
  selected={searchDate ? new Date(searchDate) : null}
  onChange={date => setSearchDate(date ? formatDate(date) : '')}
  dateFormat="MM/dd/yyyy"
  placeholderText="MM/DD/YYYY"
  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
/> */}

{/* <DatePicker
  selected={searchDate ? new Date(searchDate) : null}
  onChange={date => setSearchDate(date ? date.toISOString().split('T')[0] : '')}
  dateFormat="MM/dd/yyyy"
  placeholderText="MM/DD/YYYY"
  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
  showPopperArrow={false}
  autoComplete="off"
/>
 */}

 <DatePicker
  selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
  onChange={(date) => {
    if (date) {
      // Force to local date without timezone adjustment
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      const isoString = localDate.toISOString().split('T')[0];
      setSearchDate(isoString);
    } else {
      setSearchDate('');
    }
  }}
  dateFormat="MM/dd/yyyy"
  placeholderText="MM/DD/YYYY"
  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
  showPopperArrow={false}
  autoComplete="off"
/>



              <input
                type="text"
                value={searchEmployeeId}
                onChange={e => setSearchEmployeeId(e.target.value)}
                placeholder="Employee ID"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                value={searchEmployeeName}
                onChange={e => setSearchEmployeeName(e.target.value)}
                placeholder="Employee Name"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
  type="text"
  value={searchStatus}
  onChange={(e) => setSearchStatus(e.target.value)}
  placeholder="Status"
  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
/>

            </div>
            {/* <div className="flex gap-2 items-center">
              <select
                value={sortConfig.key || ''}
                onChange={(e) => {
                  if (e.target.value) {
                    handleSort(e.target.value);
                  } else {
                    setSortConfig({ key: null, direction: 'asc' });
                  }
                }}
                className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Date</option>
                <option value="Date">Date</option>
                <option value="Employee ID">Employee ID</option>
                <option value="Name">Name</option>
              </select>
              {sortConfig.key && (
                <button
                  onClick={() => {
                    setSortConfig({
                      key: sortConfig.key,
                      direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
                    });
                  }}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  {sortConfig.direction === 'asc' ? '↑ Asc' : '↓ Desc'}
                </button>
              )}
            </div> */}
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
                {isUser && hasPendingRows && (
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
                      onClick={handleImportClick}
                      type="button"
                      disabled={actionLoading}
                      className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Processing..." : "Import"}
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
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9",
                          cursor: ['Date', 'Employee ID', 'Name'].includes(col) ? "pointer" : "default",
                          userSelect: "none"
                        }}
                        onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
                      >
                        {col === "Select" && isUser ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={e => handleSelectAll(e.target.checked)}
                              className="cursor-pointer"
                              disabled={!hasPendingRows}
                            />
                            <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
                          </div>
                        ) : col === "Notify" && isAdmin ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                            <input
                              type="checkbox"
                              checked={notifySelectAll}
                              onChange={e => handleNotifySelectAll(e.target.checked)}
                              className="cursor-pointer"
                            //   disabled={row.isNotified || row.status === 'notified' || row["Status"] === 'NOTIFIED'}
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
                        {/* {columns.map(col => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: "center",
                              ...(col === "Status" ? getStatusStyle(row[col]) : {})
                            }}>
                            {col === "Select" && isUser ? (
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={e => handleRowSelect(rdx, e.target.checked)}
                                className="cursor-pointer"
                                disabled={!isRowActionable(row)}
                              />
                            ) : col === "Notify" && isAdmin ? (
                              <input
                                type="checkbox"
                                checked={row.notifySelected || false}
                                onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
                                className="cursor-pointer"
                              />
                            ) : row[col] || ""}
                          </td>
                        ))} */}
                        {columns.map((col) => (
  <td
    key={col}
    style={{
      border: "1px solid #e5e7eb",
      padding: "8px",
      fontSize: "11px",
      minWidth: col === "Select" || col === "Notify" ? "80px" : `${colWidth}px`,
      whiteSpace: "nowrap",
      textAlign: "center",
      ...(col === "Status" ? getStatusStyle(row[col]) : {})
    }}>
    {col === "Status" ? (
      <span style={getStatusStyle(row[col] || "PENDING")}>
        {row[col] || "PENDING"}
      </span>
    ) : col === "Select" && isUser ? (
      <input
        type="checkbox"
        checked={row.selected || false}
        onChange={e => handleRowSelect(rdx, e.target.checked)}
        className="cursor-pointer"
        disabled={!isRowActionable(row)}
      />
    ) : col === "Notify" && isAdmin ? (
      <input
        type="checkbox"
        checked={row.notifySelected || false}
        onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
        className="cursor-pointer"
        disabled={row.isNotified || (row[col] || row["Status"] || "").toLowerCase() === "notified"}
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
