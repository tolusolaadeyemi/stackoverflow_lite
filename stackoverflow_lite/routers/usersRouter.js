const express = require('express');
const { usersController } = require('../controllers');
const { auth, checkExistence } = require('../middleware');
const { createUserValidator } = require('../validator/validator');

const router = express.Router();

/** @route      POST /api/v1/users/
 *  @desc       register a new user
 */
router.post('/', createUserValidator, checkExistence, usersController.register);

/** @route      GET /api/v1/users/load
 *  @desc       fetch logged-in user details
 */
 router.get('/load', auth, usersController.loadUser);

/** @route      POST /api/v1/users/login
*  @desc       log in user
*/
router.post('/login', usersController.login);


module.exports = router;