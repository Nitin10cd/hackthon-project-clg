import { Resend } from "resend";

const resend = new Resend("Your API KEY !!!");

// sos email template
export async function sendStudentMarks(userEmail, marks , title) {
    try {
        if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            throw new Error("Invalid email address");
        }

        const { data, error } = await resend.emails.send({
            from: "Result <onboarding@resend.dev>",  
            to: [userEmail],
            subject: "Result of Student Test",
            html: `
                <h2 style="color: red;">Emergency Alert!</h2>
                <p>This is an automated SOS alert. The sender is in distress and needs immediate assistance.</p>
                <p>Please respond as soon as possible!</p>
                <p>Stay safe.</p>
                <a href="${refLink}" style="display: inline-block; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px; text-align: center;">Get Location</a>
            `,
        });

        if (error) {
            console.error("Email sending failed:", error);
            return false;
        }

        console.log("SOS Email sent successfully to:", userEmail);
        return true;
    } catch (err) {
        console.error("Error in sendEmailSOS:", err);
        return false;
    }
}
