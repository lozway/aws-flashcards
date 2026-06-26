"use client";

import { CATEGORY_COLORS, type AWSService } from "@/data/aws-services";
import GenAIPanel from "./GenAIPanel";
import { AWS_SERVICES } from "@/data/aws-services";

interface Props {
  service: AWSService;
  flipped: boolean;
  learned: boolean;
  onFlip: () => void;
  onLearn: () => void;
}

export default function FlashCard({ service, flipped, learned, onFlip, onLearn }: Props) {
  const colorClass = CATEGORY_COLORS[service.category];
  const compareOptions = AWS_SERVICES.filter(
    (s) => s.id !== service.id && s.category === service.category
  ).map((s) => s.name);

  return (
    <div
      className="relative h-72 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={onFlip}
      onKeyDown={(e) => e.key === " " && onFlip()}
      tabIndex={0}
      role="button"
      aria-label={`Flash card for ${service.name}. Press space or click to flip.`}
      aria-pressed={flipped}
    >
      {/* Card container — rotates on flip */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 flex flex-col items-center justify-center p-6 shadow-md ${colorClass}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-5xl mb-3" aria-hidden="true">{service.emoji}</span>
          <span className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">
            {service.category}
          </span>
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <p className="mt-2 text-sm text-center opacity-70">{service.shortDesc}</p>
          <p className="mt-4 text-xs opacity-40">Click to reveal facts →</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-gray-200 bg-white flex flex-col p-5 shadow-md overflow-y-auto"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
              {service.category}
            </span>
            <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
          </div>
          <ul className="space-y-1.5 flex-1">
            {service.keyFacts.map((fact, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-blue-500 flex-shrink-0">▸</span>
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t pt-3">
            <button
              onClick={(e) => { e.stopPropagation(); onLearn(); }}
              className={`w-full py-1.5 rounded-lg text-sm font-medium transition-colors ${
                learned
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={learned ? "Mark as still learning" : "Mark as learned"}
            >
              {learned ? "✓ Learned" : "Mark as Learned"}
            </button>
            <GenAIPanel serviceName={service.name} compareOptions={compareOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
