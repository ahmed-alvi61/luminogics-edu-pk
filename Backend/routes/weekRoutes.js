const express = require('express');
const week_Routes = express();

const weekController = require('../controller/weekController')
const verifyToken = require('../middleware/auth/jwt')


week_Routes.post('/add-weeks',weekController.add_weeks)
.get('/get-weeks',weekController.get_weeks_data)
.patch('/edit-week/:id',weekController.edit_week)
.delete('/delete-week/:id',weekController.delete_week)
.put('/weeks/:userId/:weekId/items/:itemId',weekController.item_marked)
module.exports = week_Routes;