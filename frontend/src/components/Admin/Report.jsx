import { useEffect } from 'react';
import { Axios } from '../../core/axios';
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
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import dayjs from 'dayjs';

import './Report.scss';
import admin_empty from '../../assets/images/admin_empty.gif';

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

export const Report = () => {
  const token = sessionStorage.getItem('jwt-token');
  const header = { headers: { 'Content-Type': 'multipart/form-data' } };
  const [rows, setRows] = React.useState([]);

  const [change, setChange] = React.useState(true);

  useEffect(() => {
    Axios.get('/admin/findAll/userReportHistory')
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => console.log(err));
  }, [change]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprove = (event) => {
    Axios.put('/admin/update/userReportHistoryStatus', {
      reportNo: event.reportNo,
      reported: event.reported,
      result: '승인',
    })
      .then((res) => {
        // console.log(res);
        setChange(!change);
      })
      .then((err) => console.log(err));
  };

  const handleReject = (event) => {
    Axios.put('/admin/update/userReportHistoryStatus', {
      reportNo: event.reportNo,
      reported: event.reported,
      result: '거절',
    })
      .then((res) => {
        // console.log(res);
        setChange(!change);
      })
      .then((err) => console.log(err));
  };

  const handleDelete = (event) => {
    Axios.delete(`/userReportHistory/remove/${event.reportNo}`)
      .then((res) => {
        // console.log(res);
        setChange(!change);
      })
      .then((err) => console.log(err));
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
              <TableCell
                key={column.id}
                align={column.align}
                style={{ fontFamily: 'GmarketSansBold' }}>
                {column.format ? column.format(value) : value}
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '4%' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 3, fontFamily: 'GmarketSansBold' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  style={{ fontFamily: 'GmarketSansBold' }}>
                  신고 이유
                </Typography>
                <textarea
                  style={{ width: '100%', height: '8.25em', border: 'none', resize: 'none' }}
                  defaultValue={row.content}></textarea>
                {row.status === null ? (
                  <div style={{ float: 'right', margin: '3% 0' }}>
                    <button className="reportApproveBtn" onClick={() => handleApprove(row)}>
                      승인
                    </button>
                    <button className="reportRejectBtn" onClick={() => handleReject(row)}>
                      거절
                    </button>
                  </div>
                ) : (
                  <div style={{ float: 'right', margin: '3% 0' }}>
                    <button className="reportRejectBtn" onClick={() => handleDelete(row)}>
                      삭제
                    </button>
                  </div>
                )}
                <div style={{ marginTop: '5%' }}>
                  <WarningAmberRoundedIcon style={{ color: 'red' }} />
                  {row.reported}님의 신고 누적 횟수: {row.reportedNumber}
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      {rows.length !== 0 ? (
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            marginTop: '5%',
            marginBottom: '7%',
          }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '20px' }}></TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        fontFamily: 'GmarketSansBold',
                      }}>
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
          <div style={{ textAlign: 'center', marginBottom: '7%' }}>
            <img src={admin_empty} alt="empty"></img>
            <h6>신고내역이 없습니다.</h6>
          </div>
        </>
      )}
    </>
  );
};
