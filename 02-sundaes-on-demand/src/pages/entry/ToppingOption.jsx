import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    const newToppingValue = event.target.checked ? 1 : 0;

    updateItemCount(name, newToppingValue);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
