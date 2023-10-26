import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const BookCard = ({ book, deleteBook, editBook }) => {

  const handleDeleteClick = () => {
    deleteBook(book._id)
  };

  const handleEditClick = () => {
    editBook(book);
  };

  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component="img"
        loading='lazy'
        height="354"
        image={book.image}
        alt={book.title}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {book.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {`Автор: ${book.author}`}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          {`Рік випуску: ${book.year}`}
        </Typography>
        <br/>
        <Typography variant="caption" color="text.secondary">
          {`Сторінок: ${book.pages}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Delete book" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="Edit book" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default BookCard;