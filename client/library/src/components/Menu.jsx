import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LogoImg from "../img/logo192.png"
import FiltersList from './FiltersList';
import Button from '@mui/material/Button';

const Container = styled.div`
  flex: 1;
  height: 100vh;
  font-size: 18px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`

const Img = styled.img`
  height: 25px;
`

const FiltersWrapper = styled.div`
  background-color: #202020;
`

const Menu = ({
  books,
  filter,
  setSelectedFilter,
  handleAddBook
}) => {
  const [authors, setAuthors] = useState([]);
  const [years, setYears] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const authorsRaw = books.map((book) => book.author);
    setAuthors([...new Set(authorsRaw)]);

    const yearsRaw = books.map((book) => book.year);
    setYears([...new Set(yearsRaw)]);

    const publishersRaw = books.map((book) => book.publisher);
    setPublishers([...new Set(publishersRaw)]);
  }, [books]);

  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={LogoImg} />
            Моя бібліотека
        </Logo>
        <Button variant='outlined' onClick={handleAddBook}>
          Додати книгу
        </Button>
        <FiltersWrapper>
          <FiltersList
            authors={authors}
            years={years}
            publishers={publishers}
            filter={filter}
            setSelectedFilter={setSelectedFilter}
          />
        </FiltersWrapper>
      </Wrapper>
    </Container>
  )
}

export default Menu;