import Todo from "../model/todoModel";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

// @desc    Get logged in for all todos
// @route   GET /todo
// @access  Private
const getAll = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const apiFeatures = new APIFeatures(
    Todo.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit),
    req.query
  ).filter();
  let todos = await apiFeatures.query;

  if (todos == 0) {
    return next(new ErrorHandler("Not found any todo data", 404));
  }

  res.status(200).json({
    success: true,
    todos,
  });
});

// @desc    fetching todo by it's id
// @route   GET /todo/:id
// @access  Private
const getSingleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    fetching only authorized user's todo
// @route   GET /todo/user
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const apiFeatures = new APIFeatures(
    Todo.find({ username: id }).sort({ createdAt: -1 }),
    req.query
  ).filter();
  let todo = await apiFeatures.query;

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this user_id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    Create new todo
// @route   POST /todo
// @access  Private
const createTodo = asyncHandler(async (req, res, next) => {
  const { username, title, category } = req.body;

  if (!username || !title || !category) {
    return next(new ErrorHandler("Please enter the appropriate fields", 400));
  } else {
    const todo = new Todo({ username, title, category });

    const createdTodo = await todo.save();

    res.status(201).json(createdTodo);
  }
});

// @desc    Updating single todo
// @route   POST /todo/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    todo,
  });
});

// @desc    Deleting single todo
// @route   POST /todo/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  await todo.remove();

  res.status(200).json({
    success: true,
    message: "Todo is deleted",
  });
});

export { getAll, getSingleTodo, getTodos, createTodo, updateTodo, deleteTodo };
