
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCoffeeRecommendation = async (userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bạn là "Revital Sommelier" - chuyên gia tư vấn cà phê cho quán Revital Coffee. 
      Hãy dựa vào yêu cầu của khách hàng sau đây để đề xuất một loại đồ uống phù hợp từ thực đơn (Revital Signature, Latte Hạnh Nhân, Trà Sen Vàng, Espresso, Matcha). 
      Yêu cầu khách: "${userInput}"
      Hãy trả lời bằng tiếng Việt, giọng điệu thân thiện, sang trọng và ngắn gọn.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    // Extract text directly from the .text property of GenerateContentResponse.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang bận pha cà phê một chút. Bạn có thể thử Revital Signature - món bán chạy nhất của chúng tôi nhé!";
  }
};
