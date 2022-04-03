import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

test('ensure that checkbox is unchecked by default', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  expect(checkbox).not.toBeChecked()
})

test('ensure submit button starts disabled', () => {
  render(<SummaryForm />)
  const submitButton = screen.getByRole('button', { name: 'Confirm Order' })
  expect(submitButton).toBeDisabled()
})

test('ensure that checkbox enables and disables button', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })
  const submitButton = screen.getByRole('button', { name: 'Confirm Order' })
  fireEvent.click(checkbox)
  expect(submitButton).toBeEnabled()
  fireEvent.click(checkbox)
  expect(submitButton).toBeDisabled()
})
