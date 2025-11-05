import { Book } from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
  const { author } = req.query;
  const condition = author ? { where: { author } } : {};
  const books = await Book.findAll(condition);
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  const deleted = await Book.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ message: "Book not found" });
  res.status(204).send();
};
