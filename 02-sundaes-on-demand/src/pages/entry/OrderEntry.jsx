import React from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button type="button" variant={'primary'} onClick={() => setOrderPhase('review')}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
