# Crypto Market Summary App

A simple Vue 3 application that displays crypto market data, including currency information and real-time market updates. The app polls for market data, allowing users to see up-to-date prices, price changes, and volumes for various trading pairs. It also includes search and filter capabilities, as well as basic price history charts for each pair.

---

## Features

1. **Market Overview**: Displays a table of crypto pairs with last price, 24h change, volume, and a mini price history chart.
2. **Filtering and Sorting**:
   - Search by pair.
   - Filter by Gainers (Up) or Losers (Down).
   - Sort by pair, last price, and volume.
3. **Real-time Updates**:
   - Polls the market data periodically (default: every 10 seconds).
4. **Loading and Error States**:
   - Shows loading indicator while fetching data.
   - Handles and displays API errors.
5. **Price History Chart**:
   - Renders a small bar chart for the price history of each pair using Chart.js.

---

## Technologies

- **Vue 3** with the `<script setup>` composition API
- **Pinia** for state management
- **TypeScript** for type safety
- **Chart.js** for rendering charts
- **Vite** for development and build
- **Tailwind CSS** for styling

---

## Getting Started

### Installation

1. **Clone or download the repository**:
   ```bash
   git clone https://github.com/ilyasyzv/8bits-test.git
   ```
2. **Install dependencies (using your preferred package manager)**:
   ```bash
   npm install
   ```
   ```bash
   yarn install
   ```
   ```bash
   pnpm install
   ```

### Running the App
**After installing dependencies, start the development server**:
   ```bash
   npm run dev
   ```
   ```bash
   yarn dev
   ```
   ```bash
   pnpm dev
   ```

### Building for Production
**To create a production build, run**:
   ```bash
   npm run build
   ```
   ```bash
   yarn build
   ```
   ```bash
   pnpm build
   ```

### Testing
**To run tests, execute**:
   ```bash
   npm run test
   ```
   ```bash
   yarn test
   ```
   ```bash
   pnpm test
   ```
