import { expect } from 'chai';
import axios from 'axios';
import dotenv from 'dotenv';
import storeToken from '../Config/setEnvVar.js';
dotenv.config();

import { faker } from '@faker-js/faker';
import generateRandomId from '../Utils/utils.js';
import jsonData from '../Utils/user.json' assert { type: 'json' };
import fs from 'fs';

const email = "admin@roadtocareer.net";
const password = "1234";

// Utility function to handle user creation
const createUser = async (namePrefix, role) => {
    try {
        const { data } = await axios.post(
            `${process.env.base_url}/user/create`,
            {
                "name": `${namePrefix} ${faker.person.firstName()}`,
                "email": faker.internet.email(),
                "password": "1234",
                "phone_number": `01625${generateRandomId(100000, 999999)}`,
                "nid": "123456789",
                "role": role
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${process.env.token}`,
                    "X-AUTH-SECRET-KEY": process.env.secretKey
                }
            }
        );

        console.log(data);
        expect(data.message).to.contain("User created");

        jsonData.push(data.user);
        fs.writeFileSync('./Utils/user.json', JSON.stringify(jsonData, null, 2));
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw error;
    }
};

describe("Login by admin", () => {
    it("Login by admin", async () => {
        const { data } = await axios.post(
            `${process.env.base_url}/user/login`,
            {
                "email": email,
                "password": password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(data);
        expect(data.message).to.contain("Login successful");
        
        // Store token for further requests
        storeToken('token', data.token);
    });
});

describe("Create 2 new customers and an agent", () => {
    it("Create Customer 1", async () => {
        await createUser("Customer1", "Customer");
    });

    it("Create Customer 2", async () => {
        await createUser("Customer2", "Customer");
    });

    it("Create Agent", async () => {
        await createUser("Agent1", "Agent");
    });
});
