import { render, screen, fireEvent } from '@testing-library/react'
import App, { replaceCamelCaseWithSpaces } from './App'

test('button has the correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to MidnightBlue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })

  // expect the background color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  // click button
  fireEvent.click(colorButton)

  // expect the background color to be MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })

  // expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  expect(colorButton).toBeEnabled()

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox disabled button on first click and enables on second click', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  // click on checkbox
  fireEvent.click(checkbox)
  // expect button to be disabled after click
  expect(colorButton).toBeDisabled()
  // click on checkbox again
  fireEvent.click(checkbox)
  // expect button to be enabled now
  expect(colorButton).toBeEnabled()
})

test('button turns gray when disabled', () => {
  render(<App />)
  // arrange
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  // action
  // click on checkbox to disable button
  fireEvent.click(checkbox)
  // assert
  // check if button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  // action
  // click on checkbox to enable button
  fireEvent.click(checkbox)
  // assert
  // check if button is MediumVioletRed again
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})

test('clicked disabled button has gray background and reverts to Midnight Blue', () => {
  render(<App />)
  // arrange
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  // action
  // click button to change color (to MidnightBlue)
  fireEvent.click(colorButton)
  // action
  // disable button
  fireEvent.click(checkbox)
  // assertion
  // button is gray
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  // action
  // enable button
  fireEvent.click(checkbox)
  // assertion
  // button is MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
