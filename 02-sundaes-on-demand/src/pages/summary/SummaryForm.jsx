import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

//   const Example = () => (
//     <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//       <Button variant="success">Click me to see</Button>
//     </OverlayTrigger>
//   );

//   render(<Example />);

const SummaryForm = ({ setOrderPhase }) => {
  const [buttonDisable, setButtonDisable] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Group>
            <Form.Check id="terms-checkbox" type="checkbox" onChange={(e) => setButtonDisable(e.target.checked)} />
            <Form.Label htmlFor="terms-checkbox">
              I agree to
              <OverlayTrigger placement="right" overlay={popover}>
                <Button variant="success">Terms and Conditions</Button>
              </OverlayTrigger>
            </Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!buttonDisable} onClick={() => setOrderPhase('complete')}>
            Confirm Order
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default SummaryForm;
