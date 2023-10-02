const userModel = require('../models/userModel')
const SignupSchema = require('../middleware/auth/validation');
const weekModel = require('../models/weekModel');
const secretKey = 'ahmedsecret';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
//Login User
exports.login_user = async (req, res) => {
    const { error } = SignupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            result: error.details[0].message,
            success: false,
        });
    }
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ result: 'No User Found', success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ result: 'Invalid password', success: false });
        }

        // Check if user has already been assigned weeks
        if (!user.assignedWeeks || user.assignedWeeks.length === 0) {
            const allWeeks = await weekModel.find({});
            user.assignedWeeks = allWeeks.map((week) => {
                return {
                    week: week._id,
                    weekData: {
                        name: week.name,
                        no_of_item: week.no_of_item,
                        items: week.items,
                    },
                };
            });
            await user.save();
            res.json({ token, user: userWithoutPassword, result: 'Weeks assigned successfully', success: true });
        } else {
            res.json({ token, user: userWithoutPassword, result: 'User already has assigned weeks', success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'Something went wrong', success: false });
    }
};


//Signup User
exports.register_user = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, msg: "Missing required data." });
        }
        const { error } = SignupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                result: error.details[0].message,
                success: false,
            });
        }
        const spassWord = await securePassword(password);
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: spassWord,
        });

        const userData = await userModel.findOne({ email });
        if (userData) {
            return res.status(400).json({ success: false, msg: "This email is already registered" });
        }
        const user_data = await user.save();
        return res.status(201).json({ success: true, data: user_data });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: "An error occurred while registering the user." });
    }
};
exports.get_all_users = async (req, res) => {
    try {
        const datas = await userModel.find({});
        res.json(datas);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};
exports.edit_profile = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id })
        const Username = req.body.name;

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.name = Username;
        await user.save();
        return res.status(200).json({ msg: 'User profile name updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error to Edit the profile' });
    }
};
exports.reset_password = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        const { currentPassword, newPassword } = req.body;
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Check if the current password matches the user's password
        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Current password is incorrect' });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ msg: 'Password reset successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error resetting the password' });
    }
};