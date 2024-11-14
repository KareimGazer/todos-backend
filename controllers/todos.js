const router = require('express').Router()
const { Todo } = require('../models')
const { Op } = require('sequelize')

const todoFinder = async (req, res, next) => {
    const todo = await Todo.findByPk(req.params.id)
    if (!todo) {
        throw new Error('TodoNotFoundError')
    }
    else {
        req.todo = todo
    }
    next()
}

router.get('/', async (req, res) => {
    const { search } = req.query;
    const searchCondition = search ? {
        [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },  // Case-insensitive search in the title field
            { author: { [Op.iLike]: `%${search}%` } }  // Case-insensitive search in the author field
        ]
    } : {};

    const todos = await Todo.findAll({
        order: [['createdAt', 'DESC']],
        where: searchCondition
    })
    res.status(200).json(todos)
    // console.log(JSON.stringify(blogs, null, 2))
})

router.get('/:id', todoFinder, async (req, res) => {
    res.status(200).json(req.todo)
})

router.post('/', async (req, res) => {
    const savedTodo = await Todo.create({ ...req.body })
    res.status(201).json(savedTodo)
})

// beware the likes should not be updated nor the date created
router.put('/:id', todoFinder, async (req, res) => {
    const todo = req.todo
    const updatedTodo = await todo.update({ ...req.body })
    res.status(200).json(updatedTodo)
})

router.delete('/:id', todoFinder, async (req, res) => {
    const todo = req.todo
    await todo.destroy()
    res.status(204).end()
})

module.exports = router
