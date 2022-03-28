import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('button has the correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

  // click button
  fireEvent.click(colorButton)

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })

  // expect the button text to be 'Change to red'
  expect(colorButton).toHaveTextContent('Change to red')
})

test('initial conditions', () => {
  render(<App />)
  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toBeEnabled()

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox disabled button on first click and enables on second click', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
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
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
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
  // check if button is red again
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })
})

test('clicked disabled button has gray background and reverts to blue', () => {
  render(<App />)
  // arrange
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  // action
  // click button to change color (to blue)
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
  // button is blue
  console.log(colorButton.style)
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
})
