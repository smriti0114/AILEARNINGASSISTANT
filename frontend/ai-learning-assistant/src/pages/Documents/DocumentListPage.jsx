import React, { useState, useEffect } from "react";
import { Plus, Upload, Trash2, FileText, X } from "lucide-react";
import toast from "react-hot-toast";

import documentService from "../../services/documentService";
import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import DocumentCard from "../../components/documents/DocumentCard";

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for upload modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to fetch documents.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("Please provide a title and select a file.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);

    try {
      await documentService.uploadDocument(formData);
      toast.success("Document uploaded successfully!");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocuments();
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRequest = (doc) => {
    setSelectedDoc(doc);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDoc) return;
    setDeleting(true);
    try {
      await documentService.deleteDocument(selectedDoc._id);
      toast.success(`'${selectedDoc.title}' deleted.`);
      setIsDeleteModalOpen(false);
      setSelectedDoc(null);
      setDocuments(documents.filter((d) => d._id !== selectedDoc._id));
    } catch (error) {
      toast.error(error.message || "Failed to delete document.");
    } finally {
      setDeleting(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner />
        </div>
      );
    }

    if (documents.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-page shadow-lg shadow-border-subtle/50 mb-6">
              <FileText
                className="w-10 h-10 text-muted"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-xl font-medium text-navy tracking-tight mb-2">
              No Documents Yet
            </h3>
            <p className="text-sm text-muted mb-6">
              Get started by uploading your first PDF document to begin
              learning.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl;grid-cols-4 gap-5">
        {documents?.map((doc) => (
          <DocumentCard
            key={doc._id}
            document={doc}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Subtle background pattern */}

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-medium text-navy tracking-tight mb-2">
              My Documents
            </h1>
            <p className="text-muted text-sm">
              Manage and organize your learning materials
            </p>
          </div>
          {documents.length > 0 && (
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Upload Document
            </Button>
          )}
        </div>

        {renderContent()}
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-surface/95 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-2xl shadow-navy/20 p-8">
            {/* Close button */}
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-muted hover:bg-page transition-all duration-200"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-navy tracking-tight">
                Upload New Document
              </h2>
              <p className="text-sm text-muted mt-1">
                Add a PDF document to your library
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUpload} className="sapce-y-5">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-body uppercase tracking-wide">
                  Document Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                  className="w-full h-12 px-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy placeholder-muted text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-surface focus:shadow-lg focus:shadow-primary/10"
                  placeholder="e.g., React Interview Prep"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-body uppercase tracking-wide">
                  PDF File
                </label>
                <div className="relative border-2 border-dashed border-border-subtle rounded-xl bg-page/50 hover:border-primary hover:bg-primary-subtle/30 transition-all duration-200">
                  <input
                    id="file-upload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    accept=".pdf"
                  />
                  <div className="flex flex-col items-center justify-center py-10 px-6">
                    <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                      <Upload
                        className="w-7 h-7 text-primary-hover"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-sm font-medium text-body mb-1">
                      {uploadFile ? (
                        <span className="text-primary-hover">
                          {uploadFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-primary-hover">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted">PDF upto 10MB</p>
                  </div>
                </div>
              </div>

              {/*Action button*/}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={uploading}
                  className="flex-1 h-11 px-4 border-2 border-border-subtle rounded-xl bg-surface text-body text-sm font-semibold hover:bg-page hover:border-border-subtle transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 h-11 px-4 bg-primary hover:bg-primary-hover text-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                      Uploading...
                    </span>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-surface/95 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-2xl shadow-navy/20 p-8">
          {/* Close button */}
          <button onClick={() => setIsDeleteModalOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-muted hover:bg-page transition-all duration-200">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-medium text-navy tracking-tight">Confirm Deletion</h2>
          </div>

          {/* Content */}
          <p className="text-sm text-muted mb-6">
            Are you sure you want to delete the document:{" "}
            <span className="font-semibold text-navy">{selectedDoc?.title}</span>? This action cannot
            be undone.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleting}
              className="flex-1 h-11 px-4 border-2 border-border-subtle rounded-xl bg-surface text-body text-sm font-semibold hover:bg-page hover:border-border-subtle transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="flex-1 h-11 px-4 bg-red-500 hover:bg-red-600 text-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {deleting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default DocumentListPage;
