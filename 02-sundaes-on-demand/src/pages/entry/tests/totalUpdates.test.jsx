import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);
  // make sure total start out at $0.00
  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubTotal).toHaveTextContent('2.00');
  // update the chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubTotal).toHaveTextContent('6.0');
});

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });
  // aseert on default toppings subtotal:
  expect(toppingsSubTotal).toHaveTextContent('0.00');
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /Cherries/i });
  userEvent.click(cherriesCheckbox);
  // assert on updated subtotal:
  expect(toppingsSubTotal).toHaveTextContent('1.50');
  // tick another box
  const mmsCheckbox = await screen.findByRole('checkbox', { name: /m&ms/i });
  userEvent.click(mmsCheckbox);
  // assert on new subtotal:
  expect(toppingsSubTotal).toHaveTextContent('3.00');
  // tick one of the boxed off
  userEvent.click(mmsCheckbox);
  // assert on new subtotal:
  expect(toppingsSubTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total updates properly if we add the scoops first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /^grand total/i });
    const scoopVanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const scoopChocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    const toppingCherriesCheckbox = await screen.findByRole('checkbox', { name: /Cherries/i });
    // check that the grant total start out at 0
    expect(grandTotal).toHaveTextContent('0.00');
    userEvent.clear(scoopVanillaInput);
    userEvent.type(scoopVanillaInput, '1');
    userEvent.clear(scoopChocolateInput);
    userEvent.type(scoopChocolateInput, '1');
    userEvent.click(toppingCherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if we add toppings first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /^grand total/i });
    const scoopVanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const toppingCherriesCheckbox = await screen.findByRole('checkbox', { name: /Cherries/i });
    userEvent.click(toppingCherriesCheckbox);
    userEvent.clear(scoopVanillaInput);
    userEvent.type(scoopVanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /^grand total/i });
    const scoopVanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const toppingCherriesCheckbox = await screen.findByRole('checkbox', { name: /Cherries/i });
    userEvent.click(toppingCherriesCheckbox);
    userEvent.type(scoopVanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
    userEvent.click(toppingCherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
