//  STABLE 2 ENDS

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
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

const columnsExport = [
  "Select",
  "Status",
  "Date",
  "Employee ID",
  "Name",
  "Timesheet Type Code",

  "Approver Name",
  "Fiscal Year",
  "Period",
  "Project ID",
  "PLC",
  "Pay Type",
  // "RLSE Number",
  // "PO Number",
  // "PO Line Number",
  "Hours",
  "Seq No",
  "Approve Timestamp",
  "Imported Timestamp",
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
  const [searchDate, setSearchDate] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const colWidth = 120;
  const minTableWidth = columnsExport.length * colWidth;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
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
        } else if (sortConfig.key === "Hours") {
          aVal = parseFloat(a[sortConfig.key]) || 0;
          bVal = parseFloat(b[sortConfig.key]) || 0;
        } else {
          aVal = String(a[sortConfig.key] || "").toLowerCase();
          bVal = String(b[sortConfig.key] || "").toLowerCase();
        }
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    } else {
      // Default sorting
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

  useEffect(() => {
    if (userLoaded && currentUser && currentUser.role === "Admin") {
      fetchData();
    }
  }, [userLoaded, currentUser, navigate, refreshTrigger]);

  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase() || "PENDING";
    switch (statusUpper) {
      case "APPROVED":
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
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
      const apiUrl = `${backendUrl}/api/Timesheet/pending-approvalsByStatus?status=Approved`;
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
            requestId: item.requestId || item.id,
            levelNo: item.levelNo || 1,
            originalItem: item, // <-- ADD THIS LINE to store the raw API object
            selected: false,
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
            "Fiscal Year": item.fiscalYear || "",
            Period: item.period || "",
            "Project ID": item.projectId || "",
            PLC: item.projectLaborCategory || "",
            "Pay Type": item.payType || "",
            "RLSE Number": item.rlseNumber || "",
            "PO Number": item.poNumber || "",
            "PO Line Number": item.poLineNumber || "",
            Hours: formatHours(item.hours),
            "Seq No": item.sequenceNumber || "",
            Status: "APPROVED",
            Comment: item.comment || "",
            "Approve Timestamp": item.approvedDate || "",
            "Imported Timestamp": item.importedTimestamp,
          }))
        : [];

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
      filtered = filtered.filter((row) => row["Date"] === searchDateFormatted);
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
    return getSortedRows(filtered);
  };

  const filteredRows = getFilteredRows();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
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
    const updatedRows = rows.map((row) =>
      row.id === rowId ? { ...row, selected: isSelected } : row
    );
    setRows(updatedRows);

    // Update the Set of selected IDs
    setSelectedRows((prev) => {
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
    const filteredRowIds = new Set(filteredRows.map((row) => row.id));

    // Update the visual state in the main 'rows' array
    const updatedRows = rows.map((row) => {
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
  //     const response = await fetch('${backendUrl}/api/Timesheet/export-to-csv', {
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
  //     const response = await fetch('${backendUrl}/api/Timesheet/export-csv', {
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

    if (selectedRows.size === 0) {
      // Check size of the Set
      showToast("Please select at least one timesheet to export", "warning");
      return;
    }

    try {
      setActionLoading(true);

      // Get selected row data by filtering the main 'rows' array using the IDs in the Set
      const selectedData = rows.filter((row) => selectedRows.has(row.id));

      if (selectedData.length === 0) {
        // This check might be redundant if selectedRows.size > 0, but good for safety
        showToast("No selected data found to export", "warning");
        return;
      }

      // Prepare payload - Sending ONLY the original items as per your code structure
      const payloadToSend = selectedData.map((row) => row.originalItem); // Send original API data stored earlier

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
      const response = await fetch(`${backendUrl}/api/Timesheet/export-csv`, {
        // Note: Endpoint changed slightly in your example
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToSend), // Sending the array of original items
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        // Check if API returned CSV data directly
        if (contentType && contentType.includes("text/csv")) {
          const csvData = await response.text();
          const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `exported_selected_timesheets_${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          setRefreshTrigger((t) => t + 1);
          setSelectedRows(new Set());
          setSelectAll(false);
          showToast(
            `Exported ${selectedData.length} selected timesheets successfully`,
            "success"
          );
        } else {
          // Fallback: Generate CSV locally from the selected (formatted) data
          // This part uses the formatted data shown in the table, not necessarily the originalItem
          console.warn(
            "API did not return CSV, generating fallback CSV locally."
          );
          const csvHeaders = columnsExport
            .filter((col) => col !== "Select")
            .join(","); // Exclude 'Select' column header
          const csvRows = selectedData.map((row) =>
            columnsExport
              .filter((col) => col !== "Select") // Exclude 'Select' column data
              .map((col) => {
                const value = row[col] || "";
                // Basic CSV escaping: double quotes for values containing comma, newline, or double quote
                const escaped = String(value).replace(/"/g, '""');
                return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
              })
              .join(",")
          );
          const csvContent = [csvHeaders, ...csvRows].join("\n");
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `exported_selected_timesheets_fallback_${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          showToast(
            `Exported ${selectedData.length} selected timesheets successfully (local fallback)`,
            "success"
          );
        }
      } else {
        const errorText = await response.text();
        console.error("Export API Error:", errorText);
        showToast(
          `Export API failed: ${errorText || response.statusText}`,
          "error"
        );
        // throw new Error(`Export API failed with status: ${response.status}`); // Optionally throw
      }
    } catch (error) {
      console.error("Export error:", error);
      showToast("Export failed. Please try again.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearAllFilters = () => {
    setSearchDate("");
    setSearchEmployeeId("");
    setSearchEmployeeName("");
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
              <h1 className="text-xl font-semibold text-white">
                Welcome,{" "}
                <span className="font-bold text-blue-600">
                  {currentUser?.name}
                </span>
              </h1>
            </div>

            {/* Center: Logo (1/3 width) */}
            <div className="w-1/3 flex justify-center">
              {/* This is the background for your white logo. Use the one you picked (e.g., bg-slate-800) */}
              <div className="bg-slate-800 rounded-md p-2 shadow-inner">
                <img
                  src="/Columbus_Logo.png" /* <-- MAKE SURE TO USE YOUR LOGO PATH */
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
          <div className="w-full bg-gray-800 p-4 rounded-lg shadow border border-gray-200 mb-4 flex flex-wrap items-center justify-between gap-4">
            {/* Left side: Search Inputs */}
            <div className="flex flex-wrap items-center gap-3">
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
              flexDirection: "column",
            }}
          >
            <div
              className="flex justify-end items-center mb-2 w-full px-2"
              style={{ flexShrink: 0 }}
            >
              <button
                onClick={handleExportClick}
                disabled={actionLoading || selectedRows.length === 0}
                className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* {actionLoading ? "Exporting..." : `Export Selected (${selectedRows.length})`} */}
                {actionLoading
                  ? "Exporting..."
                  : `Export Selected (${selectedRows.size})`}
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
                borderRadius: "4px",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: `${minTableWidth}px`, // Ensure it expands if needed
                  width: "100%", // Make table try to fit container
                  tableLayout: "auto", // Allow browser to determine column widths initially
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
                    {columnsExport.map((col) => (
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
                        {col === "Select" ? (
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
                            />
                            <span
                              style={{ fontSize: "11px", fontWeight: "normal" }}
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
                        key={`${row.id || rdx}-${
                          row["Employee ID"] || ""
                        }-${rdx}`}
                        style={{
                          backgroundColor: row.selected
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
                        {columnsExport.map((col) => (
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
                              <span style={getStatusStyle(row[col])}>
                                {row[col]}
                              </span>
                            ) : col === "Select" ? (
                              <input
                                type="checkbox"
                                checked={row.selected || false}
                                onChange={(e) =>
                                  handleRowSelect(rdx, e.target.checked)
                                }
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
                          color: "#FFF",
                        }}
                      >
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
