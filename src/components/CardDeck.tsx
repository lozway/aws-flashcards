"use client";

import FlashCard from "./FlashCard";
import { useFlashCards, type Filter } from "@/hooks/useFlashCards";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Still Learning", value: "learning" },
  { label: "Learned", value: "learned" },
];

export default function CardDeck() {
  const {
    cards,
    learned,
    flipped,
    filter,
    setFilter,
    toggleLearned,
    toggleFlip,
    reset,
    learnedCount,
    totalCount,
  } = useFlashCards();

  const progress = Math.round((learnedCount / totalCount) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AWS Flash Cards</h1>
        <p className="text-gray-500 mt-1">Master AWS services with AI-powered quizzes</p>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{learnedCount} of {totalCount} learned</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar"
          aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto text-xs text-red-500 hover:text-red-700 underline"
          aria-label="Reset all progress"
        >
          Reset progress
        </button>
      </div>

      {/* Grid */}
      {cards.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No cards match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((service) => (
            <FlashCard
              key={service.id}
              service={service}
              flipped={flipped.has(service.id)}
              learned={learned.has(service.id)}
              onFlip={() => toggleFlip(service.id)}
              onLearn={() => toggleLearned(service.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
