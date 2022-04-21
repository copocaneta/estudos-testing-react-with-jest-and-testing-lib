import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const totals = orderDetails.totals;
  const scoopsArray = Array.from(orderDetails.scoops, ([key, value]) => [key, value]);
  const toppingsArray = Array.from(orderDetails.toppings, ([key, value]) => [key, value]);
  return (
    <>
      <h1>Order Summary</h1>
      {scoopsArray.length > 0 ? (
        <>
          <h2>Scoops: {totals.scoops}</h2>
          <ul>
            {scoopsArray.map((item) => (
              <li key={item[0]}>
                {item[1]} {item[0]}
              </li>
            ))}
          </ul>
        </>
      ) : (
        ''
      )}

      {toppingsArray.length > 0 ? (
        <>
          <h2>Toppings: {totals.toppings}</h2>
          <ul>
            {toppingsArray.map((item) => (
              <li key={item[0]}>
                {item[1]} {item[0]}
              </li>
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
      <h2>Total: {totals.grandTotal}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
};

export default OrderSummary;
