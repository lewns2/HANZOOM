import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';

const columns = [
  { id: 'reporter', label: '신고자', minWidth: 170, maxWidth: 200 },
  { id: 'reported', label: '피신고자', minWidth: 170, maxWidth: 200 },
  {
    id: 'createdAt',
    label: '신고날짜',
    minWidth: 170,
    maxWidth: 200,
    align: 'center',
    format: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    id: 'status',
    label: '상태',
    align: 'center',
    minWidth: 100,
    maxWidth: 200,
  },
];

const handleApprove = (event) => {
  console.log(event);
};

const handleReject = (event) => {
  console.log(event);
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.reportNo}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format ? column.format(value) : value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '7%' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Typography variant="h6" gutterBottom component="div">
                내용
              </Typography>
              <textarea
                style={{ width: '100%', height: '9.25em', border: 'none', resize: 'none' }}
                defaultValue={row.content}></textarea>
              <div style={{ float: 'right', margin: '3% 0' }}>
                <button onClick={() => handleApprove(row.reportNo)}>승인</button>
                <button onClick={() => handleReject(row.reportNo)}>거절</button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const Report = () => {
  const token = sessionStorage.getItem('jwt-token');
  const header = { headers: { 'Content-Type': 'multipart/form-data' } };
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    Axios.get('userReportHistory/findAll')
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {rows.length !== 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ maxWidth: '20' }}></TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return <Row key={row.reportNo} row={row} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <>
          <h1>신고내역이 없다</h1>
        </>
      )}
    </>
  );
};
