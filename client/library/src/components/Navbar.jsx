import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 25px;
`

const Navbar = ({ sorter, setSelectedSorter }) => {
  const handleClick = (event) => {
    event.preventDefault();

    const [prevSorter] = sorter ? sorter?.split(":") : []
    const sorterStr = `${event.target.name}:${prevSorter ? '1' : '-1' }`

    setSelectedSorter(sorter !== sorterStr ? sorterStr : null)
  }

  return (
    <Container role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          name="title"
        >
          Назва
        </Link>
        <Link
          underline="hover"
          color="inherit"
          name="author"
        >
          Автор
        </Link>
        <Link
          underline="hover"
          color="inherit"
          name="year"
        >
          Рік
        </Link>
        <Link
          underline="hover"
          color="inherit"
          name="publisher"
        >
          Видавництво
        </Link>
        <Link
          underline="hover"
          color="inherit"
          name="pages"
        >
          К-ть сторінок
        </Link>
      </Breadcrumbs>
    </Container>
  );
}

export default Navbar