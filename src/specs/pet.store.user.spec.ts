"use strict";

import { test, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';
import dotenv from 'dotenv';
import path from 'path';
import usersPayload from '../data/sample-payloads/users.json';
import userHeaders from '../data/sample-headers/users.json';

dotenv.config ({ path: path.resolve(__dirname, '.env') });
const logger: Logger = new Logger ('PET.STORE.USER.SPEC');

test ('Create single user', async ({ playwright }) => {
  try {
    const requestContext = await playwright.request.newContext ({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: userHeaders,
    });

    const createResponse = await requestContext.post ('v2/user', {
      data: usersPayload[0]
    }
    );
    logger.debug (`API Resoponse: ${JSON.stringify (createResponse.json(), null, 2)}`);

    expect (createResponse.status ()).toBe (200);
  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});

test ('Create user and retrieve its data', async ({ playwright }) => {
  try {
    const timestamp = Date.now ();
    const requestContext = await playwright.request.newContext ({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: userHeaders,
    });

    // Use a copy, to modify particular properties
    const bodyPayload = { ...usersPayload[0] };
    bodyPayload.id = Number (process.env.USER_ID) ?? 561;
    bodyPayload.username = `dummy_${timestamp.toString ().substr (-8)}`;
    bodyPayload.userStatus = 1;


    logger.debug(`Request payload: ${JSON.stringify (bodyPayload, null, 2)}`);

    const createResponse = await requestContext.post ('v2/user', {
      data: bodyPayload,
    });

    expect (createResponse.status ()).toBe (200);
    logger.debug (`User created successfully.`);

    const getResponse = await requestContext.get (`v2/user/${bodyPayload.username}`);
    const userData = await getResponse.json ();

    logger.debug(`Retrieved user: ${JSON.stringify (userData, null, 2)}`);

    expect (getResponse.status ()).toBe (200);
    expect (userData.username).toBe (bodyPayload.username);
    expect (userData.email).toBe (bodyPayload.email);

  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});
