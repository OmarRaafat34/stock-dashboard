# Stock Dashboard

This project is a stock dashboard application built with **React**, **TypeScript**, and **React Query**. It allows users to view, buy, and sell stocks, and provides real-time updates via a stock API.

## Setup and Running the Application
- npm install
- npm run dev


Before getting started, ensure you have the following installed:

- **Node.js** (version 14 or above)
- **npm** (or **yarn** if preferred)

### Installation

1. Clone the repository:
   git clone https://github.com/your-repository/stock-dashboard.git
   cd stock-dashboard


### .env

if not included, create .env file at the root of the project and include this:
VITE_POLYGON_BASE_URL=https://api.polygon.io
VITE_POLYGON_API_KEY=K7jvo4C1pjnYpMYVerY1nC1pXXkVWSyB


### State Management

I used React Query
I chose React Query for managing server-state and API interactions in this application due to the following reasons:

Simplified Data Fetching: React Query provides powerful hooks like useQuery and useMutation, which streamline data fetching and mutations. This made it easy to implement the logic for fetching real-time stock prices, handling buy and sell actions, and managing the data lifecycle.

Automatic Caching and Background Sync: Stock data is subject to frequent updates. React Query automatically caches the data and ensures the UI is kept in sync with the server, even when users interact with the app in different ways (e.g., buying/selling stocks). It also handles background refetching to ensure the data is always up-to-date without manual intervention.

Error Handling: React Query provides built-in mechanisms for managing error states, retries, and fallback logic. This is useful when working with external APIs, where errors or network issues might occur.


Strengths of React Query
Automatic Caching and Background Sync: React Query caches data by default and keeps it synchronized with the server, reducing the need for manual state updates or refetching.

Declarative Data Fetching: Data fetching logic is handled declaratively within the components. The API calls are tied to React components, ensuring the UI is updated automatically when the data changes.

Improved Developer Experience: React Query provides built-in hooks like useQuery, useMutation which make it easier to manage API calls, handle loading/error states, and trigger mutations.

Automatic Retries and Polling: React Query offers automatic retries for failed requests and background polling, making it ideal for apps that need real-time data or are prone to intermittent failures.

Weaknesses of React Query
Not Ideal for All State: React Query is best suited for managing remote data or server-side state, but it’s not designed to handle all of the application's state. Local UI state (like form input, toggle states, etc.) should still be managed using React’s useState or other local state management solutions.


