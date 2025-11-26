import axios from 'axios';

// 千问API服务类
class QwenAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://dashscope.aliyuncs.com/api/v1';
  }

  // 生成圣诞祝福文本
  async generateChristmasGreeting() {
    try {
      const response = await axios.post(
        `${this.baseURL}/services/aigc/text-generation/generation`,
        {
          model: "qwen-turbo", // 或其他支持的模型
          input: {
            messages: [
              {
                role: "system",
                content: "You are a cheerful Christmas assistant. Generate a unique, warm, and personalized Christmas greeting in English. Make it festive and heartwarming, about 1-2 sentences long."
              },
              {
                role: "user",
                content: "Generate a Christmas greeting message in English."
              }
            ]
          },
          parameters: {
            temperature: 0.7
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.output.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Qwen text generation API:', error);
      // 返回默认祝福语
      const defaultGreetings = [
        "Merry Christmas! May your holidays be filled with joy, love, and laughter!",
        "Wishing you a magical Christmas filled with wonder and happiness!",
        "May the spirit of Christmas bring peace, joy, and goodwill to you and your family!",
        "Happy Holidays! May this Christmas season bring you closer to those you love!",
        "May your Christmas be merry and bright with the warmth of family and friends!",
        "Sending you warm wishes for a wonderful Christmas and a prosperous New Year!",
        "May your heart be light and your holidays bright with Christmas cheer!",
        "Christmas magic is all around us - may you find it in every moment!"
      ];
      return defaultGreetings[Math.floor(Math.random() * defaultGreetings.length)];
    }
  }

  // 处理图片 - 添加圣诞帽（使用千问视觉模型）
  async processImageWithSantaHat(imageDataUrl) {
    try {
      // 将数据URL转换为base64
      const base64Data = imageDataUrl.split(',')[1];
      
      const response = await axios.post(
        `${this.baseURL}/services/aigc/image-synthesis`,
        {
          model: "wanx-style-prompts", // 或其他支持的图像处理模型
          input: {
            prompt: "Add a red Christmas hat to the person in this image, with white fur trim, positioned naturally on their head",
            image: base64Data
          },
          parameters: {
            n: 1,
            size: "1024*1024"
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // 返回处理后的图片URL
      if (response.data.output && response.data.output.images && response.data.output.images.length > 0) {
        return `data:image/jpeg;base64,${response.data.output.images[0].b64_image}`;
      }
      
      // 如果API没有返回处理后的图片，返回原始图片
      return imageDataUrl;
    } catch (error) {
      console.error('Error calling Qwen image processing API:', error);
      // 返回原始图片作为备选
      return imageDataUrl;
    }
  }
}

export default QwenAPIService;