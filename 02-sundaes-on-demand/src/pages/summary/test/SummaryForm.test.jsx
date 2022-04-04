import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

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
  userEvent.click(checkbox)
  expect(submitButton).toBeEnabled()
  userEvent.click(checkbox)
  expect(submitButton).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)
  // popover starts hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()
  // popover appears up mouseouver of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  //
  // no need to for the assesrtion below
  expect(popover).toBeInTheDocument()
  // because if screen.getByText doesn't get any results back, it's going to 'throw' and then fail the test
  // but it's best practice to include it anyway, because it makes the test more readable
  //
  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions)
  let nullPopoverAgain
  await waitForElementToBeRemoved(
    () => (nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i))
  )
  expect(nullPopoverAgain).not.toBeInTheDocument()
})
