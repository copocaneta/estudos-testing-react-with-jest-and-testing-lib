# Intro

- strong philosophy
- it is opinionated
  - encourages a certain set of practices
  - test your software the way users actually use it.
  - not internal implementation (not how your software is writen)
  - we worry about the way the software works the way it is supposed to do
- **find elements by accessibility markers, not test IDs.**
- more philosophy later

---

## Roles: React Testing Library vs JEST

### React Testing library

- Provides virtual DOM for tests

### Jest

- Tes runner that
  - Find tests
  - run tests
  - determines whether tests pass or fail

---

## Let's create the first test

- So we will run:

  ```npm
  npx create-react-app color-button
  ```

- We run `npm test` and we enter in watch mode.

- `create-react-app` comes with a pre built test that already passes, it's this:

  ```js
  import { render, screen } from '@testing-library/react'
  import App from './App'

  test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })
  ```

- `render`:

  - creates virtual DOM for argument JSX
  - access virtual DOM via `screen` global

- `screen.getByText()`:

  - find an element in the DOM by display text
  - `/learn react/i`:
    - regex
    - case insensitive (`i`)
    - could be the string `'Learn React'`

- `expect().toBeInTheDocument()`

  - assertion, casus test to succeed or fail

- We can update the test to make it fail:

  ```js
  import { render, screen } from '@testing-library/react'
  import App from './App'

  test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn testing library/i)
    expect(linkElement).toBeInTheDocument()
  })
  ```

- And since this doesn't exist in our component the test will fail:

  - `Unable to find an element with the text: Learn we.`

---

## Assertion

- `expect(linkElement).toBeInTheDocument()`

  - `expect` argument
    - subject of the assertion
  - `.toBeInTheDocument()`
    - `matcher`
      - comes from the Jest-DOM

- More assertion examples:
- `expect(element.textContent).toBe('hello')`
- `expect(elementsArray).toHaveLength(7)`

- jest-dom:
  - comes with create-react-app
  - `.toBe()` and `.toHaveLength()` are not from jest-dom, they are very general and can be applied to any _node_ code.
  - DOM-based matchers
    - examples: `toBeVisible()` or `toBeChcked()`, more to come.

---

## Jest

- React Testing Library heps with:

  - rendering components into Virtual DOM
  - searching with vrtual DOM
  - interacting with virtual DOM

- Needs a test runner

  - that's where Jest comes in
  - find tests, run them, makes assertions

- Jest

  - is reocommended by Testing Library
  - comes with `crate-react-app`

- `npm test` runs an npm script that runs Jest in watch mode.
  - watch for changes since last commit
  - only run tests realted to these files
  - no changes? no tests
    - type `a` to run all tests

---

## TDD

- write tests before writing code
  - then we write code according to spec set by tests.
- red-green testing

  - we weant the test to fail before code is written

- Why TDD?
  - makes a huge difference in hot it feels to write tests
    - part of the coding process, not a 'chore' to do at the end
  - more efficient
    - re-run tests "for free" after changes

---

## React Testing Library Philosophy

- drives us towwards best practices

#### What does React Testing Library do?

- creates a viertual DOM for testing
  - utilities for interacting with DOM
- allows testing without a browser

- Types of Tests:
  - Unit tests
    - tests one unit of code in isolation (funciton or react component)
  - Integration tests
    - how multiple units work together
  - Functional tests (general behavior of the software)
    - tests a particular function of software
      -react testing library encourages functional (behavior) tests
  - Acceptance / end-to-end (e2e) Tests
    - use actual browser and server (cypress, selenium)

---

## Funcional testing vs Unit testing

- Unit testing
  - isolated: mock dependencies, test internals
  - ⭐️ very easy to pinpoint failures
  - 👎 further from how users interact with software
  - 👎 more likely to break with refactoring
