import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');
  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      // @ts-ignore
      Component = OrderSummary;
      break;
    case 'complete':
      Component = OrderConfirmation;
    default:
    // Component = OrderEntry;
    // break;
  }
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider */}
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider  */}
    </Container>
  );
}

export default App;
