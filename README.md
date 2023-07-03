# FlyLikeAPro

Short project description

## Table of Contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [API Documentation](#api-documentation)
-   [Technologies](#technologies)

## Overview

The "Fly like a PRO" Application is a web-based platform designed to help users find the best flights based on their travel requirements and preferences. It provides a user-friendly interface where users can input their departure and arrival airports. The application then retrieves and presents relevant flight options, allowing users to compare prices, flight layovers, and other details to make informed decisions.
The main page shows a series of promotions, which represent an example of the most used routes and with the most connecting flights

## Installation

### Node

```bash
cd node
npm install
node index.js
```

### React

```bash
cd client
npm install
npm start
```

## API Documentation

This documentation provides an overview of the API endpoints available in the application.

### Base URL

The base URL for all endpoints is: `http://localhost:3003`

### Endpoints

#### GET /

-   Description: Health check endpoint to verify if the API is alive.
-   Request: `GET /`
-   Response:
    -   Status Code: 200
    -   Body:
        ```
        {
            "message": "alive"
        }
        ```

#### Flight Connection

##### GET /flight-connection

-   Description: Retrieve a list of flight connections.
-   Request: `GET /flight-connection?from=${from}&to=${to}`
-   Response:
    -   Status Code: 200
    -   Body:
    ```
    {
        "connectionFlights": [
            {
                "id": 19,
                "code_departure": "ATL",
                "code_arrival": "DXB",
                "price": 1500
            }
    ```

#### Flight

##### GET /flight

-   Description: Retrieve a list of flights.
-   Request: `GET /flight`
-   Response:
    -   Status Code: 200
    -   Body:
    ```
    {
        "data": [
            {
                "id": 1,
                "code_departure": "ATL",
                "code_arrival": "PEK",
                "price": 800
            }
    ```

#### Airport

##### GET /airport

-   Description: Retrieve a list of airports.
-   Request: `GET /airport`
-   Response:
    -   Status Code: 200
    -   Body:
    ```
    {
        "data": [
            {
                "id": 1,
                "name": "Aeroporto Internazionale di Atlanta",
                "code": "ATL",
                "lat": 33.6367,
                "lng": -84.4281
            }
    ```

## Technologies

List the technologies and frameworks used:

-   React.js
-   Typescript
-   Node.js
-   Express.js
-   sqlite3
-   react-bootstrap
-   bootstrap
-   sass
-   axios
