
import { GoogleGenAI } from "@google/genai";

// Kiểm tra sự tồn tại của API_KEY trước khi khởi tạo
const apiKey = process.env.API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getCoffeeRecommendation = async (userInput: string) => {
  if (!ai) {
    return "Chào bạn! Hiện tại hệ thống AI đang được bảo trì. Bạn có thể thử món Revital Signature của chúng tôi nhé!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bạn là "Revital Sommelier" - chuyên gia tư vấn cà phê cho quán Revital Coffee. 
      Hãy dựa vào yêu cầu của khách hàng sau đây để đề xuất một loại đồ uống phù hợp từ thực đơn. 
      Yêu cầu khách: "${userInput}"
      Hãy trả lời bằng tiếng Việt, giọng điệu thân thiện, sang trọng và ngắn gọn.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang bận pha cà phê một chút. Bạn có thể thử Revital Signature - món bán chạy nhất của chúng tôi nhé!";
  }
};
