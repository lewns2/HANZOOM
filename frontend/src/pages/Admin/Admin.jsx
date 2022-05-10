import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Report } from '../../components/Admin/Report';

export const Admin = () => {
  return (
    <>
      <Row>
        <Col md="6">
          <Report />
        </Col>
        <Col md="6"></Col>
      </Row>
    </>
  );
};
