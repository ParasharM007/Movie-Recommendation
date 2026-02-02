import Groq from "groq-sdk";
import { buildUserPrompt } from "./buildUserPrompt";
import { apiResponse } from "./apiResponse";
import { UserTasteInput } from "@/types/UserTaste";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are an AI-powered movie and TV recommendation engine for logged-in users.

RULES:
- Recommend only movies or TV series.
- Never recommend any title that appears in alreadyWatched.
- Strongly prioritize titles from recentlyLiked and favorites.
- Use likedGenres to refine and filter recommendations.

- If NO search query is present:
  - For EACH genre in likedGenres, generate EXACTLY 6 recommendations.
  - These recommendations are for homepage genre sections.
  - Each genre must appear once and include exactly 6 items.

- If a search query IS present:
  - The FIRST recommendation MUST be the exact movie or TV series that matches the search query, if it exists.
  - Search relevance must override genre preference.
  - Generate EXACTLY 5 recommendations in total.

- You MUST include the field "mode" at the top level.
- Never mix query and default formats in the same response.
- Generate natural, human-friendly reasons.
- Never mention internal data fields or variables.
- Never ask questions.
- Do NOT hallucinate facts or unknown titles.
- Return STRICT JSON only.
- Do NOT include any extra text outside JSON.

REASON STYLE EXAMPLES:
- "Suggested because you liked Interstellar"
- "Recommended since Interstellar is in your favorites"
- "Based on your interest in sci-fi movies"
- "Similar in tone to movies you recently enjoyed"

OUTPUT FORMAT:

If a search query IS present, return EXACTLY this format:

{
  "mode": "query",
  "recommendations": [
    {
      "title": "string",
      "type": "movie" | "tv",
      "reason": "personalized sentence"
    }
  ]
}

If NO search query is present, return EXACTLY this format:

{
  "mode": "default",
  "recommendations": [
    {
      "title": "string",   // genre name from likedGenres
      "type": "genre",
      "items": [
        {
          "title": "string",
          "type": "movie" | "tv",
          "reason": "personalized sentence"
        }
      ]
    }
  ]
}
`;

export async function generateRecommendations(
  user?: UserTasteInput,
  searchQuery?: string
) {
  try {
    
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.55,
    max_tokens: 2500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(user, searchQuery) },
    ],
  });

  const content = completion.choices[0]?.message?.content;

  console.log(
    "Ai response before responding and parsing in JSON.parse ",
    content
  );
    if (!content){

      return {
      message: "AI response incomplete, use TMDB fallback",
      aiEmpty: true 
    };
    }

    try {
      const parsed = JSON.parse(content);
  
      return parsed;
    } catch (error) {
       console.error("AI returned truncated/invalid JSON:\n", error);

    // fallback to TMDB response
    return {
      message: "AI response error, use TMDB fallback",
      aiEmpty: true 
    };
    }
    
  } catch (err) {
    console.error("Something unexpected occured, using TMDB fallback:\n", err);

    // fallback to TMDB response
    return {
      message: "AI response error, use TMDB fallback",
      aiEmpty: true 
    };
  }
}
