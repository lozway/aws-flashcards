"use client";

import { useState, useCallback } from "react";
import type { PromptMode } from "@/lib/prompts";

interface Props {
  serviceName: string;
  compareOptions?: string[];
}

export default function GenAIPanel({ serviceName, compareOptions = [] }: Props) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [compareWith, setCompareWith] = useState(compareOptions[0] ?? "");

  const generate = useCallback(
    async (mode: PromptMode) => {
      setOutput("");
      setLoading(true);
      try {
        const res = await fetch("/api/genai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service: serviceName, mode, compareWith }),
        });
        if (!res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setOutput((prev) => prev + decoder.decode(value));
        }
      } finally {
        setLoading(false);
      }
    },
    [serviceName, compareWith]
  );

  return (
    <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => generate("question")}
          disabled={loading}
          className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Quiz me
        </button>
        <button
          onClick={() => generate("explain")}
          disabled={loading}
          className="px-3 py-1 text-xs rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Explain
        </button>
        {compareOptions.length > 0 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => generate("compare")}
              disabled={loading}
              className="px-3 py-1 text-xs rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              Compare vs
            </button>
            <select
              value={compareWith}
              onChange={(e) => setCompareWith(e.target.value)}
              className="text-xs border rounded px-1 py-0.5"
            >
              {compareOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {(loading || output) && (
        <div className="rounded-lg bg-gray-900 text-green-300 text-xs p-3 min-h-[60px] font-mono whitespace-pre-wrap">
          {output}
          {loading && <span className="animate-pulse">▋</span>}
        </div>
      )}
    </div>
  );
}
