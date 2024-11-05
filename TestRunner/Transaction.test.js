import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import jsonData from '../Utils/user.json' assert { type: 'json' };

const length = jsonData.length;
const customer1PhoneNumber = jsonData[length - 3].phone_number;
const customer2PhoneNumber = jsonData[length - 2].phone_number;
const agentPhoneNumber = jsonData[length - 1].phone_number;
const merchantPhoneNumber = '01301831905';

describe("Transaction Activities", () => {
    
   
    describe("Deposit to Agent", () => {
        it("Give 2000 tk from System account to the newly created agent", async () => {
            const { data } = await axios.post(`${process.env.base_url}/transaction/deposit`, {
                "from_account": "SYSTEM",
                "to_account": agentPhoneNumber,
                "amount": 2000
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("Deposit successful");
        });
    });

   
    describe("Deposit from Agent to Customer1", () => {
        it("Deposit 1500 tk to a customer from the agent account", async () => {
            const { data } = await axios.post(`${process.env.base_url}/transaction/deposit`, {
                "from_account": agentPhoneNumber,
                "to_account": customer1PhoneNumber,
                "amount": 1500
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("Deposit successful");
        });
    });


    describe("Customer1 Transactions", () => {
        it("Withdraw 500 tk by the customer to the agent", async () => {
            const { data } = await axios.post(`${process.env.base_url}/transaction/withdraw`, {
                "from_account": customer1PhoneNumber,
                "to_account": agentPhoneNumber,
                "amount": 500
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("Withdraw successful");
        });

        it("Send money 500 tk to another customer", async () => {
            const { data } = await axios.post(`${process.env.base_url}/transaction/sendMoney`, {
                "from_account": customer1PhoneNumber,
                "to_account": customer2PhoneNumber,
                "amount": 500
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("Send money successful");
        });
    });

   
    describe("Customer2 Transactions", () => {
        it("Payment 100 tk to any merchant by the recipient customer", async () => {
            const { data } = await axios.post(`${process.env.base_url}/transaction/payment`, {
                "from_account": customer2PhoneNumber,
                "to_account": merchantPhoneNumber,
                "amount": 100
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("Payment successful");
        });

        it("Check balance of the recipient customer", async () => {
            const { data } = await axios.get(`${process.env.base_url}/transaction/balance/${customer2PhoneNumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": `${process.env.secretKey}`
                }
            });
            console.log(data);
            expect(data.message).to.contains("User balance");
        });
    });

    // Delay 1000 ms between tests
    afterEach(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
    });
});
