import React from "react";
import styled from "styled-components";
import axios from "axios"

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import AddBookModal from "./components/AddBookModal";
import EditBookModal from "./components/EditBookModal";

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex: 7;
`

function App() {
  const [books, setBooks] = React.useState([]);
  const [filter, setFilter] = React.useState(null);
  const [sorter, setSorter] = React.useState(null);
  const [isBooksUpdated, setIsBooksUpdated] = React.useState(false);
  const [isAddBookModalVisible, setIsAddBookModalVisible] = React.useState(false);
  const [isEditBookModalVisible, setIsEditBookModalVisible] = React.useState(false);
  const [editedBook, setEditedBook] = React.useState(null);

  React.useEffect(() => {
    try {
      const fetchBooks = async () => {
        const response = await axios.get(`/books/getAllBooks?filter=${filter}&sorter=${sorter}`);
  
        setBooks(response.data);
      };
  
      fetchBooks();
    } catch (error) {
      console.error(error.message);
    }
  }, [filter, sorter, isBooksUpdated]);

  const setSelectedFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const setSelectedSorter = (selectedSorter) => {
    setSorter(selectedSorter);
  };

  const deleteBook = (bookId) => {
    axios.delete(`/books/remove/${bookId}`);

    setIsBooksUpdated(!isBooksUpdated)
  };

  const addBook = (data) => {
    axios.post(`/books/add`, data);

    setIsBooksUpdated(!isBooksUpdated);
  };

  const editBook = (data) => {
    axios.put(`/books/update/${editedBook._id}`, data);

    setIsBooksUpdated(!isBooksUpdated);
  };

  return (
    <Container>
      <Menu
        books={books}
        filter={filter}
        setSelectedFilter={setSelectedFilter}
        handleAddBook={() => {
          setIsAddBookModalVisible(true);
        }}
      />
      <Main>
        <Navbar
          sorter={sorter}
          setSelectedSorter={setSelectedSorter}
        />
        <BookList
          books={books}
          deleteBook={deleteBook}
          editBook={(data) => {
            setEditedBook(data);
            setIsEditBookModalVisible(true);
          }}
        />
      </Main>
      <AddBookModal
        open={isAddBookModalVisible}
        onClose={() => {
          setIsAddBookModalVisible(false);
        }}
        handleAddBook={addBook}
      />
      <EditBookModal
        book={editedBook}
        open={isEditBookModalVisible}
        onClose={() => {
          setIsEditBookModalVisible(false);
        }}
        handleEditBook={editBook}
      />
    </Container>
  );
}

export default App;
