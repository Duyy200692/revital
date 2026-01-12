
import { GoogleGenAI } from "@google/genai";

// getCoffeeRecommendation provides coffee suggestions based on user input using Gemini.
export const getCoffeeRecommendation = async (userInput: string) => {
  try {
    // DO: Create a new GoogleGenAI instance right before making an API call to ensure it uses the latest API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // DO: Use ai.models.generateContent with the model name and prompt directly.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        // DO: Use systemInstruction in the config object for persona/instructions.
        systemInstruction: 'Bạn là "Revital Sommelier" - chuyên gia tư vấn cà phê cho quán Revital Coffee. Hãy dựa vào yêu cầu của khách hàng sau đây để đề xuất một loại đồ uống phù hợp từ thực đơn. Hãy trả lời bằng tiếng Việt, giọng điệu thân thiện, sang trọng và ngắn gọn.',
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // DO: Access the generated text via the .text property directly (not a method).
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang bận pha cà phê một chút. Bạn có thể thử Revital Signature - món bán chạy nhất của chúng tôi nhé!";
  }
};
