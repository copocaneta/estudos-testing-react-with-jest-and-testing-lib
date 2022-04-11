import React from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

// @ts-ignore
const OrderDetails = createContext();

// create custom hook to check if we are inside of a provider

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('userOrderDetails must be used withn an OrderDetailsProvider');
  }
  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      setOptionCounts((prevState) => {
        // get option Map and make a copy
        // @ts-ignore
        const { [optionType]: optionMap } = prevState;
        const newOptionMap = new Map(optionMap);

        // update the copied Map
        newOptionMap.set(itemName, parseInt(newItemCount));

        // create new object with the old optionCounts plus new map
        const newOptionCounts = { ...prevState };
        newOptionCounts[optionType] = newOptionMap;

        return newOptionCounts;
      });
    }
    // getter: object containing option counts for scoops and toppings and subtotals and totals
    // setter: updateOptionCounts
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
};
