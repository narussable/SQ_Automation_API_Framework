"use strict";

import { test, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';
import dotenv from 'dotenv';
import path from 'path';
import usersPayload from '../data/sample-payloads/users.json';
import userHeaders from '../data/sample-headers/users.json';

dotenv.config({ path: path.resolve(__dirname, '.env') });
const logger: Logger = new Logger ('PET.STORE.SPEC');

test ('Create single user', async ({ playwright }) => {
  try {
    const requestContext = await playwright.request.newContext ({
      baseURL: 'https://petstore.swagger.io/v2/',
      extraHTTPHeaders: userHeaders
    });

    const response = await requestContext.post ('user', {
      data: usersPayload[0]
    }
    );
    logger.debug (`API Resoponse: ${JSON.stringify (response.json(), null, 2)}`);

    expect (response.status ()).toBe (200);
  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});

test('Create user and retrieve its data', async ({ playwright }) => {
  try {
    const timestamp = Date.now();
    const requestContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: userHeaders,
    });

    // Clonar el payload para no modificar el original
    const bodyPayload = { ...usersPayload[0] };
    bodyPayload.username = `dummy_${timestamp}`;

    logger.debug(`Request payload: ${JSON.stringify(bodyPayload, null, 2)}`);

    // 1. Crear el usuario
    const createResponse = await requestContext.post('v2/user', {
      data: bodyPayload,
    });

    expect(createResponse.status()).toBe(200);
    logger.debug(`User created successfully.`);

    // 2. Obtener el usuario creado
    const getResponse = await requestContext.get(`user/${bodyPayload.username}`);
    const userData = await getResponse.json();

    logger.debug(`Retrieved user: ${JSON.stringify(userData, null, 2)}`);

    expect(getResponse.status()).toBe(200);
    expect(userData.username).toBe(bodyPayload.username);
    expect(userData.email).toBe(bodyPayload.email);

  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});
