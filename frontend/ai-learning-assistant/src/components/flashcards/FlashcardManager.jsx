import React, { useState, useEffect } from "react";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ArrowLeft,
  Sparkles,
  Brain,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import flashcardService from "../../services/flashcardService";
import aiService from "../../services/aiService";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import Flashcard from "./Flashcard";

const FlashcardManager = ({ documentId }) => {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [setToDelete, setSetToDelete] = useState(null);

  const fetchFlashcardSets = async () => {
    setLoading(true);
    try {
      const response = documentId 
        ? await flashcardService.getFlashcardsForDocument(documentId)
        : await flashcardService.getAllFlashcardSets();
      setFlashcardSets(response.data);
    } catch (error) {
      toast.error("Failed to fetch flashcard sets.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcardSets();
  }, [documentId]);

  const handleGenerateFlashcards = async () => {
    if (!documentId) {
      navigate("/documents");
      return;
    }
    setGenerating(true);
    try {
      await aiService.generateFlashcards(documentId);
      toast.success("Flashcards generated successfully!");
      fetchFlashcardSets();
    } catch (error) {
      toast.error(error.message || "Failed to generate flashcards.");
    } finally {
      setGenerating(false);
    }
  };

  const handleNextCard = () => {
    if (selectedSet) {
      handleReview(currentCardIndex);
      setCurrentCardIndex(
        (prevIndex) => (prevIndex + 1) % selectedSet.cards.length,
      );
    }
  };

  const handlePrevCard = () => {
    if (selectedSet) {
      handleReview(currentCardIndex);
      setCurrentCardIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedSet.cards.length) % selectedSet.cards.length,
      );
    }
  };

  const handleReview = async (index) => {
    const currentCard = selectedSet?.cards[currentCardIndex];
    if (!currentCard) return;

    try {
      await flashcardService.reviewFlashcard(currentCard._id, index);
      toast.success("Flashcard reviewed!");
    } catch (error) {
      toast.error("Failed to review flashcard.");
    }
  };

  const handleToggleStar = async (cardId) => {
    try {
      await flashcardService.toggleStar(cardId);
      const updatedSets = flashcardSets.map((set) => {
        if (set._id === selectedSet._id) {
          const updatedCards = set.cards.map((card) =>
            card._id === cardId
              ? { ...card, isStarred: !card.isStarred }
              : card,
          );
          return { ...set, cards: updatedCards };
        }
        return set;
      });
      setFlashcardSets(updatedSets);
      setSelectedSet(updatedSets.find((set) => set._id === selectedSet._id));
      toast.success("Flashcard starred status updated!");
    } catch (error) {
      toast.error("Failed to update star status.");
    }
  };

  const handleDeleteRequest = (e, set) => {
    e.stopPropagation();
    setSetToDelete(set);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!setToDelete) return;
    setDeleting(true);
    try {
      await flashcardService.deleteFlashcardSet(setToDelete._id);
      toast.success("Flashcard set deleted successfully!");
      setIsDeleteModalOpen(false);
      setSetToDelete(null);
      fetchFlashcardSets();
    } catch (error) {
      toast.error(error.message || "Failed to delete flashcard set.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSelectSet = (set) => {
    setSelectedSet(set);
    setCurrentCardIndex(0);
  };

  const renderFlashcardViewer = () => {
    const currentCard = selectedSet.cards[currentCardIndex];

    return (
      <div className="space-y-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedSet(null)}
          className="group inline-flex items-center gap-2 test-sm font-medium text-muted hover:text-primary-hover transition-colors duartion-200"
        >
          <ArrowLeft
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
            strokeWidth={2}
          />
          Back to Sets
        </button>

        {/* Flashcard Display */}
        <div className="flex flex-col items-center sapce-y-8">
          <div className="w-full max-w-2xl">
            <Flashcard
              flashcard={currentCard}
              onToggleStar={handleToggleStar}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevCard}
              disabled={selectedSet.cards.length <= 1}
              className="group flex items-center gap-2 px-5 h-11 bg-page hover:bg-border-subtle text-body font-medium text-sm rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-page"
            >
              <ChevronLeft
                className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
                strokeWidth={2.5}
              />
              Previous
            </button>

            <div className="px-4 py-2 bg-page rounded-lg border border-border-subtle">
              <span className="text-sm font-semibold text-body">
                {currentCardIndex + 1}{" "}
                <span className="text-muted font-normal">/</span>{" "}
                {selectedSet.cards.length}
              </span>
            </div>

            <button
              onClick={handleNextCard}
              disabled={selectedSet.cards.length <= 1}
              className="group flex items-center gap-2 px-5 h-11 bg-page hover:bg-border-subtle text-body font-medium text-sm rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-page"
            >
              Next
              <ChevronRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSetList = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      );
    }

    if (flashcardSets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-6">
            <Brain className="w-8 h-8 text-primary-hover" strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-navy mb-2">
            No Flashcards Yet
          </h3>
          <p className="text-sm text-muted mb-8 text-center max-w-sm">
            Generate flashcards from your document to start learning and
            reinforce your knowledge.
          </p>
          <button
            onClick={handleGenerateFlashcards}
            disabled={generating}
            className="group inline-flex items-center gap-2 px-6 h-12 bg-accent hover:bg-accent-hover text-surface font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" strokeWidth={2} />
                {documentId ? "Generate Flashcards" : "Go to Documents"}
              </>
            )}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header with Generate Button */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-navy">
              Your Flashcard Sets
            </h3>
            <p className="text-sm text-muted mt-1">
              {flashcardSets.length}{" "}
              {flashcardSets.length === 1 ? "set" : "sets"} available
            </p>
          </div>
          <button
            onClick={handleGenerateFlashcards}
            disabled={generating}
            className="group inline-flex items-center gap-2 px-5 h-11 bg-accent hover:bg-accent-hover text-surface font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-accent/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                {documentId ? "Generate New Set" : "Generate from Documents"}
              </>
            )}
          </button>
        </div>

        {/* Flashcard Sets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSets.map((set) => {
            const totalCards = set.cards?.length || 0;
            const reviewedCards = set.cards?.filter(c => c.reviewCount > 0 || c.lastReviewed).length || 0;
            const percent = totalCards > 0 ? Math.round((reviewedCards / totalCards) * 100) : 0;
            const docTitle = set.documentId?.title || "Flashcard Set";
            
            return (
              <div
                key={set._id}
                onClick={() => handleSelectSet(set)}
                className="group relative bg-surface border border-border-subtle hover:border-emerald-300 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col"
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteRequest(e, set)}
                  className="absolute top-4 right-4 p-2 text-muted hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2} />
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light shrink-0">
                    <BookOpen className="w-6 h-6 text-primary-dark" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-navy mb-0.5 line-clamp-1" title={docTitle}>
                      {docTitle}
                    </h4>
                    <p className="text-xs font-medium text-muted uppercase tracking-wide">
                      CREATED {moment(set.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="px-3 py-1.5 border border-border-subtle rounded-lg bg-surface">
                    <span className="text-sm font-medium text-body">
                      {totalCards} {totalCards === 1 ? "Card" : "Cards"}
                    </span>
                  </div>
                  <div className="px-3 py-1.5 bg-primary-light/60 rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-primary-hover" />
                    <span className="text-sm font-semibold text-primary-dark">
                      {percent}%
                    </span>
                  </div>
                </div>

                <div className="mb-6 mt-auto">
                  <div className="flex items-center justify-between text-xs font-medium mb-2">
                    <span className="text-muted">Progress</span>
                    <span className="text-body">{reviewedCards}/{totalCards} reviewed</span>
                  </div>
                  <div className="h-2 w-full bg-page rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <button 
                  className="w-full flex items-center justify-center gap-2 h-11 bg-primary-subtle hover:bg-primary-light text-primary-dark font-semibold text-sm rounded-xl transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSet(set);
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Study Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-surface/80 backdrop-blur-xl border border-border-subtle/60 rounded-3xl shadow-xl shadow-border-subtle/50 p-8">
        {selectedSet ? renderFlashcardViewer() : renderSetList()}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Flashcard Set?"
      >
        <div className="space-y-6">
          <p className="text-sm text-muted">
            Are you sure you want to delete this flashcard set? This action
            cannot be undone and all cards will be permanently removed.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleting}
              className="px-5 h-11 bg-page hover:bg-border-subtle text-body font-medium text-sm rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="px-5 h-11 bg-red-500 hover:bg-red-600 text-surface font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-rose-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {deleting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-surface/30 borer-t-white rounded-full animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete Set"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FlashcardManager;
