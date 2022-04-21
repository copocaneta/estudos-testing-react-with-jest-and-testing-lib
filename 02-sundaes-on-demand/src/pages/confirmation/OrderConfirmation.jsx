import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderDetails, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`, '')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newOrderFunc = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        {orderNumber === null ? (
          'Loading'
        ) : (
          <Col>
            <h1>Thank you!</h1>
            <h2>Your order number is {orderNumber}</h2>
            <p>as per our terms and conditions, nothing will happen now</p>
            <Button type="button" variant="primary" onClick={() => newOrderFunc()}>
              Create new order
            </Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default OrderConfirmation;
