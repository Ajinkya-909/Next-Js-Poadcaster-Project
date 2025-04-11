import { action } from "./_generated/server";
import { v } from "convex/values";

// No default — voice must be passed in
const ELEVEN_LABS_API_KEY = process.env.ElevenLabsAI_API_KEY!;

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { input, voice }) => {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVEN_LABS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text: input,
          model_id: "eleven_monolingual_v1", // or "eleven_multilingual_v2"
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // for logging/debugging
      throw new Error(`ElevenLabs API Error: ${response.status} - ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    if (arrayBuffer.byteLength === 0) {
      throw new Error("Received empty audio data");
    }
    return arrayBuffer;
  },
});
