import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, X, Search, ChevronDown, LogOut } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { backendUrl } from "./config";

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
  const displayTime =
    message.includes("import") || message.includes("Import") ? 4000 : 1000;
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, displayTime);
};

const columnsAdmin = [
  "Select",
  "Status",
  "Exported",
  "Date",
  "Employee ID",
  "Name",
  "Timesheet Type Code",
  "Fiscal Year",
  "Period",
  "Project ID",
  "PLC",
  "Pay Type",
  "Hours",
  "Seq No",
  "Comment",
  "Approver Name",
  "Approved Timestamp",
  "Imported By",
  "Imported Timestamp",
];

const columnsViewer = [
  "Select",
  "Status",
  "Date",
  "Employee ID",
  "Name",
  "Timesheet Type Code",
  "Fiscal Year",
  "Period",
  "Project ID",
  "PLC",
  "Pay Type",
  "Hours",
  "Seq No",
  "Comment",
  "Approved Timestamp",
  "Imported By",
  "Imported Timestamp",
];

const ReasonModal = ({
  isOpen,
  action,
  selectedCount,
  onConfirm,
  onCancel,
}) => {
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);
  if (!isOpen) return null;
  const handleConfirm = () =>
    reason.trim()
      ? onConfirm(reason.trim())
      : showToast("Please provide a reason.", "warning");
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleConfirm();
    else if (e.key === "Escape") onCancel();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {action === "approve" ? "Approve" : "Reject"} Timesheets
          </h3>
          <p className="text-sm text-gray-600">
            You are about to {action} {selectedCount} timesheet
            {selectedCount > 1 ? "s" : ""}. Please provide a reason:
          </p>
        </div>
        <div className="mb-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Enter reason for ${
              action === "approve" ? "approving" : "rejecting"
            } these timesheets...`}
            className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            autoFocus
          />
          <div className="text-xs text-gray-500 mt-1">
            {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc
            to cancel
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              action === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {action === "approve" ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ApprovalComponent() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const [searchDate, setSearchDate] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [statusFilters, setStatusFilters] = useState({});
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userIpAddress, setUserIpAddress] = useState("");

  const [globalSearch, setGlobalSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isAdmin = currentUser?.role === "Admin";
  const isUser = currentUser?.role === "User";
  const columns = isAdmin ? columnsAdmin : columnsViewer;
  const colWidth = 120;
  const minTableWidth = columns.length * colWidth;

  useEffect(() => {
    if (isAdmin) {
      setStatusFilters({
        OPEN: false,
        PENDING: false,
        REJECTED: false,
        APPROVED: false,
      });
    } else if (isUser) {
      setStatusFilters({
        APPROVED: false,
        PENDING: false,
        REJECTED: false,
      });
    }
  }, [isAdmin, isUser, currentUser]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const parts = dateString.split("-");
      if (parts.length !== 3) return dateString;
      const [year, month, day] = parts;
      return `${month}/${day}/${year}`;
    } catch {
      return dateString;
    }
  };

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return "";
    const numHours = parseFloat(hours);
    if (isNaN(numHours)) return hours;
    return numHours.toFixed(2);
  };

  const formatDateFromInput = (inputDate) => {
    if (!inputDate) return "";
    try {
      const date = new Date(inputDate + "T00:00:00");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch {
      return "";
    }
  };

  const getSortedRows = (rowsToSort) => {
    let sorted = [...rowsToSort];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal, bVal;

        if (sortConfig.key === "Date") {
          aVal = new Date(a.originalDate || a["Date"]);
          bVal = new Date(b.originalDate || b["Date"]);
          if (isNaN(aVal.getTime())) aVal = new Date(0);
          if (isNaN(bVal.getTime())) bVal = new Date(0);
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (sortConfig.key === "Hours") {
          aVal = parseFloat(a[sortConfig.key]) || 0;
          bVal = parseFloat(b[sortConfig.key]) || 0;
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (sortConfig.key === "Status") {
          const getStatusPriority = (status) => {
            const statusUpper = String(status || "PENDING").toUpperCase();
            switch (statusUpper) {
              case "OPEN":
                return 1;
              case "PENDING":
                return 2;
              case "APPROVED":
                return 3;
              case "REJECTED":
                return 4;
              case "NOTIFIED":
                return 5;
              default:
                return 6;
            }
          };

          aVal = getStatusPriority(a["Status"]);
          bVal = getStatusPriority(b["Status"]);
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else {
          aVal = String(a[sortConfig.key] || "").toLowerCase();
          bVal = String(b[sortConfig.key] || "").toLowerCase();

          if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
    } else {
      sorted.sort((a, b) => {
        let aDate = new Date(a.originalDate || a["Date"]);
        let bDate = new Date(b.originalDate || b["Date"]);
        if (isNaN(aDate.getTime())) aDate = new Date(0);
        if (isNaN(bDate.getTime())) bDate = new Date(0);
        if (aDate.getTime() !== bDate.getTime())
          return aDate.getTime() - bDate.getTime();
        const aEmpId = String(a["Employee ID"] || "").toLowerCase();
        const bEmpId = String(b["Employee ID"] || "").toLowerCase();
        return aEmpId.localeCompare(bEmpId);
      });
    }

    return sorted;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (columnKey === "Select") return null;

    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "⇅";
  };

  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";

    switch (statusUpper) {
      case "OPEN":
        return {
          backgroundColor: "#dbeafe",
          color: "#2563eb",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
        };
      case "APPROVED":
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
        };
      case "REJECTED":
        return {
          backgroundColor: "#fce7f3",
          color: "#ec4899",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
        };
      case "PENDING":
        return {
          backgroundColor: "#fef9c3",
          color: "#ca8a04",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
        };
      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#6b7280",
          fontWeight: "500",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
        };
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (userLoaded && currentUser) {
      fetchData();
    }
  }, [userLoaded, currentUser, isAdmin]);

  const fetchData = async () => {
    if (!userLoaded || !currentUser) return;
    try {
      setLoading(true);
      let apiUrl = "";
      if (isAdmin) {
        apiUrl = `${backendUrl}/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(
          currentUser.username || currentUser.id
        )}&status=ALL`;
      } else if (isUser) {
        apiUrl = `${backendUrl}/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(
          currentUser.username || currentUser.id
        )}&status=ALL`;
      } else {
        setRows([]);
        setLoading(false);
        return;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData)
        ? apiData.map((item, index) => ({
            id: item.timesheetId || item.id || `fallback-${index}`,
            Exported: item.isExported ? "Y" : "N",
            requestId: item.requestId || item.id,
            levelNo: item.levelNo || 1,
            selected: false,
            isApproved: item.approvalStatus === "APPROVED" || false,
            isRejected: item.approvalStatus === "REJECTED" || false,
            Status: (item.approvalStatus || "PENDING").toUpperCase(),
            originalDate: item.timesheetDate,
            Date: formatDate(item.timesheetDate),
            "Employee ID": item.employee?.employeeId || item.employeeId || "",
            "Timesheet Type Code": item.timesheetTypeCode || "",
            Name:
              item.displayedName ||
              item.employeeName ||
              `Employee ${item.employee?.employeeId || item.employeeId}` ||
              "",
            "Approver Name": item.approvedBy || "",
            "Approved Timestamp": item.approvedDate ? item.approvedDate : " ",
            "Imported By": item.createdBy || "",
            "Imported Timestamp": item.importedTimestamp,
            "Fiscal Year": item.fiscalYear || "",
            Period: item.period || "",
            "Project ID": item.projectId || "",
            PLC: item.projectLaborCategory || "",
            "Pay Type": item.payType || "",
            Hours: formatHours(item.hours),
            "Seq No": item.sequenceNumber || "",
            Comment: item.comment || "",
          }))
        : [];

      setRows(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];

    if (globalSearch.trim()) {
      const searchTerm = globalSearch.trim().toLowerCase();
      filtered = filtered.filter((row) => {
        return (
          (row["Employee ID"] || "").toLowerCase().includes(searchTerm) ||
          (row["Name"] || "").toLowerCase().includes(searchTerm) ||
          (row["Approver Name"] || "").toLowerCase().includes(searchTerm) ||
          (row["Project ID"] || "").toLowerCase().includes(searchTerm)
        );
      });
    }

    if (searchDate) {
      const searchDateFormatted = formatDateFromInput(searchDate);
      filtered = filtered.filter((row) => {
        const rowDate = row["Date"];
        return rowDate === searchDateFormatted;
      });
    }
    if (searchEmployeeId.trim()) {
      filtered = filtered.filter((row) =>
        (row["Employee ID"] || "")
          .toLowerCase()
          .includes(searchEmployeeId.trim().toLowerCase())
      );
    }
    if (searchEmployeeName.trim()) {
      filtered = filtered.filter((row) =>
        (row["Name"] || "")
          .toLowerCase()
          .includes(searchEmployeeName.trim().toLowerCase())
      );
    }

    const selectedStatuses = Object.entries(statusFilters)
      .filter(([status, checked]) => checked)
      .map(([status]) => status);

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((row) =>
        selectedStatuses.some((status) =>
          row["Status"].toUpperCase().includes(status.toUpperCase())
        )
      );
    }

    return getSortedRows(filtered);
  };

  const filteredRows = getFilteredRows();

  //    const handleLogout = () => {
  //     localStorage.removeItem("currentUser");
  //     setCurrentUser(null);
  //     setUserLoaded(false);
  //     showToast("Logged out successfully", "info");
  //     navigate("/");
  //   };

  //   const handleLogout = () => {
  //   localStorage.removeItem("currentUser");
  //   setCurrentUser(null);
  //   showToast("Logged out successfully", "info");

  //   // Use setTimeout to show toast before navigating
  //   setTimeout(() => {
  //     navigate("/login");  // or "/" if login is at root
  //   }, 500);
  // };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    showToast("Logged out successfully", "info");
    // Navigate immediately without setTimeout, remove setCurrentUser
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIpAddress(data.ip);
      } catch {
        setUserIpAddress("0.0.0.0");
      }
    };
    fetchUserIp();
  }, []);

  const buildBulkRequestBody = (selectedRowsData, action, reason) => {
    return selectedRowsData.map((row) => ({
      requestId: row.requestId || row.id,
      levelNo: row.levelNo || 1,
      approverUserId: currentUser.userId || 0,
      comment: `${action === "approve" ? "Approved" : "Rejected"} by ${
        currentUser.name
      }: ${reason}`,
      ipAddress: userIpAddress,
    }));
  };

  const handleRowSelect = (rowIndex, isSelected) => {
    if (!(isUser || isAdmin)) return;
    const updatedRows = [...rows];
    const actualRowIndex = rows.findIndex(
      (row) => row.id === filteredRows[rowIndex].id
    );
    updatedRows[actualRowIndex].selected = isSelected;
    setRows(updatedRows);
    const rowData = filteredRows[rowIndex];
    if (isSelected) {
      setSelectedRows((prev) => [...prev, rowData]);
    } else {
      setSelectedRows((prev) => prev.filter((item) => item.id !== rowData.id));
      setSelectAll(false);
    }
  };

  const isRowActionable = (row) => {
    if (isAdmin) {
      return (
        (row.Status === "OPEN" || row.Status === "PENDING") &&
        !row.isApproved &&
        !row.isRejected
      );
    }
    return row.Status === "PENDING" && !row.isApproved && !row.isRejected;
  };

  const handleSelectAll = (isSelected) => {
    if (!(isUser || isAdmin)) return;
    setSelectAll(isSelected);

    const filteredRowIds = new Set(filteredRows.map((row) => row.id));

    const updatedRows = rows.map((row) => {
      if (filteredRowIds.has(row.id)) {
        const isActionable = isRowActionable(row);
        return {
          ...row,
          selected: isSelected && isActionable,
        };
      }
      return row;
    });

    setRows(updatedRows);
    setSelectedRows(updatedRows.filter((row) => row.selected));
  };

  const getApproveRejectCount = () => {
    if (isAdmin) {
      return selectedRows.filter((row) => row.Status === "PENDING").length;
    }
    return selectedRows.length;
  };

  const performBulkApprove = async (reason) => {
    setApproveLoading(true);
    try {
      const rowsToApprove = isAdmin
        ? selectedRows.filter((row) => row.Status === "PENDING")
        : selectedRows;

      const requestBody = buildBulkRequestBody(
        rowsToApprove,
        "approve",
        reason
      );

      const response = await fetch(`${backendUrl}/api/Approval/BulkApprove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        showToast(
          `Successfully approved ${rowsToApprove.length} timesheets with reason: "${reason}"`,
          "success"
        );
        const approvedIds = rowsToApprove.map((row) => row.id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            approvedIds.includes(row.id)
              ? {
                  ...row,
                  isApproved: true,
                  Status: "APPROVED",
                  selected: false,
                }
              : row
          )
        );
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast(
          "Failed to approve some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Failed to approve timesheets. Please check your connection.",
        "error"
      );
    } finally {
      setApproveLoading(false);
    }
  };

  const performBulkReject = async (reason) => {
    setRejectLoading(true);
    try {
      const rowsToReject = isAdmin
        ? selectedRows.filter((row) => row.Status === "PENDING")
        : selectedRows;

      const requestBody = buildBulkRequestBody(rowsToReject, "reject", reason);

      const response = await fetch(`${backendUrl}/api/Approval/BulkReject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        showToast(
          `Successfully rejected ${rowsToReject.length} timesheets with reason: "${reason}"`,
          "success"
        );
        const rejectedIds = rowsToReject.map((row) => row.id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            rejectedIds.includes(row.id)
              ? {
                  ...row,
                  isRejected: true,
                  Status: "REJECTED",
                  selected: false,
                }
              : row
          )
        );
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast(
          "Failed to reject some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Failed to reject timesheets. Please check your connection.",
        "error"
      );
    } finally {
      setRejectLoading(false);
    }
  };

  const handleBulkApproveClick = () => {
    if (!(isUser || isAdmin) || selectedRows.length === 0) {
      showToast("Please select at least one timesheet to approve.", "warning");
      return;
    }
    setPendingAction("approve");
    setShowReasonModal(true);
  };

  const handleBulkRejectClick = () => {
    if (!(isUser || isAdmin) || selectedRows.length === 0) {
      showToast("Please select at least one timesheet to reject.", "warning");
      return;
    }
    setPendingAction("reject");
    setShowReasonModal(true);
  };

  const handleReasonConfirm = (reason) => {
    setShowReasonModal(false);
    if (pendingAction === "approve") {
      performBulkApprove(reason);
    } else if (pendingAction === "reject") {
      performBulkReject(reason);
    }
    setPendingAction(null);
  };

  const handleClearAllFilters = () => {
    setGlobalSearch("");
    setSearchDate("");
    setSearchEmployeeId("");
    setSearchEmployeeName("");

    setStatusFilters((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {})
    );
  };

  const hasPendingRows = Array.isArray(filteredRows)
    ? filteredRows.some((row) => isRowActionable(row))
    : false;

  //   if (!userLoaded || !currentUser) {
  //     return (
  //       <div className="min-h-screen bg-[#f9fafd] flex flex-col">
  //         <div className="flex-1 flex items-center justify-center">
  //           <div className="flex items-center">
  //             {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div> */}
  //             {/* <span className="ml-2">Loading user session...</span> */}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading approval data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
      <ReasonModal
        isOpen={showReasonModal}
        action={pendingAction}
        selectedCount={selectedRows.length}
        onConfirm={handleReasonConfirm}
        onCancel={() => {
          setShowReasonModal(false);
          setPendingAction(null);
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full flex flex-col items-center">
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
                <img src="/Columbus_Logo.png" alt="Logo" className="h-10" />
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

          <div className="w-full bg-gray-800 p-4 rounded-lg shadow border border-gray-200 mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search ID, Name, Project..."
                className="border border-gray-300 rounded-md px-3 py-1.5 pl-8 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-full"
              />
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 bg-white text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors shadow-sm border border-gray-300"
            >
              Advanced
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
            </button>

            {showAdvanced && (
              <>
                <DatePicker
                  selected={
                    searchDate ? new Date(searchDate + "T00:00:00") : null
                  }
                  onChange={(date) => {
                    if (date) {
                      const localDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      );
                      const isoString = localDate.toISOString().split("T")[0];
                      setSearchDate(isoString);
                    } else {
                      setSearchDate("");
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
                  onChange={(e) => setSearchEmployeeId(e.target.value)}
                  placeholder="Filter by Employee ID"
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-36"
                />
                <input
                  type="text"
                  value={searchEmployeeName}
                  onChange={(e) => setSearchEmployeeName(e.target.value)}
                  placeholder="Filter by Name"
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm w-36"
                />
              </>
            )}

            <div className="flex-grow"></div>

            <div className="flex gap-2 items-center border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 shadow-sm">
              <span className="flex items-center text-xs font-semibold text-gray-700 mr-2">
                <Filter size={12} className="mr-1.5" />
                Status:
              </span>
              {Object.entries(statusFilters).map(([status, checked]) => (
                <label
                  key={status}
                  className={`flex items-center gap-1.5 cursor-pointer text-xs font-medium px-2 py-0.5 rounded-full transition-all ${
                    checked
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white text-gray-600 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setStatusFilters((prev) => ({
                        ...prev,
                        [status]: e.target.checked,
                      }))
                    }
                    className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded hidden"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleClearAllFilters}
              className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
              disabled={loading || approveLoading || rejectLoading}
            >
              <X size={12} />
              Clear
            </button>
          </div>

          <div
            className="border border-gray-300 rounded bg-gray-800 shadow w-full"
            style={{
              maxWidth: "none",
              minWidth: 300,
              padding: "0.5rem",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <div
              className="flex justify-between items-center mb-2 w-full px-2"
              style={{ flexShrink: 0 }}
            >
              <div className="flex gap-2">
                {(isUser || isAdmin) && (
                  <>
                    <button
                      onClick={handleBulkApproveClick}
                      //   disabled={
                      //     approveLoading ||
                      //     selectedRows.length === 0 ||
                      //     (isAdmin &&
                      //       !selectedRows.some(
                      //         (row) => row.Status === "PENDING"
                      //       )) ||
                      //     (isAdmin &&
                      //       selectedRows.some((row) => row.Status === "OPEN"))
                      //   }
                      disabled={
                        approveLoading ||
                        selectedRows.length === 0 ||
                        (isAdmin &&
                          !selectedRows.some(
                            (row) => row.Status === "PENDING"
                          )) ||
                        (isAdmin &&
                          selectedRows.some((row) => row.Status === "OPEN")) ||
                        (isUser && selectedRows.length === 0)
                      }
                      className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {approveLoading
                        ? "Processing..."
                        : `Approve (${getApproveRejectCount()})`}
                    </button>
                    <button
                      onClick={handleBulkRejectClick}
                      //   disabled={
                      //     rejectLoading ||
                      //     selectedRows.length === 0 ||
                      //     (isAdmin &&
                      //       !selectedRows.some(
                      //         (row) => row.Status === "PENDING"
                      //       )) ||
                      //     (isAdmin &&
                      //       selectedRows.some((row) => row.Status === "OPEN"))
                      //   }
                      disabled={
                        approveLoading ||
                        selectedRows.length === 0 ||
                        (isAdmin &&
                          !selectedRows.some(
                            (row) => row.Status === "PENDING"
                          )) ||
                        (isAdmin &&
                          selectedRows.some((row) => row.Status === "OPEN")) ||
                        (isUser && selectedRows.length === 0)
                      }
                      className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {rejectLoading
                        ? "Processing..."
                        : `Reject (${getApproveRejectCount()})`}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                width: "100%",
                flex: "1 1 auto",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                maxHeight: "calc(100vh - 200px)",
                height: "auto",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: `${minTableWidth}px`,
                  width: "100%",
                  tableLayout: "auto",
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f8fafc",
                    zIndex: 10,
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  <tr>
                    {columns.map((col) => (
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
                          userSelect: "none",
                        }}
                        onClick={() => col !== "Select" && handleSort(col)}
                      >
                        {col === "Select" && (isUser || isAdmin) ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              justifyContent: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={(e) =>
                                handleSelectAll(e.target.checked)
                              }
                              className="cursor-pointer"
                              disabled={!hasPendingRows}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "normal",
                              }}
                            >
                              All
                            </span>
                          </div>
                        ) : (
                          <span>
                            {col}
                            {getSortIcon(col)}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, rdx) => (
                      <tr
                        key={`${row.requestId || row.id || rdx}-${
                          row["Employee ID"] || ""
                        }-${rdx}`}
                        style={{
                          backgroundColor:
                            row.selected && isUser
                              ? "#dbeafe"
                              : rdx % 2 === 0
                              ? "#f9fafb"
                              : "white",
                        }}
                        onMouseEnter={(e) =>
                          !row.selected &&
                          (e.target.closest("tr").style.backgroundColor =
                            "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          !row.selected &&
                          (e.target.closest("tr").style.backgroundColor =
                            rdx % 2 === 0 ? "#f9fafb" : "white")
                        }
                      >
                        {columns.map((col) => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth:
                                col === "Select" ? "80px" : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: "center",
                              ...(col === "Status"
                                ? getStatusStyle(row[col])
                                : {}),
                            }}
                          >
                            {col === "Status" ? (
                              <span
                                style={getStatusStyle(row[col] || "PENDING")}
                              >
                                {row[col] || "PENDING"}
                              </span>
                            ) : col === "Select" && (isUser || isAdmin) ? (
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={(e) =>
                                  handleRowSelect(rdx, e.target.checked)
                                }
                                className="cursor-pointer"
                                disabled={
                                  !isRowActionable(row) ||
                                  (row["Status"] || "").toLowerCase() ===
                                    "approved"
                                }
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
                          color: "#FFF",
                        }}
                      >
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
