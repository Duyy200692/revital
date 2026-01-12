
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client with the API key from environment variables.
// Following the guideline to use the process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCoffeeRecommendation = async (userInput: string) => {
  try {
    // FIX: Using ai.models.generateContent with systemInstruction for the persona as per latest guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        // Moving persona/instructions to systemInstruction in the config object.
        systemInstruction: 'Bạn là "Revital Sommelier" - chuyên gia tư vấn cà phê cho quán Revital Coffee. Hãy dựa vào yêu cầu của khách hàng sau đây để đề xuất một loại đồ uống phù hợp từ thực đơn. Hãy trả lời bằng tiếng Việt, giọng điệu thân thiện, sang trọng và ngắn gọn.',
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // FIX: Accessing the generated text via the .text property directly (not a method).
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang bận pha cà phê một chút. Bạn có thể thử Revital Signature - món bán chạy nhất của chúng tôi nhé!";
  }
};
