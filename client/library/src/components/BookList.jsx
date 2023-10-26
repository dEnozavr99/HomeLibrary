import React from 'react'

import styled from 'styled-components'

import BookCard from './BookCard'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 45px;
`

const BookList = ({ books, deleteBook, editBook }) => {
  return (
    <Container>
      {books.map((book) => (
        <BookCard
          book={book}
          deleteBook={deleteBook}
          editBook={editBook}
          key={book._id}
        />
      ))}
    </Container>
  )
}

export default BookList