import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';
import { Axios } from '../../../core/axios.js';
import { AutoComplete } from './AutoComplete';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ModiMyFoodIngredients = (props) => {
  const [ingreName, setIngreName] = useState();
  const [modiPurchaseDate, setModiPurchaseDate] = useState('');
  const [modiExpirationDate, setModiExpirationDate] = useState('');

  const getIngreInfo = async () => {
    await Axios.get(`userIngredient/find/${props.ingre.userIngredientNo}`)
      .then((res) => {
        setIngreName(res.data.ingredientName);
        setModiPurchaseDate(res.data.purchaseDate);
        setModiExpirationDate(res.data.expirationDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function createData(name, expiration) {
    return { name, expiration };
  }

  const rows = [
    createData('신선식품(농수산물)', '7일 이내'),
    createData('장류(고추장,된장 등)', '18개월 이내'),
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f7c343',
      color: theme.palette.common.black,
      fontWeight: 'bold',
      fontFamily: 'GmarketSansBold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'GmarketSansMedium',
    },
  }));

  const BasicTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <StyledTableCell>식품</StyledTableCell>
              <StyledTableCell align="right">유통기한</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.expiration}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  useEffect(() => {
    getIngreInfo();
  }, []);

  useEffect(() => {
    props.setFoods({
      ...props.foods,
      purchaseDate: modiPurchaseDate,
      expirationDate: modiExpirationDate,
    });
  }, [modiPurchaseDate, modiExpirationDate]);
  return (
    <div className="applyForm">
      <div className="inputForm">
        <div>식재료 명</div>
        <div>
          {ingreName && (
            <AutoComplete
              foods={props.foods}
              setFoods={props.setFoods}
              ingreName={ingreName}
              setIngreName={setIngreName}
              header={props.header}
            />
          )}
        </div>
      </div>
      <div className="inputForm">
        <div>
          구매일자
          <CalendarMonthIcon />
          {modiPurchaseDate && (
            <Calendar setSelectedDate={setModiPurchaseDate} originalDate={modiPurchaseDate} />
          )}
        </div>
      </div>
      <div className="inputForm">
        <div>
          유통기한
          <CalendarMonthIcon />
          <a
            data-bs-toggle="collapse"
            href="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample">
            <HelpOutlineRoundedIcon />
          </a>
          <div className="collapse" id="collapseExample">
            <div className="p-3">
              <BasicTable />
            </div>
          </div>
          {modiExpirationDate && (
            <Calendar setSelectedDate={setModiExpirationDate} originalDate={modiExpirationDate} />
          )}
        </div>
      </div>
    </div>
  );
};
