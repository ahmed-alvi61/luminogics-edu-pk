const userModel = require('../models/userModel');
const weekModel = require('../models/weekModel')

exports.add_weeks = async (req, res) => {
    try {
        const { name, items } = req.body;
        if (!name || !items) {
            return res.status(400).json({ success: false, msg: "Missing required data." });
        }
        const numberOfItems = items.length;
        const week = new weekModel({
            name: req.body.name,
            no_of_item : numberOfItems,
            items: req.body.items,
        });
        const weekData = await weekModel.findOne({ name });
        if (weekData) {
            return res.status(400).json({ success: false, msg: "This week is already registered" });
        }
        const week_data = await week.save();
        return res.status(201).json({ success: true, data: week_data });
    } catch (error) {
        console.error('Error registering:', error);
        res.status(500).json({ success: false, error: "An error occurred." });
    }
}
exports.get_weeks_data = async (req, res) => {
    try {
        const datas = await weekModel.find({});
        if (datas.length > 0) {
            res.json(datas);
        } else {
            res.send("Data not found")
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}
exports.edit_week = async (req, res) => {
    try {
        const result = await weekModel.updateOne({ _id: req.params.id }, {
            $set: req.body
        });

        if (result.nModified === 0) {
            return res.status(404).json({ success: false, message: "Week not found or not modified." });
        }
        res.status(200).json({ success: true, message: "Week updated successfully." });
    } catch (error) {
        console.error('Error updating Week:', error);
        res.status(500).json({ success: false, error: "An error occurred while updating the Week." });
    }
}
exports.delete_week = async (req, res) => {
    try{
        const result = await weekModel.deleteOne({ _id: req.params.id })
        res.status(200).json({ success: true, message: "Week deleted successfully." });
    }catch{
        console.error('Error Deleting Week:', error);
        res.status(500).json({ success: false, error: "An error occurred while deleting the Week." });
    }
}



exports.item_marked = async (req, res) => {
    const { userId,weekId, itemId } = req.params;
  
    try {
      const user = await userModel.findById(userId);
      // Update the completed status of the item in the assignedWeeks
      const assignedWeek = user.assignedWeeks.find(assignedWeek => assignedWeek.week.toString() === weekId);
      if (assignedWeek) {
        const assignedItem = assignedWeek.weekData.items.find(assignedItem => assignedItem._id.toString() === itemId);
        if (assignedItem) {
          assignedItem.completed = true;
        }
      }
      // Save the updated user
      await user.save();
      res.json({ result: 'Item marked as completed for the user', success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ result: 'Something went wrong', success: false });
    }
  };