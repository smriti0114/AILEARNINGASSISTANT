import React from "react";
import { Link } from "react-router-dom";
import { Play, BarChart2, Trash2, Award } from "lucide-react";
import moment from "moment";

const QuizCard = ({ quiz, onDelete }) => {
  return (
    <div className="group relative bg-surface/80 backdrop-blur-xl border-2 border-border-subtle hover:border-emerald-300 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 flex flex-col justify-between">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(quiz);
        }}
        className="absolute top-4 right-4 p-2 text-muted hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>

      <div className="space-y-4">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 py-1 rounded-lg text-xs font-semibold">
          <div className="flex items-center gap-1.5 bg-primary-subtle border border-emerald-200 rounded-lg px-3 py-1">
            <Award className="w-3.5 h-3.5 text-primary-hover" strokeWidth={2.5} />
            <span className="text-primary-dark">Score: {quiz?.score}</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-navy mb-1 line-clamp-2" title={quiz.title}>
            {quiz.title ||
              `Quiz - ${moment(quiz.createdAt).format("MMM D, YYYY")}`}
          </h3>
          <p className="text-xs font-medium text-muted uppercase tracking-wide">
            Created {moment(quiz.createdAt).format("MMM D, YYYY")}
          </p>
        </div>

        {/* Quiz Info */}
        <div className="flex items-center gap-3 pt-2 border-t border-page">
          <div className="px-3 py-1.5 bg-page border border-border-subtle rounded-lg">
            <span className="text-sm font-semibold text-body">
              {quiz.questions.length}{" "}
              {quiz.questions.length === 1 ? "Question" : "Questions"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-2 pt-4 border-t border-page">
        {quiz?.userAnswers?.length > 0 ? (
          <Link to={`/quizzes/${quiz._id}/results`}>
            <button className="group/btn w-full inline-flex items-center justify-center gap-2 h-11 bg-page hover:bg-border-subtle text-late-700 font-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 cursor-pointer">
              <BarChart2 className="w-4 h-4" strokeWidth={2.5} />
              View Results
            </button>
          </Link>
        ) : (
          <Link to={`/quizzes/${quiz._id}`}>
            <button className="group/btn relative w-full h-11 bg-primary hover:bg-primary-hover text-surface font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 active:scale-95 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Play className="w-4 h-4" strokeWidth={2.5} />
                Start Quiz
              </span>
              <div className="absolute inset-0 bg-surface/10 -translate-x-full group-hover/btn:translate-x-full transition-transforn duration-700" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
