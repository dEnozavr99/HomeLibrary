import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PrintIcon from '@mui/icons-material/Print';
import { Chip } from '@mui/material';

const FiltersList = ({
  authors,
  years,
  publishers,
  filter,
  setSelectedFilter
}) => {
  const [isAuthorsOpen, setIsAuthorsOpen] = React.useState(false);
  const [isYearOpen, setIsYearOpen] = React.useState(false);
  const [isPublisherOpen, setIsPublisherOpen] = React.useState(false);

  const handleAuthorsClick = () => {
    setIsAuthorsOpen(!isAuthorsOpen);
  };

  const handleYearClick = () => {
    setIsYearOpen(!isYearOpen);
  };

  const handlePublisherClick = () => {
    setIsPublisherOpen(!isPublisherOpen);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: "white" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Оберіть фільтр
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleAuthorsClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Автор" />
        {isAuthorsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isAuthorsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {authors.map((author) => (
            <ListItemButton sx={{ pl: 4 }} key={author}>
              <Chip label={author} onClick={() => {
                const filterStr = `author:${author}`
                setSelectedFilter(filter !== filterStr ? filterStr : null)
              }}/>
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handleYearClick}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Рік публікації" />
        {isYearOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isYearOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {years.map((year) => (
            <ListItemButton sx={{ pl: 4 }} key={year}>
              <Chip label={year} onClick={() => {
                const filterStr = `year:${year}`
                setSelectedFilter(filter !== filterStr ? filterStr : null)
              }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handlePublisherClick}>
        <ListItemIcon>
          <PrintIcon />
        </ListItemIcon>
        <ListItemText primary="Видавництво" />
        {isPublisherOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isPublisherOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {publishers.map((publisher) => (
            <ListItemButton sx={{ pl: 4 }} key={publisher}>
              <Chip label={publisher} onClick={() => {
                const filterStr = `publisher:${publisher}`
                setSelectedFilter(filter !== filterStr ? filterStr : null)
              }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default FiltersList;