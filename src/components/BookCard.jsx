import { Box, Button, Card, CardContent, IconButton, Grid, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
function BookCard({ index, book, handleDeleteBook, handleEditBook }) {
  const [hover, setHover] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDelete = () => {
    handleDeleteBook(book);
    setDeleteModalOpen(false);
  };
  const handleEdit = () => {
    handleEditBook(book);
  };
  return (
    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
      <Card raised
        sx={{ height: '100%', position: 'relative', borderRadius: "12px", p: 2, overflow: "visible" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover && (
          <Box sx={{ position: 'absolute', top: 0, right: -30, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 2, boxShadow: 1 }}>
            <IconButton onClick={() => setDeleteModalOpen(true)} color="error" >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
          </Box>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Publish Date / {book.publish_date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Last Version / {book.latest_revision}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Publishers / {book.publishers?.[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ISBN / {book.isbn_10?.[0]}
          </Typography>
          <Box sx={{ width: "full", display: "flex", justifyContent: "flex-end", position: 'absolute', bottom: 20, right: 20 }}>
            <Button variant="contained" color="secondary" sx={{ mt: 2, display: "flex", justifyContent: "flex-end", backgroundColor: book.status === "FINISHED" ? colorTheme.finishedColor : book.status === "READING" ? colorTheme.readingColor : colorTheme.newBtnColor, }}>
              {book.status === "FINISHED" ? book.status : book.status === "READING" ? book.status : "NEW"}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Box sx={style}>
          <Typography>Are you sure you want to delete <br /> {book.title} </Typography>
          <Button sx={{
            mt: 2, background: colorTheme.newBtnColor, color: colorTheme.whiteColor, mr: 1
            , '&:hover': {
              backgroundColor: colorTheme.whiteColor,
              color: colorTheme.newBtnColor,
            },
          }} onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button sx={{
            mt: 2, background: colorTheme.buttonBackgroundColor, color: colorTheme.whiteColor, '&:hover': {
              backgroundColor: colorTheme.whiteColor,
              color: colorTheme.buttonBackgroundColor,
            },
          }} onClick={handleDelete}>Yes</Button>
        </Box>
      </Modal>
    </Grid>
  )
}

export default BookCard