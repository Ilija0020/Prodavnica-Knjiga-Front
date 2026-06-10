import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

export default function TablePaginationActions(props) {
  const theme = useTheme();
  const { page, onPageChange, hasNextPage, hasPreviousPage } = props;

  const handleBack = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNext = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <>
      <IconButton onClick={handleBack} disabled={!hasPreviousPage}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <IconButton onClick={handleNext} disabled={!hasNextPage}>
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </>
  );
}
