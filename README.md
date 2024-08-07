# bitespeed-fluxkart
Identify customers across multiple purchases with common phone number and email

## Node Versions Used
- Node - 20.15.0
- NPM - 10.7.0
- NVM - 0.39.7

## Minimum requirements
- Node - >=18

## Stack used
- Express Typescript
- PostgreSQL

## Run the server locally:
- Clone the repository and checkout `master` branch
- Install dependencies: `npm install`
- Build the project: `npm run build`
- Set up PostgreSQL database
- Set up environment variables:
  - Create .env file in root directory
  - Copy contents from example.env and paste in .env file
  - Enter your PostgreSQL database credentials in .env file
- Run the migrations - Keep running the command `npm run run_next_migration` until you see the message "Already up to date"
- Run the server: `npm run start`

## Test the identify endpoint
To test the endpoint, either use cURL tool on terminal or execute a POST request from Postman to the URL - BASE_URL/identify
1. To test locally, use the URL - http://localhost:3000/identify
2. To test remotely (deployed version), use the URL - https://bitespeed-fluxkart-be.onrender.com/identify
