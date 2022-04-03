import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SummaryForm = () => {
  const [buttonDisable, setButtonDisable] = useState(false)
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Group>
            <Form.Check id="terms-checkbox" type="checkbox" onChange={(e) => setButtonDisable(e.target.checked)} />
            <Form.Label htmlFor="terms-checkbox">I agree to Terms and Conditions</Form.Label>
          </Form.Group>
          <Button variant="primary" type="Submit" disabled={!buttonDisable}>
            Confirm Order
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default SummaryForm
