const express = require('express')
const router = new express.Router()
const Dog = require('../models/dog')

router.get('/', async (req, res, next) => {
  try {
    let dogs = await Dog.getAll()
    dogs.forEach((d) => {
      d.speak()
    })
    return res.json(dogs)
  } catch (e) {
    return next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    let dogs = await Dog.getById(req.params.id)
    return res.json(dogs)
  } catch (e) {
    return next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body
    let dogs = await Dog.create(name, age)
    return res.json(dogs)
  } catch (e) {
    return next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let dogs = await Dog.getById(req.params.id)
    await dogs.remove()
    return res.json({ msg: 'deleted!' })
  } catch (e) {
    return next(e)
  }
})

router.patch('/:id/age', async (req, res, next) => {
  try {
    let dogs = await Dog.getById(req.params.id)
    dogs.age += 1
    await dogs.save()
    return res.json(dogs)
  } catch (e) {
    return next(e)
  }
})

router.patch('/:id/rename', async (req, res, next) => {
  try {
    let dogs = await Dog.getById(req.params.id)
    dogs.name = req.body.name
    await dogs.save()
    return res.json(dogs)
  } catch (e) {
    return next(e)
  }
})

module.exports = router
