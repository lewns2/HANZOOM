import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';
import { Axios } from '../../../core/axios.js';
import { AutoComplete } from './AutoComplete';

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
  const [purchaseDate, setPurchaseDate] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [modiPurchaseDate, setModiPurchaseDate] = useState();
  const [modiExpirationDate, setModiExpirationDate] = useState();

  const getIngreInfo = async () => {
    await Axios.get(`userIngredient/find/${props.ingre.userIngredientNo}`)
      .then((res) => {
        setIngreName(res.data.ingredientName);
        if (res.data.purchaseDate) {
          setModiPurchaseDate(res.data.purchaseDate);
        } else {
          setPurchaseDate(res.data.purchaseDate);
        }

        if (res.data.expirationDate) {
          setModiExpirationDate(res.data.expirationDate);
        } else {
          setExpirationDate(res.data.expirationDate);
        }
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
    if (modiExpirationDate) {
      var finalExpirationDate = modiExpirationDate;
    } else if (expirationDate) {
      finalExpirationDate = expirationDate;
    }
    if (modiPurchaseDate) {
      var finalPurchaseDate = modiPurchaseDate;
    } else if (purchaseDate) {
      finalPurchaseDate = purchaseDate;
    }
    props.setFoods({
      ingredient: ingreName,
      purchaseDate: finalExpirationDate,
      expirationDate: finalPurchaseDate,
    });
  }, [modiPurchaseDate, modiExpirationDate, purchaseDate, expirationDate]);

  return (
    <div className="applyForm">
      <div className="inputForm">
        <div>식재료 명</div>
        <>
          {ingreName && (
            <AutoComplete
              foods={props.foods}
              setFoods={props.setFoods}
              ingreName={ingreName}
              header={props.header}
            />
          )}
        </>
      </div>
      <div className="inputForm">
        <div>
          구매일자
          {!modiPurchaseDate && <Calendar setSelectedDate={setPurchaseDate} />}
          {modiPurchaseDate && (
            <Calendar setSelectedDate={setModiPurchaseDate} originalDate={modiPurchaseDate} />
          )}
        </div>
      </div>
      <div className="inputForm">
        <div>
          유통기한
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
          {!modiExpirationDate && <Calendar setSelectedDate={setExpirationDate} />}
          {modiExpirationDate && (
            <Calendar setSelectedDate={setModiExpirationDate} originalDate={modiExpirationDate} />
          )}
        </div>
      </div>
    </div>
  );
};
