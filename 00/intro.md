# Intro

- strong philosophy
- it is opinionated
  - encourages a certain set of practices
  - test your software the way users actually use it.
  - not internal implementation (not how your software is writen)
  - we worry about the way the software works the way it is supposed to do
- **find elements by accessibility markers, not test IDs.**
- more philosophy later

## Roles: React Testing Library vs JEST

### React Testing library

- Provides virtual DOM for tests

### Jest

- Tes runner that
  - Find tests
  - run tests
  - determines whether tests pass or fail

### Let's create the first test

- So we will run:

  ```npm
  npx create-react-app color-button
  ```
