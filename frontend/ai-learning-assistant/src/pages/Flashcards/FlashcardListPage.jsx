import React from "react";
import FlashcardManager from "../../components/flashcards/FlashcardManager";

const FlashcardListPage = () => {
  return (
    <div className="min-h-screen">
      {/* Subtle background pattern */}

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-medium text-navy tracking-tight mb-2">
            My Flashcards
          </h1>
          <p className="text-muted text-sm">
            Review and manage all your generated flashcard sets
          </p>
        </div>

        <FlashcardManager />
      </div>
    </div>
  );
};

export default FlashcardListPage;