import StudentModel from '../models/student.models.js';
import axios from "axios";
import BannedModel from '../models/Banacc.models.js';

export async function checkMessageForAbuse(message, userId) {
  try {
    const apiKey = "api key";

    const response = await axios.post('https://api.gemini.com/v1/analyze', {
      text: message,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    const { isAbusive } = response.data;
    const user = await StudentModel.findById(userId);

    if (isAbusive) {
      const bannedUser = new BannedModel({
        userId: user._id,
        message,
      });

      await bannedUser.save();
      console.log('User has been banned due to abusive message');
      return { banned: true, message: 'Your account has been banned due to abusive content.' };
    } else {
      return { banned: false, message: 'Message is clean.' };
    }

  } catch (error) {
    console.error('Error checking message:', error);
    return { banned: false, message: 'An error occurred during validation.' };
  }
}
