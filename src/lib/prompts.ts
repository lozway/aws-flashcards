export type PromptMode = "question" | "explain" | "compare";

export function buildPrompt(
  serviceName: string,
  mode: PromptMode,
  compareWith?: string
): string {
  switch (mode) {
    case "question":
      return `Generate one concise multiple-choice quiz question (with 4 options labeled A–D and the correct answer) about AWS ${serviceName}. Focus on a practical or exam-relevant fact. Be brief.`;
    case "explain":
      return `Explain AWS ${serviceName} in 3–4 sentences as if teaching a cloud practitioner. Include the primary use case and one key limitation or gotcha.`;
    case "compare":
      return `Compare AWS ${serviceName} vs AWS ${compareWith ?? "a related service"} in 4 bullet points. Focus on when to choose one over the other.`;
  }
}
