import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { sendCVToN8n } from '../services/n8nService';

function CVAnalyserPage() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (f) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(f.type)) {
      setError('Only PDF and image files (PNG, JPG) are supported.');
      return;
    }
    setError(null);
    setResult(null);
    setFile(f);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await sendCVToN8n(file);
      setResult(data);
    } catch (err) {
      setError('Failed to process CV. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-600/10'
            : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload size={40} className={`mx-auto mb-4 ${isDragging ? 'text-blue-400' : 'text-slate-500'}`} />
        <p className="text-slate-300 text-sm font-medium">
          {isDragging ? 'Drop your CV here' : 'Drag & drop a CV or click to browse'}
        </p>
        <p className="text-slate-500 text-xs mt-2">Supports PDF, PNG, JPG</p>
      </div>

      {/* Selected File */}
      {file && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <FileText size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-200 font-medium">{file.name}</p>
              <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemoveFile}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Process Button */}
      <button
        onClick={handleProcess}
        disabled={!file || isLoading}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          file && !isLoading
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Processing CV...
          </>
        ) : (
          <>
            <CheckCircle2 size={16} />
            Process CV
          </>
        )}
      </button>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Analysis Results</h3>

          {/* Name Card */}
          {(result.name || result.Name) && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Name</p>
              <p className="text-lg text-slate-100 font-semibold">{result.name || result.Name}</p>
            </div>
          )}

          {/* Skills Card */}
          {(result.skills || result.Skills) && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(result.skills || result.Skills)
                  ? result.skills || result.Skills
                  : (result.skills || result.Skills).split(',').map(s => s.trim())
                ).map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-600/20 text-blue-300 text-xs font-medium rounded-lg border border-blue-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Card */}
          {(result.experience || result.Experience) && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experience</p>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {result.experience || result.Experience}
              </p>
            </div>
          )}

          {/* Raw Response Fallback */}
          {!result.name && !result.Name && !result.skills && !result.Skills && !result.experience && !result.Experience && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Raw Response</p>
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CVAnalyserPage;
