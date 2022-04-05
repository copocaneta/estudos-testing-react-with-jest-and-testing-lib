import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import axios from 'axios'
import ScoopOption from './ScoopOption'

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: habndle error response
      })
  }, [optionType])

  // TODO: Replace `null` with ToppingOption when it's available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null

  const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} image={item.imagePath} />)

  return <Row>{optionItems}</Row>
}
export default Options
