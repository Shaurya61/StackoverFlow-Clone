import express from 'express'
import getCurrentPlan from '../utils/getCurrentPlan.js'
import getNoOfQuestions from '../utils/getNoOfQuestions.js'

const router = express.Router()

router.post('/getCurrentPlan',getCurrentPlan)
router.post('/getNoOfQuestions',getNoOfQuestions)

export default router