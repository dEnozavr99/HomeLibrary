import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Stack, TextField } from '@mui/material';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js';

const EDIT_BOOK_ACTIONS = {
  TITLE_CHANGE: 'title_change',
  AUTHOR_CHANGE: 'author_change',
  PUBLISHER_CHANGE: 'publisher_change',
  YEAR_CHANGE: 'year_change',
  PAGES_CHANGE: 'pages_change',
  IMAGE_CHANGE: 'image_change',
  BASE_CHANGE: 'base_change',
}

const reducer = (state, action) => {
  switch (action.type) {
    case EDIT_BOOK_ACTIONS.TITLE_CHANGE:
      return {
        ...state,
        title: action.payload,
      }
    case EDIT_BOOK_ACTIONS.AUTHOR_CHANGE:
      return {
        ...state,
        author: action.payload,
      }
    case EDIT_BOOK_ACTIONS.PUBLISHER_CHANGE:
      return {
        ...state,
        publisher: action.payload,
      }
    case EDIT_BOOK_ACTIONS.YEAR_CHANGE:
      return {
        ...state,
        year: action.payload,
      }
    case EDIT_BOOK_ACTIONS.PAGES_CHANGE:
      return {
        ...state,
        pages: action.payload,
      }
    case EDIT_BOOK_ACTIONS.IMAGE_CHANGE:
      return {
        ...state,
        image: action.payload,
      }
    case EDIT_BOOK_ACTIONS.BASE_CHANGE:
      return {
        ...state,
      }

      default:
        break;
  }
};

const EditBookModal = ({ book, onClose, open, handleEditBook}) => {
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

  React.useEffect(() => {
    if (book !== null) {
      dispatch({
        type: EDIT_BOOK_ACTIONS.BASE_CHANGE, 
        payload: {
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          year: book.year,
          pages: book.pages,
          image: book.image,
        }
      })
    }
  }, [book])

  const combineObjects = (a, b) => {
    const keys = Object.keys(a);

    let result = {};

    keys.forEach((key) => {
      result[key] = a[key] || b[key];
    })

    return result
  }

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault()

    setPercentage(0);
    handleEditBook(combineObjects(state, book));
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
          dispatch({ type: EDIT_BOOK_ACTIONS.IMAGE_CHANGE, payload: downloadURL})

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
          required={book?.title == null}
          id="title"
          placeholder={book?.title}
          type="text"
          onInput={(e) => {
            dispatch({ type: EDIT_BOOK_ACTIONS.TITLE_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required={book?.author == null}
          id="author"
          placeholder={book?.author}
          type="text"
          onInput={(e) => {
            dispatch({ type: EDIT_BOOK_ACTIONS.AUTHOR_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required={book?.publisher == null}
          id="publisher"
          placeholder={book?.publisher}
          type="text"
          onInput={(e) => {
            dispatch({ type: EDIT_BOOK_ACTIONS.PUBLISHER_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required={book?.year == null}
          id="year"
          placeholder={book?.year.toString()}
          type="number"
          onInput={(e) => {
            dispatch({ type: EDIT_BOOK_ACTIONS.YEAR_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          required={book?.pages == null}
          id="pages"
          placeholder={book?.pages.toString()}
          type="number"
          onInput={(e) => {
            dispatch({ type: EDIT_BOOK_ACTIONS.PAGES_CHANGE, payload: e.target.value})
          }}
        />
        <TextField
          id="image"
          // placeholder={book?.image}
          type="file"
          onInput={(e) => {
            processImage(e.target.files[0]);
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
          Оновити
        </Button>
        <Button
          type='reset'
          variant="text"
          onClick={handleClose}
        >
          Скасувати
        </Button>
      </Stack>
    </Dialog>
  );
}

export default EditBookModal;