const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
console.log(email,"email here")
console.log(subject,"this is the subject")

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent!");
        console.log(error);
        return error;
    }
};
