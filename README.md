# Playwright QA Automation Project

A hands-on QA automation project built with **Playwright** and **TypeScript**.

The project demonstrates automated testing of an e-commerce application using the **Page Object Model (POM)** design pattern.

## Technologies

- TypeScript
- Playwright
- Node.js
- Git & GitHub
- GitHub Actions

## Project Structure

```text
tests/
├── data/
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
└── login.spec.ts
```

## Automated Test Coverage

Current automated scenarios include:

- Successful login with valid credentials
- Login validation with invalid credentials
- Product list and price validation
- Adding a product to the shopping cart
- Shopping cart content validation
- Removing a product from the cart
- Complete checkout flow
- Customer information entry
- Product and price validation during checkout
- Successful order completion validation

## End-to-End Checkout Flow

```text
Login
  ↓
Inventory
  ↓
Add Product
  ↓
Shopping Cart
  ↓
Checkout
  ↓
Customer Information
  ↓
Order Overview
  ↓
Product & Price Validation
  ↓
Finish Order
  ↓
Order Completion Validation
```

## Running the Tests

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run tests in Chromium:

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

Run in headed mode:

```bash
npx playwright test --headed
```

Open the HTML report:

```bash
npx playwright show-report
```

## Automation Design

The project demonstrates:

- Page Object Model (POM)
- Reusable page methods
- Playwright locators
- Assertions and validations
- Dynamic product selection using locators and filters
- TypeScript types and asynchronous operations
- End-to-end user flow automation
- HTML test reporting
- Source control with Git

## Continuous Integration

The repository includes a **GitHub Actions** workflow for automated test execution.

## Project Status

This project is actively being developed as part of hands-on QA automation training.

Additional test scenarios and framework improvements will be added as the project evolves.
