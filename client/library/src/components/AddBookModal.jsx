import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Stack, TextField } from '@mui/material';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js';

const ADD_BOOK_ACTIONS = {
  TITLE_CHANGE: 'title_change',
  AUTHOR_CHANGE: 'author_change',
  PUBLISHER_CHANGE: 'publisher_change',
  YEAR_CHANGE: 'year_change',
  PAGES_CHANGE: 'pages_change',
  IMAGE_CHANGE: 'image_change'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOK_ACTIONS.TITLE_CHANGE:
      return {
        ...state,
        title: action.payload,
      }
    case ADD_BOOK_ACTIONS.AUTHOR_CHANGE:
      return {
        ...state,
        author: action.payload,
      }
    case ADD_BOOK_ACTIONS.PUBLISHER_CHANGE:
      return {
        ...state,
        publisher: action.payload,
      }
    case ADD_BOOK_ACTIONS.YEAR_CHANGE:
      return {
        ...state,
        year: action.payload,
      }
    case ADD_BOOK_ACTIONS.PAGES_CHANGE:
      return {
        ...state,
        pages: action.payload,
      }
    case ADD_BOOK_ACTIONS.IMAGE_CHANGE:
      return {
        ...state,
        image: action.payload,
      }

      default:
        break;
  }
};

const AddBookModal = ({ onClose, open, handleAddBook}) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    {
      title: "",
      author: "",
      publisher: "",
      year: 0,
      pages: 0,
      image: null,
    }
  )
  const [loadingPercentage, setPercentage] = React.useState(0);
  const [isImageLoading, setIsImageLoading] = React.useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault()

    handleAddBook(state);
    handleClose();
  }

  const processImage = (file) => {
    setIsImageLoading(true);

    const storage = getStorage(app);
    const metadata = {
      contentType: 'image/jpeg'
    };
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setPercentage(Math.round(progress));
      },
      (error) => {
        console.error(error.message);

        setIsImageLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch({ type: ADD_BOOK_ACTIONS.IMAGE_CHANGE, payload: downloadURL});

          setIsImageLoading(false);
        });
      }
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Введіть дані книги, яку хочете додати</DialogTitle>
      <Stack component="form" onSubmit={handleFormSubmit}>
        <TextField
          required
          id="title"
          placeholder='Назва книги'
          type="text"
          onInput={(e) => {
            dispatch({ type: ADD_BOOK_ACTIONS.TITLE_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required
          id="author"
          placeholder='Автор'
          type="text"
          onInput={(e) => {
            dispatch({ type: ADD_BOOK_ACTIONS.AUTHOR_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required
          id="publisher"
          placeholder='Видавництво'
          type="text"
          onInput={(e) => {
            dispatch({ type: ADD_BOOK_ACTIONS.PUBLISHER_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required
          id="year"
          placeholder='Рік'
          type="number"
          onInput={(e) => {
            dispatch({ type: ADD_BOOK_ACTIONS.YEAR_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required
          id="pages"
          placeholder='К-ть сторінок'
          type="number"
          onInput={(e) => {
            dispatch({ type: ADD_BOOK_ACTIONS.PAGES_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          id="image"
          placeholder='Обкладинка'
          type="file"
          onInput={(e) => {
            processImage(e.target.files[0]);
            // dispatch({ type: 'image_change', payload: e.target.value})
          }}
        />
        {isImageLoading && (
          <p>{`${loadingPercentage}%`}</p>
        )}
        <Button
          disabled={isImageLoading}
          type='submit'
          variant="contained"
        >
          Додати
        </Button>
        <Button type='reset' variant="text" onClick={handleClose}>Скасувати</Button>
      </Stack>
    </Dialog>
  );
}

export default AddBookModal;