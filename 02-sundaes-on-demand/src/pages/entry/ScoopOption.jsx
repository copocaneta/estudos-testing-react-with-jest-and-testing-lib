import React from 'react';
import { Col } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control type="number" defaultValue={0} onChange={handleChange} />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