- Functional testing

  - include all relevant units, test behavior
  - ⭐️ close to how users interact with software
  - ⭐️ Robust tests
  - 👎 more difficult to debug failing tests

- React testing libraries believes that the advantages of Functional Testing outweighs the disavantages of Unit Testing.

---

## TDD vs BDD

- testing library encourages tesing the way users actually uses the app
- so shouldnt be calling this BDD instead of TDD?
- BDD is very explicitly defined:
  - involves collaboraiton between lots of roles
    - developers, QA, businessa partners
  - defines a process for different groups to interact
- In this course, only developers, so TDD!

---

## Accessbility and finding elements with React Testing Library

- Testing Library recommends finding elements by acessbility handles (W3C)
  - [https://testing-library.com/docs/guide-which-query/](https://testing-library.com/docs/guide-which-query/)
- create-react-app's example test uses `getByTest`:

  - ok for non-interactive elements
  - better: `getByRole()` (see link above)
  - So we could rewrite it like this:

    ```js
    import { render, screen } from '@testing-library/react'
    import App from './App'

    test('renders learn react link', () => {
      render(<App />)
      const linkElement = screen.getByRole('link', { name: /learn react/i })
      expect(linkElement).toBeInTheDocument()
    })
    ```

  - Roles documentation: [https://www.w3.org/TR/wai-aria/#role_definitions](https://www.w3.org/TR/wai-aria/#role_definitions)
    - some elements have built-in roles: `button`, `a` (`link`)
  - Can't find an element like a screen reader would?
    - Then your app isn't friendly to screen readers.
  - jest-dom documentation: [https://github.com/testing-library/jest-dom](https://github.com/testing-library/jest-dom)
  - Much more about queries and roles later!

---

## General Course Plan

- Start with very simple React
  - This is so we can focus on Testing Library syntax
- **First app**: not much of an app
  - chaning button color, disabling button with checkbox
  - introduce: testing interactions that affect the DOM, unit testing funtions
- Builid up to more complex functionality and tests
- **Second App**: design and order an ice-cream sundae
  - testing more complex user interacitons, interactions between components
  - mocking server responses with _Mock Service Worker_
  - testing `async` functionality

### A note about React explanations

- Folks come to this course at many levels
- Optional lectures explaining React Syntax and descions

---

## Testing styles from imported CSS modules

- Testing Styles from Imported CSS Modules
- A common question about testing styles is "why doesn't .toHaveStyle() work with classes from my imported CSS module?"

### Mocking CSS modules

- In the case of create-react-app applications -- or applications that have otherwise mocked css modules for Jest -- CSS module imports are simply ignored for Jest test.

### Cosmetic Styles vs. Functional Styles

- In many cases, the classes are merely cosmetic and won't affect functional tests (such as placement of the element on the page). In these cases, mocking the CSS modules works fine. However, sometimes classes do affect function. For example, say you have a CSS module that uses a hidden class, which results in display: none when interpreted. Without adding a Jest transformer to interpret the CSS, Testing Library will not know that hidden class would result in display: none. Tests around element visibility that rely on this class will fail.

### Transformers

- For styles to be interpreted in tests, you need a transformer to, well, transform the CSS classes into styles. Here are a couple options:

[https://www.npmjs.com/package/jest-transform-css](https://www.npmjs.com/package/jest-transform-css)

[https://www.npmjs.com/package/jest-css-modules-transform]()https://www.npmjs.com/package/jest-css-modules-transform

- The latter has more downloads per week, but the former seems to be more actively maintained.

### Testing for Class Name

- Another possibility would be to check explicitly for the class name (hidden in this example), using toHaveClass. This would be simpler, but farther from the actual user experience (this is testing implementation details, rather than how the user sees the page). It's always a balance, and I think either this approach or transforming the CSS would be defensible.

## Unit testing functions

- Functions separente from components
  - userd by several components
  - complex logic
- Unit test if:
  - complex logic difficult to test via functional tests
  - too many edge cases
