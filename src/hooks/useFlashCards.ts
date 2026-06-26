"use client";

import { useState, useEffect, useCallback } from "react";
import { AWS_SERVICES, type AWSService } from "@/data/aws-services";

export type Filter = "all" | "learning" | "learned";

export interface CardState {
  learned: boolean;
  flipped: boolean;
}

const STORAGE_KEY = "aws-flashcards-learned";

function loadLearned(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function useFlashCards() {
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setLearned(loadLearned());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(learned)));
  }, [learned]);

  const toggleLearned = useCallback((id: string) => {
    setLearned((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleFlip = useCallback((id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setLearned(new Set());
    setFlipped(new Set());
  }, []);

  const filteredCards: AWSService[] = AWS_SERVICES.filter((s) => {
    if (filter === "learned") return learned.has(s.id);
    if (filter === "learning") return !learned.has(s.id);
    return true;
  });

  return {
    cards: filteredCards,
    allCards: AWS_SERVICES,
    learned,
    flipped,
    filter,
    setFilter,
    toggleLearned,
    toggleFlip,
    reset,
    learnedCount: learned.size,
    totalCount: AWS_SERVICES.length,
  };
}
