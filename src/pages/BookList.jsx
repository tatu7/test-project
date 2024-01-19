import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar';
import CustomModal from '../components/CustomModal';
import BookCard from '../components/BookCard';
import colorTheme from '../utils/theme';
const BookList = () => {
  const [books, setBooks] = useState([
  ]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleDeleteBook = (bookToDelete) => {
    const updatedBooks = books.filter((book) => book.id !== bookToDelete.id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    handleDelete('Book deleted successfully!')
  };
  const handleEditBook = () => {
  };
  const handleSearch = (query) => {
    console.log({ query });
    if (query) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(storedBooks);
    setFilteredBooks(storedBooks);
  }, []);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreate = () => {
    setSnackbarMessage('Book created successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };
  const handleDelete = (txt) => {
    setSnackbarMessage(`${txt}`);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
          }}
        >
          <Box sx={{ my: 4, position: "relative", zIndex: 9, color: "#fff" }}>
            <Typography variant="h4" component="h1" gutterBottom >
              You've got {books.length} book{books.length !== 1 && 's'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Your books today
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleOpen}
            sx={{
              backgroundColor: colorTheme.buttonBackgroundColor,
              '&:hover': {
                backgroundColor: colorTheme.whiteColor,
                color: colorTheme.buttonBackgroundColor
              },
              textTransform: "capitalize"
            }}
          >
            <AddIcon sx={{ marginRight: "8px" }} />
            Create a book
          </Button>
        </Box>
        <Grid container spacing={6} justifyContent="center">
          {filteredBooks.map((book, index) => (
            <BookCard book={book} key={book.id} index={index} handleDeleteBook={handleDeleteBook}
              handleEditBook={handleEditBook} />
          ))}
        </Grid>

      </Container>
      {open && <CustomModal open={open} setOpen={setOpen} books={books} setBooks={setBooks} handleCreate={handleCreate} handleDelete={handleDelete} />}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BookList;
