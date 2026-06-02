import React, { useState } from 'react';
import { FileText, UploadCloud, Calendar, Eye, Trash2, ShieldCheck, Search } from 'lucide-react';

function Wellness() {
  const [reports, setReports] = useState([
    { id: 1, name: "Blood_Panel_March2026.pdf", type: "Lab Report", date: "2026-03-12", size: "2.4 MB" },
    { id: 2, name: "Cardio_Echocardiogram.pdf", type: "Cardiology", date: "2026-01-18", size: "4.1 MB" },
    { id: 3, name: "Prescription_Dr_Sharma.png", type: "Prescription", date: "2026-05-02", size: "850 KB" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 text-[#1e3a8a]">
      {/* Header Info */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-[rgb(65,65,227)]" /> Stored Health Records & Reports
        </h1>
        <p className="text-sm text-[#0369a1] font-medium mt-1">
          Securely upload, view, and organize your clinical records, lab diagnostics, and physician prescriptions.
        </p>
      </div>

      {/* Upload Zone Panel */}
      <div className="border-2 border-dashed border-[#bae6fd] hover:border-[rgb(65,65,227)] bg-white rounded-2xl p-8 text-center transition duration-200 cursor-pointer group shadow-sm">
        <input type="file" id="report-upload" className="hidden" />
        <label htmlFor="report-upload" className="cursor-pointer flex flex-col items-center">
          <div className="p-4 bg-[#f0f9ff] border border-[#bae6fd] rounded-xl mb-4 group-hover:scale-105 transition duration-150 shadow-sm text-[rgb(65,65,227)]">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-[#0f172a]">Drag & drop your medical documents here</h3>
          <p className="text-xs text-[#0284c7] font-medium mt-1">Accepts PDF, PNG, JPG up to 10MB per file</p>
          <span className="mt-4 text-xs font-bold text-white bg-[rgb(65,65,227)] hover:bg-[rgb(50,50,200)] px-5 py-2 rounded-xl transition shadow-md">
            Browse Files
          </span>
        </label>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#bae6fd] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#0284c7] absolute left-3 top-3" />
          <input 
            type="text" 
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f0f9ff]/60 border border-[#bae6fd] rounded-xl text-xs font-bold text-[#0f172a] placeholder-[#0284c7] focus:outline-none focus:border-[rgb(65,65,227)] focus:bg-white transition"
          />
        </div>
        <div className="text-xs text-[#0369a1] font-bold font-mono bg-[#f0f9ff] px-3 py-1.5 rounded-lg border border-[#bae6fd]">
          Vault Status: <span className="text-[rgb(65,65,227)] font-extrabold">7.35 MB Used</span>
        </div>
      </div>

      {/* Reports Listing Table */}
      <div className="bg-white border border-[#bae6fd] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#bae6fd] bg-[#f0f9ff]/40">
          <h2 className="text-sm font-extrabold text-[#0f172a]">Document Inventory</h2>
        </div>
        
        {filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#bae6fd] bg-[#f0f9ff]/20 text-[11px] font-bold text-[#0284c7] tracking-wider uppercase">
                  <th className="p-4 pl-6">Document Title</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Date Added</th>
                  <th className="p-4">Size</th>
                  <th className="p-4 text-right pr-6">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f9ff] text-sm font-semibold text-[#0f172a]">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-[#f0f9ff]/40 transition">
                    <td className="p-4 pl-6 flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[rgb(65,65,227)] shrink-0" />
                      <span className="truncate max-w-xs font-bold">{report.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-[#f0f9ff] border border-[#bae6fd] text-[#0284c7] px-2.5 py-0.5 rounded-md font-bold">
                        {report.type}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-[#0369a1]">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                        {report.date}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-[#0284c7] font-bold">{report.size}</td>
                    <td className="p-4 text-right pr-6 space-x-1">
                      <button className="p-2 text-[#0284c7] hover:text-[rgb(65,65,227)] hover:bg-[#f0f9ff] rounded-lg transition cursor-pointer" title="View Document">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#0284c7] hover:text-[rgb(65,65,227)] hover:bg-[#f0f9ff] rounded-lg transition cursor-pointer" title="Delete Document">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-[#0284c7] font-bold text-sm">
            No health records matched your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Wellness;