import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Report } from '../../components/Admin/Report';

export const Admin = () => {
  return (
    <>
      <Container>
        <Report />
      </Container>
    </>
  );
};
