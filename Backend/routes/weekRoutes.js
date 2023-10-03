const express = require('express');
const week_Routes = express();

const weekController = require('../controller/weekController')
const verifyToken = require('../middleware/auth/jwt')


week_Routes.post('/add-weeks',verifyToken,weekController.add_weeks)
.get('/get-weeks',verifyToken,weekController.get_weeks_data)
.patch('/edit-week/:id',verifyToken,weekController.edit_week)
.delete('/delete-week/:id',verifyToken,weekController.delete_week)
.put('/weeks/:userId/:weekId/items/:itemId',verifyToken,weekController.item_marked)
module.exports = week_Routes;