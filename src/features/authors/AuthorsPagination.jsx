import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, Box } from "@mui/material";
import AuthorService from "./services/AuthorService";
import TablePaginationActions from "../../core/components/TablePaginationActions";

const AuthorsPagination = () => {
    const [page, setPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [authors, setAuthors] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    
    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await AuthorService.getAuthorsPage(page + 1);
                setAuthors(data.items);
                setTotalItems(data.count);
                setHasNextPage(data.hasNextPage);
                setHasPreviousPage(data.hasPreviousPage);
            } catch (err) {
                console.error(err.message);
            }
        };
    
        loadAuthors();
    }, [page]);

    const renderAuthors = () => {
        return authors.map((author) => (
            <TableRow hover key={author.id}>
              <TableCell>{author.fullName}</TableCell>
              <TableCell>{author.biography}</TableCell>
              <TableCell>{new Date(author.dateOfBirth).toLocaleDateString()}</TableCell>
            </TableRow>
          ))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>Authors</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="authors table">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><strong>Full Name</strong></TableCell>
                            <TableCell><strong>Biography</strong></TableCell>
                            <TableCell><strong>Date of Birth</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { renderAuthors() }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={3}
                                count={totalItems}
                                rowsPerPage={10}
                                page={page}
                                rowsPerPageOptions={[]}
                                onRowsPerPageChange={() => {}} 
                                onPageChange={handleChangePage}
                                ActionsComponent={(subprops) => (
                                    <TablePaginationActions
                                      {...subprops}
                                      hasNextPage={hasNextPage}
                                      hasPreviousPage={hasPreviousPage}
                                    />
                                  )}
                                />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AuthorsPagination;
