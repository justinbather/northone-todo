const express = require('express')


router = express.Router()


router.get('/', (_req, res) => {
  res.status(200).json("tasks")
})

module.exports = router
