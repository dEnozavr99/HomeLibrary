import mongoose from "mongoose";
import Book from "../models/Book.js";

export const test = (request, response) => {
  console.log("test is working");
  response.json("Success!");
}

export const add = async (request, response, next) => {
  try {
    const newBook = new Book(request.body);

    await newBook.save();

    response
      .status(200)
      .json("Book added")
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const update = async (request, response, next) => {
  try {
    console.log("Update params", request.params);
    const updatedBook = await Book.findByIdAndUpdate(
      request.params.id,
      {
        $set:request.body
      },
      { new: true }
    );

    response
      .status(200)
      .json(updatedBook);
  } catch (error) {
    next(error);
  }
}

export const remove = async (request, response, next) => {
  try {
    await Book.findByIdAndDelete(request.params.id);

    response
      .status(200)
      .json("Book is deleted");
  } catch (error) {
    next(error);
  }
}

export const getBook = async (request, response, next) => {
  try {
    const book = await Book.findById(request.params.id);

    response
      .status(200)
      .json(book);
  } catch (error) {
    next(error);
  }
}

export const getAllBooks = async (request, response, next) => {
  try {
    const [filterField, filterValue] = request.query?.filter?.split(":");
    const [sorterField, sorterValue] = request.query?.sorter?.split(":");

    let books = await Book
      .find({ [filterField]: filterValue })
      .sort({ [sorterField]: sorterValue});

    response
      .status(200)
      .json(books);
  } catch (error) {
    next(error);
  }
}
