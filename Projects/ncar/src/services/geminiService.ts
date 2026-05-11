
import { GoogleGenAI } from "@google/genai";
import { Vehicle } from "../types/index";

/**
 * Provides AI-powered market insights for vehicles in Uganda.
 * Following GenAI SDK guidelines for instantiation and property access.
 */
export const getCarInsight = async (vehicle: Vehicle): Promise<string> => {
  // Check for API key availability without requesting user action as per guidelines
  if (!process.env.API_KEY) return "AI Insights are currently unavailable.";
  
  try {
    // Instantiate GoogleGenAI right before the call to ensure the latest key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a brief, professional market insight for a buyer in Uganda considering this vehicle:
      ${vehicle.year} ${vehicle.make} ${vehicle.model}, ${vehicle.condition} condition, mileage ${vehicle.mileage}km, priced at UGX ${vehicle.price.toLocaleString()}.
      Mention fuel efficiency, maintenance availability in Uganda, and resale value potential. Keep it under 150 words.`,
      config: {
        temperature: 0.7,
      },
    });

    // Directly access the .text property (it is a getter, not a method)
    return response.text || "No insights available for this model at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not load AI insights at this time.";
  }
};
