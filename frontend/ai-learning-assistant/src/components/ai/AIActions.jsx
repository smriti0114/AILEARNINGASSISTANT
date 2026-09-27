import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Sparkles, BookOpen, Lightbulb } from "lucide-react";
import aiService from "../../services/aiService";
import toast from "react-hot-toast";
import MarkdownRenderer from "../common/MarkdownRenderer";
import Modal from "../common/Modal";

const AIActions = () => {
  const { id: documentId } = useParams();
  const [loadingAction, setLoadingAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [concept, setConcept] = useState("");

  const handleGenerateSummary = async () => {
    setLoadingAction("summary");
    try {
      const { summary } = await aiService.generateSummary(documentId);
      setModalTitle("Generated Summary");
      setModalContent(summary);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to generate summary.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleExplainConcept = async (e) => {
    e.preventDefault();
    if (!concept.trim()) {
      toast.error("Please enter a concept to explain.");
      return;
    }
    setLoadingAction("explain");
    try {
      const { explanation } = await aiService.explainConcept(
        documentId,
        concept,
      );
      setModalTitle(`Explanation of "${concept}"`);
      setModalContent(explanation);
      setIsModalOpen(true);
      setConcept("");
    } catch (error) {
      toast.error("Failed to explain concept.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <>
      <div className="bg-surface/80 backdrop-blur-xl border border-border-subtle/60 rounded-2xl shadow-xl shadow-border-subtle/50 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-subtle/60 bg-page/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent shadow-sm shadow-accent/25 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-surface" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">
                AI Assistant
              </h3>
              <p className="text-xs text-muted">Powered by advanced AI</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Generate Summary */}
          <div className="group p-5 bg-page/50 rounded-xl border border-border-subtle/60 hover:border-border-subtle/60 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
                    <BookOpen
                      className="w-4 h-4 text-blue-600"
                      strokeWidth={2}
                    />
                  </div>
                  <h4 className="font-semibold text-navy">
                    Generate Summary
                  </h4>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Get a concise summary of the entire document.
                </p>
              </div>
              <button
                onClick={handleGenerateSummary}
                disabled={loadingAction === "summary"}
                className="shrink-0 h-10 px-5 bg-accent hover:bg-accent-hover text-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
              >
                {loadingAction === "summary" ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Summarize"
                )}
              </button>
            </div>
          </div>

          {/* Explain Concept */}
          <div className="group p-5 bg-page/50 rounded-xl border border-border-subtle/60 hover:border-border-subtle/60 hover:shadow-md transition-all duration-200">
            <form onSubmit={handleExplainConcept}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
                  <Lightbulb
                    className="w-4 h-4 text-amber-600"
                    strokeWidth={2}
                  />
                </div>
                <h4 className="font-semibold text-navy">
                  Explain a Concept
                </h4>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Enter a topic or concept from the document to get a detailed
                explanation.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="e.g., 'React Hooks'"
                  className="flex-1 h-11 px-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy placeholder-muted text-sm font-medium transition-all duration-200 focus:outline-none focus:border-accent focus:bg-surface focus:shadow-lg focus:shadow-purple-500/10 "
                  disabled={loadingAction === "explain"}
                />
                <button
                  type="submit"
                  disabled={loadingAction === "explain" || !concept.trim()}
                  className="shrink-0 h-11 px-5 bg-accent hover:bg-accent-hover text-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {loadingAction === "explain" ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Explain"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Result Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <div className="max-h-[60vh] overflow-y-auto prose prose-sm max-w-none prose-slate">
          <MarkdownRenderer content={modalContent} />
        </div>
      </Modal>
    </>
  );
};

export default AIActions;
