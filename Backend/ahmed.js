// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());


// // Mark an item as completed for a specific user in a specific week
// app.post('/complete-item', async (req, res) => {
//   try {
//     const { userId, weekId, itemName } = req.body;

//     const user = await User.findOne({ _id: userId, 'weekProgress.week': weekId });
//     if (!user) {
//       return res.status(404).json({ error: 'User or week not found' });
//     }

//     const weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
//     if (!weekProgress) {
//       return res.status(404).json({ error: 'Week not found in user progress' });
//     }

//     const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
//     if (!itemProgress) {
//       return res.status(404).json({ error: 'Item not found in week progress' });
//     }

//     // Mark the item as completed
//     itemProgress.completed = true;

//     await user.save();
//     res.status(200).json({ message: 'Item marked as completed' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Retrieve user's progress for a specific week
// app.get('/user-progress/:userId/:weekId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const weekId = req.params.weekId;

//     const user = await User.findById(userId).populate('weekProgress.week');
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const weekProgress = user.weekProgress.find((progress) => progress.week._id.toString() === weekId);
//     if (!weekProgress) {
//       return res.status(404).json({ error: 'Week not found in user progress' });
//     }

//     res.status(200).json({ userProgress: weekProgress });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// mongoose.connect('mongodb+srv://ahmedalvi:6may1997@cluster0.tcwjsql.mongodb.net/Ahmed', { useNewUrlParser: true, useUnifiedTopology: true });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// exports.complete_item = async (req, res) => {
//   try {
//     const { userId, weekId, itemId } = req.body;

//     // Check if weekId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(weekId)) {
//       return res.status(400).json({ error: 'Invalid weekId' });
//     }

//     // Check if a document with the specified weekId exists in weekModel
//     const existingWeek = await weekModel.findOne({ _id: weekId });
//     if (!existingWeek) {
//       return res.status(404).json({ error: 'Week not found' });
//     }

//     // Check if the user progress document already exists for this user and week
//     const existingProgress = await UserProgress.findOne({ user: userId, week: weekId });
//     if (!existingProgress) {
//       // If the user progress document doesn't exist, create it
//       const newUserProgress = new UserProgress({
//         user: userId,
//         week: weekId,
//         completedItems: [itemId],
//       });
//       await newUserProgress.save();
//     } else {
//       // If the user progress document already exists, update it
//       existingProgress.completedItems.push(itemId);
//       await existingProgress.save();
//     }

//     // Also update the week document to record the user who completed the item
//     const updatedWeek = await weekModel.findByIdAndUpdate(
//       weekId,
//       { $push: { 'items.completedBy': userId } },
//       { new: true } // Return the updated document
//     );

//     if (!updatedWeek) {
//       console.error('Failed to update weekModel');
//       return res.status(500).json({ error: 'Failed to update weekModel' });
//     }

//     console.log('Item marked as completed');

//     res.status(200).json({ message: 'Item marked as completed' });
//   } catch (error) {
//     console.error('Internal server error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };




//2
// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
  
//       // Query the user by ID
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Check if the user has progress for the specified week
//       const weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
  
//       if (!weekProgress) {
//         return res.status(404).json({ error: 'Week progress not found for this user' });
//       }
  
//       // Find the item progress within the week progress
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };



// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
  
//       // Log the received data
//       console.log('Received userId:', userId);
//       console.log('Received weekId:', weekId);
  
//       // Query the user by ID
//       const user = await userModel.findById(userId);
  
//       // Log the user and user progress data
//       console.log('User:', user);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Check if the user has progress for the specified week
//       const weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
  
//       // Log the user's weekProgress data
//       console.log('User weekProgress:', user.weekProgress);
//       console.log('Found weekProgress:', user.weekProgress);
  
//       if (!user.weekProgress) {
//         return res.status(404).json({ error: 'Week progress not found for this user' });
//       }
  
//       // Find the item progress within the week progress
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       // Log any internal server errors
//       console.error('Internal server error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  


//4
// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
  
//       // Query the user by ID
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Check if the user has progress for the specified week
//       let weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
  
//       if (!weekProgress) {
//         // If the week progress doesn't exist, create it
//         weekProgress = { week: weekId, itemProgress: [] };
//         user.weekProgress.push(weekProgress);
//       }
  
//       // Find the item progress within the week progress
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       console.error('Internal server error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };




//5
// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, items } = req.body;
  
//       // Query the user by ID
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Check if the user has progress for the specified week
//       let weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
  
//       if (!weekProgress) {
//         // If the week progress doesn't exist, create it
//         weekProgress = { week: weekId, itemProgress: [] };
//         user.weekProgress.push(weekProgress);
//       }
  
//       // Log the week progress to inspect its contents
//       console.log('Week Progress:', weekProgress);
  
//       // Find the item progress within the week progress
//       let itemProgress = weekProgress.itemProgress.find((item) => item.item === items);
  
//       // Log the item progress to inspect its contents
//       console.log('Item Progress:', itemProgress);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       console.error('Internal server error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  
  


// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
  
//       // Use findOneAndUpdate to find or create the weekProgress
//       const user = await userModel.findOneAndUpdate(
//         { _id: userId, 'weekProgress.week': weekId },
//         {
//           $setOnInsert: {
//             week: weekId,
//             itemProgress: [],
//           },
//         },
//         { upsert: true, new: true }
//       );
  
//       // Check if user is null (not found)
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Find the item progress within the week progress
//       const weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       console.error('Internal server error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };






// exports.completeItem = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
  
//       // Find the user by ID
//       const user = await userModel.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       console.log("Before Week Progress");

//       let wekProgress = user.weekProgress.find(())
  
//       // Find or create week progress for the specified week
//       let weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
  
//       if (!weekProgress) {
//         weekProgress = { week: weekId, itemProgress: [] };
//         user.weekProgress.push(weekProgress);
//       }
  
//       // Find the item progress within the week progress
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
  
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item progress not found in this week' });
//       }
  
//       // Mark the item as completed
//       itemProgress.completed = true;
  
//       // Save the updated user
//       await user.save();
  
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       console.error('Internal server error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

//1
// exports.complete_item = async (req, res) => {
//     try {
//       const { userId, weekId, itemName } = req.body;
//       const user = await userModel.findOne({ _id: userId, 'weekProgress.week': weekId });
//       if (!user) {
//         return res.status(404).json({ error: 'User or week not found' });
//       }
//       const weekProgress = user.weekProgress.find((progress) => progress.week.toString() === weekId);
//       if (!weekProgress) {
//         return res.status(404).json({ error: 'Week not found in user progress' });
//       }
//       const itemProgress = weekProgress.itemProgress.find((item) => item.item === itemName);
//       if (!itemProgress) {
//         return res.status(404).json({ error: 'Item not found in week progress' });
//       }
//       // Mark the item as completed
//       itemProgress.completed = true;
//       await user.save();
//       res.status(200).json({ message: 'Item marked as completed' });
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };