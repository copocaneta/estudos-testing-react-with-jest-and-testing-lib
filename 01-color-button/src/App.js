import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

export function replaceCamelCaseWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [buttonColor, setButtonColor] = useState('red')
  const [disabled, setDisabled] = useState(false)

  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red'

  return (
    <div>
      <button
        style={{ backgroundColor: disabled ? 'gray' : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        onChange={(e) => setDisabled(e.target.checked)}
        aria-checked={disabled}
        id="disabled-button-checkbox"
      />
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </div>
  )
}

export default App
