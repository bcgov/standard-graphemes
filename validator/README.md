# Confusables Validator

This repository contains a full stack web application for validating [confusables](https://util.unicode.org/UnicodeJsps/confusables.jsp) (characters that may be confused with others, such as the Latin letter "o" and the Greek letter omicron "ο") primarily found within BC-based Indigenous languages.

## Backend

- Hono with TypeScript as the API server
- `csv-parser` for transforming confusables data into JSON
- Zod for schema definitions
- OpenAPI and SwaggerUI for API documentation
- Vitest for unit tests

## Frontend

- Vite/React/TypeScript for the single page application
- TanStack React Query for making and caching API calls
- `@bcgov/design-system-react-components` and `@bcgov/design-tokens` for BC Government components and styling
- `react-aria-components` for accessible unstyled components for items missing from the B.C. Design System
- Vitest with Testing Library for unit tests
- ESLint for linting, Prettier for formatting

## CI/CD

- GitHub Actions workflows for running unit test suites on pull request creation
