import { useEffect, useState } from 'react';
import { Axios, axios_apis } from '../../core/axios';
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

import './PendingIngredient.scss';
import admin_empty from '../../assets/images/admin_empty.gif';

import axios from 'axios';

import firebase from '../../firebaseInit';

const columns = [
  { id: 'ingredientName', label: '식재료명', align: 'center', minWidth: 170, maxWidth: 200 },
  { id: 'requestor', label: '요청자', align: 'center', minWidth: 170, maxWidth: 200 },
  {
    id: 'status',
    label: '상태',
    align: 'center',
    minWidth: 150,
    maxWidth: 200,
  },
];

export const PendingIngredient = () => {
  const token = sessionStorage.getItem('jwt-token');
  const header = { headers: { 'Content-Type': 'multipart/form-data' } };
  const [rows, setRows] = React.useState([]);

  const [change, setChange] = React.useState(true);

  useEffect(() => {
    Axios.get('/admin/findAll/pendingIngredient')
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
    Axios.put('/admin/update/userIngredientStatus', {
      requestNo: event.requestNo,
      result: '승인',
    })
      .then((res) => {
        // console.log(res);
        setChange(!change);
      })
      .then((err) => console.log(err));
  };

  const handleReject = (event) => {
    Axios.put('/admin/update/userIngredientStatus', {
      requestNo: event.requestNo,
      result: '거절',
    })
      .then((res) => {
        // console.log(res);
        setChange(!change);
      })
      .then((err) => console.log(err));
  };

  // firebase database
  const userRef = firebase.database().ref('pendingIngredients');

  const onClickAdd = (event, result, reason) => {
    const ingredient = event.ingredientName;
    const requestor = event.requestor;
    const pendingIngredient = { requestor, ingredient, reason, result };

    userRef.push(pendingIngredient);
  };

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [pendingReason, setPendingReason] = useState('');

    const handlePendingReason = (e) => {
      setPendingReason(e.target.value);
    };

    const sendAlarm = (event, result) => {
      if (event.browserToken === null || event.browserToken === '') return;

      onClickAdd(event, result, pendingReason);

      const header = {
        headers: {
          Authorization:
            'bearer AAAA7e9xyD4:APA91bEPAokzHd9yaULDhqEUPy6WJ6wDWaqmmNYfGja87GQbwZYo-bgZSDIy_bLXfzJgwNHPXd00OpxzJ_qdTbNwiJvrFqPjEF9Tr2d2ZuREGUzoPoR29JbGqK1aeOBrXYQKerGqNHqO ',
          'Content-Type': 'application/json',
        },
      };

      const message = {
        notification: {
          title: '한줌(HANZOOM)',
          body: `${event.ingredientName}건에 대해 '${pendingReason}' 의 이유로 식재료 등록 요청이 ${result}되었습니다.`,
        },
        to: event.browserToken,
      };
      axios
        .post('https://fcm.googleapis.com/fcm/send', message, header)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    const handleApproveStep = (event) => {
      sendAlarm(event, '승인');
      handleApprove(event);
    };

    const handleRejectStep = (event) => {
      sendAlarm(event, '거절');
      handleReject(event);
    };

    return (
      <React.Fragment>
        <TableRow hover role="checkbox" tabIndex={-1} key={row.requestNo}>
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
                style={{ fontFamily: 'GmarketSansMedium' }}>
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
                  이유
                </Typography>
                <textarea
                  style={{
                    width: '100%',
                    height: '8.25em',
                    border: '2px solid #777',
                    resize: 'none',
                    fontFamily: 'GmarketSansMedium',
                    borderRadius: '5px',
                  }}
                  placeholder="유저에게 보낼 승인/거절 이유를 작성해주세요."
                  onChange={handlePendingReason}></textarea>
                <div style={{ float: 'right', margin: '3% 5%' }}>
                  <button className="pendingApproveBtn" onClick={() => handleApproveStep(row)}>
                    승인
                  </button>
                  <button className="pendingRejectBtn" onClick={() => handleRejectStep(row)}>
                    거절
                  </button>
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
            marginBottom: '15%',
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
                  return <Row key={row.requestNo} row={row} />;
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
          <div style={{ textAlign: 'center', marginBottom: '15%' }}>
            <img src={admin_empty} alt="empty"></img>
            <h6>식재료 등록 요청이 없습니다.</h6>
          </div>
        </>
      )}
    </>
  );
};
