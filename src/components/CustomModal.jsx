import React, { useState } from 'react';
import {
  Container,
  Typography,

  Button,
  Modal,
  Box,
  TextField
} from '@mui/material';
import colorTheme from '../utils/theme';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const CustomModal = ({ books, setBooks, open, setOpen, handleCreate, handleDelete }) => {
  const fetchAndAddBook = (isbn, addBookToState) => {
    const apiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const bookData = data[`ISBN:${isbn}`];
        if (bookData) {
          addBookToState(bookData.details);
          handleCreate()
        } else {
          throw new Error('Book data not found');
        }
      })
      .catch((error) => {
        handleDelete('Book data not found')
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  const [isbn, setIsbn] = useState("");
  const [bookStatus, setBookStatus] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const addBookToState = (book) => {
    console.log({ book });
    book.status = bookStatus.trim().toUpperCase();
    book.id = new Date().getTime();
    const newBooks = [...books, book];
    setBooks(newBooks);
    localStorage.setItem('books', JSON.stringify(newBooks));
  };
  const handleCreateBookClick = () => {
    handleClose();
    fetchAndAddBook(isbn, addBookToState);
  };
  const handleInputChange = (e) => {
    setIsbn(e.target.value)
  };
  return (
    <Container>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Create a book
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-book-modal"
        aria-describedby="create-book-form"
      >
        <Box sx={style}>
          <Typography id="create-book-modal" variant="h6" component="h2">
            Create a Book
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="isbn"
              label="ISBN"
              name="isbn"
              autoFocus
              placeholder='1931498717'
              value={isbn}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="status"
              label="Book Status"
              name="status"
              value={bookStatus}
              placeholder='(Finished , Reading , New)'
              onChange={(e) => { setBookStatus(e.target.value) }}
            />
            <Box sx={{ display: "flex", gap: 1, width: "100%" }}>

              <Button onClick={handleClose} color="primary"
                sx={{
                  backgroundColor: colorTheme.whiteColor,
                  color: colorTheme.buttonBackgroundColor,
                  border: "1px solid #6200EE",
                  '&:hover': {
                    backgroundColor: colorTheme.buttonBackgroundColor,
                    color: colorTheme.whiteColor,
                    border: "1px solid #fff"
                  },
                  textTransform: "capitalize",
                  width: "50%",
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleCreateBookClick}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: colorTheme.buttonBackgroundColor,
                  '&:hover': {
                    backgroundColor: colorTheme.whiteColor,
                    color: colorTheme.buttonBackgroundColor,
                    border: "1px solid #6200EE"
                  },
                  color: colorTheme.whiteColor,
                  textTransform: "capitalize",
                  width: "50%",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default CustomModal;
