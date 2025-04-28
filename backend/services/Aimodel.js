import { GoogleGenerativeAI } from '@google/generative-ai';


const apikey = "Puck you";
const genAI = new GoogleGenerativeAI(apikey);
const model = genAI.getGenerativeModel({
    model : "gemini-2.0-flash"
});


export const generateContent = async (req, res) => {
    const { title, category } = req.body;
  
    const prompt = `
      Generate a concise event description based on the event's title and category. 
      The event title is "${title}" and the category is "${category}". 
      The description should be no longer than 50 characters and should reflect the nature of the event.
  
      Additionally, include an image URL that relates to the event category.
  
      Return the response in the following JSON format:
      {
        "description": "<event_description>",
        "imageUrl": "<image_url>"
      }
    `;
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
  
      // Remove any Markdown or extra formatting and parse the response as JSON
      const cleanResponse = response.replace(/```json\n|\n```/g, '');
      const jsonResponse = JSON.parse(cleanResponse);
  
      return res.json({
        success: true,
        msg: "Data generated successfully",
        response: jsonResponse
      });
  
    } catch (error) {
      // Log the error to help debug
      console.error('Error fetching from Google Generative AI:', error);
      return res.json({
        success: false,
        msg: error.message || 'An error occurred while generating content'
      });
    }
  };
  