import express from 'express'
import { logInController, signUpController } from '../controllers/auth.js'
import { getAllUsers, updateProfile } from '../controllers/users.js'
import auth from '../middleware/auth.js'

import {requireSignin,hasAuthorization} from '../controllers/auth.js'
import {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    photo,
    defaultPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople} from '../controllers/users.js'
const router = express.Router()
router.post('/signup', signUpController)
router.post('/login', logInController)
router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.route('/create')
.get(list)
.post(create)

router.route('/photo/:userId')
  .get(photo, defaultPhoto)
router.route('/defaultphoto')
  .get(defaultPhoto)

router.route('/follow')
    .put(requireSignin, addFollowing, addFollower)
router.route('/unfollow')
    .put(requireSignin, removeFollowing, removeFollower)

router.route('/findpeople/:userId')
   .get(requireSignin, findPeople)

router.route('/:userId')
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove)

router.param('userId', userByID)

export default router