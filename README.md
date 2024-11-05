# Project Title: API Automation of Dmoney Transactions Using Mocha and Axios
## Project Summary
This project demonstrates API automation for the Dmoney platform using Mocha, Axios, and the MochaAwesome report. The automation covers a series of transactions to verify system behavior, including user login, customer and agent creation, fund transfers, and balance verification.

# Tools and Technologies

- **Node.js**: JavaScript runtime for executing server-side scripts.
- **Integrated Development Environment (IDE)**: Visual Studio Code (VS Code) for code development and debugging.
- **Axios**: HTTP client used to send asynchronous HTTP requests to REST endpoints.
- **Chai**: Assertion library for writing behavior-driven tests.
- **JavaScript Faker**: Library to generate fake data for testing.
- **MochaAwesome Report**: Reporting tool to create detailed test reports.
- **Mocha**: Test framework used to structure and run automated API tests.

## Key Features

1. **Admin Login**  
   - Log in as an admin using credentials `admin@roadtocareer.net/1234`.

2. **User Creation**  
   - Automatically create two new customers and one agent account.

3. **System-to-Agent Deposit**  
   - Deposit 2000 tk from the system account to the newly created agent.

4. **Agent-to-Customer Deposit**  
   - Deposit 1500 tk from the agent's account to a specific customer account.

5. **Customer Withdrawal**  
   - Withdraw 500 tk from a customer account back to the agent account.

6. **Customer-to-Customer Transfer**  
   - Send 500 tk from one customer to another customer account.

7. **Customer Payment to Merchant**  
   - Complete a payment of 100 tk from a customer to a specified merchant.

8. **Balance Check**  
   - Verify the balance of the recipient customer to ensure transaction accuracy.
  
## How to Run This Project:

- Clone this project.
- Give following command in terminal
- ```bash
  npm init -y
- Give following command to run end-to-end test along with mochawesome report generation
- ```bash
  npm test

## Mochawesome Report
![mocha-report part 1](https://github.com/user-attachments/assets/38f932c1-054d-46af-bd44-bb6acc98a92f)
![mocha-report part 2](https://github.com/user-attachments/assets/2c96d753-96fd-4333-82db-e1a5cc700930)



