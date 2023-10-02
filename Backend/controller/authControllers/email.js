const nodemailer = require('nodemailer')
const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');


//Function to Password Bash 
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

//Generate 6 digit Numeric
function generateResetToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

//Function to send reset email
async function sendResetEmail(email, resetLink) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: 'bilalmirza79500@gmail.com',
                pass: 'wjsgtpljfrlgwyui'
            }
        });
        const mailOptions = {
            to: email,
            subject: 'Password Reset',
            text: `Verify Your OTP: ${resetLink}`
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending reset email:', error);
        throw new Error('An error occurred while sending the reset email.');
    }
}
exports.forgot_password = async (req, res) => {
    const email = req.body.email;
    const resetToken = generateResetToken();
    const tokenExpiration = new Date(Date.now() + 3600000); // Set token expiration 1 hour from now
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { resetToken: resetToken, resetTokenExpiration: tokenExpiration }
        );
        const resetLink = resetToken;
        await sendResetEmail(email, resetLink);
        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        console.error('Error updating reset token:', error);
        res.status(500).json({ error: 'An error occurred while updating the reset token.' });
    }
};
exports.verify_otp = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (user.resetToken === otp && user.resetTokenExpiration > Date.now()) {
            const spassWord = await securePassword(newPassword);
            user.password = spassWord;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            await user.save();
            return res.status(200).json({ message: 'Password reset successful.' });
        } else {
            return res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
    } catch (error) {
        console.error('Error verifying OTP and updating password:', error);
        res.status(500).json({ error: 'An error occurred while verifying OTP and updating password.' });
    }
};