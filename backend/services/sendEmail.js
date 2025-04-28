import { Resend } from "resend";

const resend = new Resend('puck you');

export const CreateEmail = async (request, response) => {
    try {
        const { emails, subjects } = request.body;
        console.log(emails);

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: "ronakvarshney7100@gmail.com",
            subject: subjects,
            html: `
          <div style="max-width:600px; margin:0 auto; padding:20px; border:1px solid #eee; border-radius:10px; font-family:Arial, sans-serif; background-color:#f9f9f9;">
            <h2 style="text-align:center; color:#333;">📢 New Notice!</h2>
            <p style="font-size:16px; color:#555;"><strong>Subject:</strong> ${subjects}</p>
            <div style="margin-top:20px; padding:15px; background-color:#fff; border-radius:8px; box-shadow:0px 0px 10px rgba(0,0,0,0.05);">
              <p style="font-size:15px; color:#444; line-height:1.6;">
            
              </p>
            </div>
            <p style="margin-top:30px; text-align:center; font-size:14px; color:#888;">
              Thank you!<br/>
              <strong>Your College Team</strong>
            </p>
          </div>
        `,
        });

        if (error) {
            return response.status(409).json({
                success: false,
                message: error,
            });
        }

        return response.status(201).json({
            success: true,
            message: 'Email sent successfully',
            data,
        });
    }
    catch (error) {
        return response.status(500).json({  // <- corrected from resend.status to response.status
            success: false,
            message: error.message,
        });
    }
}