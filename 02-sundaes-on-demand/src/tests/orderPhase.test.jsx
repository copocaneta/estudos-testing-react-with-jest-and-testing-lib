import { screen, render } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import App from '../App';

// eslint-disable-next-line max-lines-per-function
test('order phases for happy path', async () => {
  // render the app
  render(<App />);
  // add icecream scoops and toppings
  const scoopVanillaInput = await screen.findByRole('spinbutton', { name: /Vanilla/i });
  const toppingCherriesCheckbox = await screen.findByRole('checkbox', { name: /Cherries/i });
  userEvent.clear(scoopVanillaInput);
  userEvent.type(scoopVanillaInput, '1');
  userEvent.click(toppingCherriesCheckbox);
  // find and click order button
  const orderButton = screen.getByRole('button', { name: /Order Sundae!/i });
  userEvent.click(orderButton);
  // check summary information based on order
  const scoopsSummary = screen.getByText('Scoops', { exact: false });
  const scoopsListItem = screen.getByText(/1 Vanilla/i);
  const toppingsSummary = screen.getByText('Toppings', { exact: false });
  const toppingsListItem = screen.getByText(/Cherries/i);
  const orderTotal = screen.getByText('Total', { exact: false });
  expect(toppingsListItem).toBeInTheDocument();
  expect(scoopsListItem).toBeInTheDocument();
  expect(scoopsSummary).toHaveTextContent('Scoops: $2.00');
  expect(toppingsSummary).toHaveTextContent('Toppings: $1.50');
  expect(orderTotal).toHaveTextContent('Total: $3.50');
  // accept terms and conditions and click the button to confirm order
  const termsCondCheckbox = screen.getByRole('checkbox');
  const confirmOrder = screen.getByRole('button', { name: /Confirm order/i });
  userEvent.click(termsCondCheckbox);
  userEvent.click(confirmOrder);
  // check if loading appears in the confirmation page
  const loadingElement = screen.getByText('Loading');
  expect(loadingElement).toBeInTheDocument();
  // check if after 'loading' text appears it disapears
  const thankyouElement = await screen.findByText('Thank you', { exact: false });
  expect(thankyouElement).toBeInTheDocument();
  const notLoadingElement = screen.queryByText('Loading');
  expect(notLoadingElement).not.toBeInTheDocument();
  // confirm order number on confirmation page
  const orderNumber = await screen.findByText('Your order number', { exact: false });
  expect(orderNumber).toBeInTheDocument();
  // click the "new order" button on confirmation page
  const newOrder = screen.getByRole('button', { name: /Create new order/i });
  userEvent.click(newOrder);
  // check that scoops and toppings have been reset
  const scoopsTotal = await screen.findByText('Scoops total:', { exact: false });
  const toppingsTotal = await screen.findByText('Toppings total:', { exact: false });
  expect(scoopsTotal).toHaveTextContent(/0.00/);
  expect(toppingsTotal).toHaveTextContent(/0.00/);
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
  // do we need to await anything to avoid test errors?
});
