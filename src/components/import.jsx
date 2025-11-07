import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Save, LogOut } from "lucide-react";
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

const Import = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const fileInputRef = useRef(null);
  // Existing states and logic (not changed)...
  const [loading, setLoading] = useState(false);
  // New states for email redirect config
  const [allowEmailRedirect, setAllowEmailRedirect] = useState(false);
  const [redirectEmailTo, setRedirectEmailTo] = useState("");
  // Store both value and id for each config to pass id on save
  const [allowEmailRedirectId, setAllowEmailRedirectId] = useState(0);
  const [importLoading, setImportLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [redirectEmailToId, setRedirectEmailToId] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [selectedUserFile, setSelectedUserFile] = useState(null);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    // alert("Logged out successfully");
    navigate("/");
  };

  function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  //   const handleImportFile = (e) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       setSelectedFile(file);
  //     }
  //   };

  const handleUserFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedUserFile(file);
    }
  };

  const handleUserClick = async (e) => {
    e.preventDefault();

    if (!selectedUserFile) {
      showToast("No file selected", "error");
      return;
    }

    if (!selectedUserFile.name.toLowerCase().endsWith(".csv")) {
      showToast("Please select a CSV file", "error");
      return;
    }

    setUserLoading(true);

    try {
      // Step 1: Fetch pre-signed URL dynamically from your backend API
      const presignResp = await fetch(
        `${backendUrl}/api/Timesheet/GetPresignedUrl/${encodeURIComponent(
          selectedUserFile.name
        )}`
      );

      if (!presignResp.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const presignedUrl = await presignResp.text();

      // Step 2: Upload file to S3 pre-signed URL using PUT
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedUserFile.type || "text/csv",
        },
        body: selectedUserFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload to S3 failed: " + uploadResponse.statusText);
      }

      // Step 3: Optionally refresh your data here
      setLoading(true);
      try {
        const refreshedResp = await fetch(
          `${backendUrl}/api/Timesheet/import-employees-csv-s3?filename=${encodeURIComponent(
            selectedUserFile.name
          )}&Username=${encodeURIComponent(currentUser?.name || "")}`,
          {
            method: "POST",
          }
        );
        // if (refreshedResp.ok) {
        //   const refreshedData = await refreshedResp.json();
        //   setRows(refreshedData);
        // }
        if (!refreshedResp.ok) {
          throw new Error(
            "Import API call failed: " + refreshedResp.statusText
          );
        }

        const contentType = refreshedResp.headers.get("content-type") || "";
        if (
          contentType.includes("text/csv") ||
          contentType.includes("text/plain")
        ) {
          const csvText = await refreshedResp.text();
          const filename = `imported_${selectedUserFile.name.replace(
            ".csv",
            ""
          )}_${Date.now()}.csv`;
          downloadCSV(csvText, filename);
          showToast("Import skipped ", "error");
        } else {
          // Optionally handle JSON or other responses here
          showToast("import successful", "success");
        }
        // showToast("Upload successful", "success");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      showToast("Upload failed", "error");
    } finally {
      setUserLoading(false);
      setSelectedUserFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  //   const handleImportClick = async (e) => {
  //     e.preventDefault();
  //     if (!selectedFile) {
  //       showToast("No file selected", "error");
  //       return;
  //     }
  //     if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
  //       showToast("Please select a CSV file", "error");
  //       return;
  //     }
  //     const formData = new FormData();
  //     formData.append("file", selectedFile); // Use state here!
  //     try {
  //       setImportLoading(true);
  //       const importResponse = await fetch(
  //         `${backendUrl}/api/Timesheet/import-projects-csv?Username=${encodeURIComponent(
  //           currentUser?.name
  //         )}`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  //       if (importResponse.ok) {
  //         showToast("Import completed successfully", "success");
  //         // Optionally refresh table
  //         setLoading(true);
  //         try {
  //           const refreshedResp = await fetch(
  //             `${backendUrl}/api/Timesheet/list`,
  //             {
  //               method: "GET",
  //               headers: { "Content-Type": "application/json" },
  //             }
  //           );
  //           if (refreshedResp.ok) {
  //             const refreshedData = await refreshedResp.json();
  //             setRows(refreshedData);
  //           }
  //         } finally {
  //           setLoading(false);
  //         }
  //       } else {
  //         showToast("Import failed", "error");
  //       }
  //     } catch (error) {
  //       showToast("Import error", "error");
  //       console.error(error);
  //     } finally {
  //       setImportLoading(false);
  //       setSelectedFile(null);
  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = "";
  //       }
  //     }
  //   };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   const handleImportClick = async (e) => {
  //     e.preventDefault();

  //     if (!selectedFile) {
  //       showToast("No file selected", "error");
  //       return;
  //     }

  //     if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
  //       showToast("Please select a CSV file", "error");
  //       return;
  //     }

  //     setImportLoading(true);
  //     setStatus("Reading file...");

  //     try {
  //       const text = await selectedFile.text();

  //       const lines = text.split(/\r?\n/);
  //       const header = lines[0];
  //       const rows = lines.slice(1);

  //       // Adjust linesPerChunk for chunk size (~20KB)
  //       const linesPerChunk = 50;
  //       const totalChunks = Math.ceil(rows.length / linesPerChunk);
  //       console.log(totalChunks);

  //       setStatus(`Splitting into ${totalChunks} smaller files...`);

  //       for (let i = 0; i < totalChunks; i++) {
  //         const chunkLines = rows.slice(
  //           i * linesPerChunk,
  //           (i + 1) * linesPerChunk
  //         );
  //         const csvChunk = [header, ...chunkLines].join("\n");

  //         const chunkBlob = new Blob([csvChunk], { type: "text/csv" });
  //         const chunkFile = new File(
  //           [chunkBlob],
  //           `${selectedFile.name.replace(".csv", "")}_part${i + 1}.csv`,
  //           { type: "text/csv" }
  //         );

  //         const formData = new FormData();
  //         formData.append("file", chunkFile);

  //         setStatus(`Uploading part ${i + 1} of ${totalChunks}...`);

  //         const res = await fetch(
  //           `${backendUrl}/api/Timesheet/import-projects-csv?Username=${encodeURIComponent(
  //             currentUser?.name || ""
  //           )}`,
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         );

  //         if (!res.ok) {
  //           throw new Error(
  //             `Upload failed for part ${i + 1}: ${res.status} ${res.statusText}`
  //           );
  //         }

  //         await res.json().catch(() => ({})); // ignore JSON parse errors

  //         // setProgress(Math.round(((i + 1) / totalChunks) * 100));
  //         await delay(1000);
  //       }

  //       setStatus("✅ All chunks uploaded successfully!");
  //       showToast("Import completed successfully", "success");
  //     } catch (error) {
  //       showToast("Import failed", "error");
  //       setStatus(`Error: ${error.message}`);
  //       console.error(error);
  //     } finally {
  //       setImportLoading(false);
  //       setSelectedFile(null);
  //       if (fileInputRef.current) fileInputRef.current.value = "";
  //       setProgress(0);
  //     }
  //   };

  //   const handleImportClick = async (e) => {
  //     e.preventDefault();

  //     if (!selectedFile) {
  //       showToast("No file selected", "error");
  //       return;
  //     }

  //     if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
  //       showToast("Please select a CSV file", "error");
  //       return;
  //     }

  //     setImportLoading(true);

  //     try {
  //       // Replace this with your actual pre-signed URL (example in your query)
  //       const presignedUrl =
  //         "https://vithobamasterdata.s3.ap-southeast-2.amazonaws.com/sample.csv?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWFHFOYQSBW35SLPV%2F20251106%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20251106T215405Z&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=b757e986eec2abee2178c58123bfde79a471bfe52b462e608c2d1d23a9c5dd64";

  //       // Upload file using PUT method to pre-signed URL
  //       const uploadResponse = await fetch(presignedUrl, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": selectedFile.type || "text/csv", // use file type or default
  //         },
  //         body: selectedFile,
  //       });

  //       if (!uploadResponse.ok) {
  //         throw new Error("Upload to S3 failed: " + uploadResponse.statusText);
  //       }

  //       showToast("Upload successful", "success");

  //       // Optionally refresh your data here if needed
  //       setLoading(true);
  //       try {
  //         const refreshedResp = await fetch(`${backendUrl}/api/Timesheet/list`, {
  //           method: "GET",
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         if (refreshedResp.ok) {
  //           const refreshedData = await refreshedResp.json();
  //           setRows(refreshedData);
  //         }
  //       } finally {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       showToast("Upload failed", "error");
  //     } finally {
  //       setImportLoading(false);
  //       setSelectedFile(null);
  //       if (fileInputRef.current) fileInputRef.current.value = "";
  //     }
  //   };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImportClick = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      showToast("No file selected", "error");
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      showToast("Please select a CSV file", "error");
      return;
    }

    setImportLoading(true);

    try {
      // Step 1: Fetch pre-signed URL dynamically from your backend API
      const presignResp = await fetch(
        `${backendUrl}/api/Timesheet/GetPresignedUrl/${encodeURIComponent(
          selectedFile.name
        )}`
      );

      if (!presignResp.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const presignedUrl = await presignResp.text();

      // Step 2: Upload file to S3 pre-signed URL using PUT
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type || "text/csv",
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload to S3 failed: " + uploadResponse.statusText);
      }

      // Step 3: Optionally refresh your data here
      setLoading(true);
      try {
        const refreshedResp = await fetch(
          `${backendUrl}/api/Timesheet/import-projects-csv-s3?filename=${encodeURIComponent(
            selectedFile.name
          )}&Username=${encodeURIComponent(currentUser?.name || "")}`,
          {
            method: "POST",
          }
        );
        // if (refreshedResp.ok) {
        //   const refreshedData = await refreshedResp.json();
        //   setRows(refreshedData);
        // }
        if (!refreshedResp.ok) {
          throw new Error(
            "Import API call failed: " + refreshedResp.statusText
          );
        }

        const contentType = refreshedResp.headers.get("content-type") || "";
        if (
          contentType.includes("text/csv") ||
          contentType.includes("text/plain")
        ) {
          const csvText = await refreshedResp.text();
          const filename = `imported_${selectedFile.name.replace(
            ".csv",
            ""
          )}_${Date.now()}.csv`;
          downloadCSV(csvText, filename);
          showToast("Import skipped ", "error");
        } else {
          // Optionally handle JSON or other responses here
          showToast("import successful", "success");
        }
        // showToast("Upload successful", "success");
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      showToast("Upload failed", "error");
    } finally {
      setImportLoading(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!userLoaded || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
      <div className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full flex flex-col items-center">
          {/* Header (existing, unchanged) */}
          <div className="w-full flex justify-between items-center mb-4 px-4 py-3 bg-gray-800 border-b border-gray-200 shadow-sm rounded-t-lg">
            <div className="w-1/3">
              <h1 className="text-xl font-semibold text-white">
                Welcome,{" "}
                <span className="font-bold text-blue-600">
                  {currentUser?.name}
                </span>
              </h1>
            </div>
            <div className="w-1/3 flex justify-center">
              <div className="bg-slate-800 rounded-md p-2 shadow-inner">
                <img src="/Columbus_Logo.png" alt="Logo" className="h-10" />
              </div>
            </div>
            <div className="w-1/3 flex justify-end">
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-red-200 transition-colors shadow-sm"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>

          {/* Import Button: Now floated top-right in its own row */}
          <div className="w-full flex flex-col items-start gap-2 mt-4 px-2">
            <h2 className="font-semibold text-md">Import Master File</h2>
            <input
              ref={fileInputRef}
              type="file"
              className="border rounded px-1 py-1 text-gray-800"
              onChange={handleImportFile}
              accept=".csv"
              disabled={importLoading}
              //   style={{ minWidth: "220px" }}
            />
            <button
              onClick={handleImportClick}
              type="button"
              disabled={importLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-1 py-1 rounded shadow font-semibold transition-colors text-md disabled:opacity-60 disabled:cursor-not-allowed"
              //   style={{ minWidth: "200px" }}
            >
              {importLoading ? "Processing..." : "Upload"}
            </button>
          </div>
          <div className="w-full flex flex-col items-start gap-2 mt-4 px-2">
            <h2 className="font-semibold text-md">Import Employee File</h2>
            <input
              ref={fileInputRef}
              type="file"
              className="border rounded px-1 py-1 text-gray-800"
              onChange={handleUserFile}
              accept=".csv"
              disabled={userLoading}
              //   style={{ minWidth: "220px" }}
            />
            <button
              onClick={handleUserClick}
              type="button"
              disabled={userLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-1 py-1 rounded shadow font-semibold transition-colors text-md disabled:opacity-60 disabled:cursor-not-allowed"
              //   style={{ minWidth: "200px" }}
            >
              {userLoading ? "Processing..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;
