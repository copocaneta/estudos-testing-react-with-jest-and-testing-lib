import { render, screen } from '../../../test-utils/testing-library-utils';
import React from 'react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

test('displays image for each scoop option from the server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  // regex below is for the alt image to END with the word 'scoop':
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each toppings option from the server', async () => {
  render(<Options optionType="toppings" />);
  // find images
  const toppingsImage = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingsImage).toHaveLength(3);

  // confirm alt text of images
  // @ts-ignore
  const altText = toppingsImage.map((element) => element.alt);
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping']);
});
