"use strict";

import { test, expect } from '@playwright/test';
import { Logger } from '../utils/Logger';
import { PetPropertyAnalyzer } from '../utils/helpers/PetPropertyAnalyzer';
import dotenv from 'dotenv';
import path from 'path';
import userHeaders from '../data/sample-headers/users.json';

dotenv.config ({ path: path.resolve(__dirname, '.env') });
const logger: Logger = new Logger ('PET.STORE.PETS.SPEC');
const petAnalyzer: PetPropertyAnalyzer = PetPropertyAnalyzer.getInstance ();

test ('Retrieve sold pet names', async ({ playwright }) => {
  try {
    const requestContext = await playwright.request.newContext ({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: userHeaders,
    });

    const createResponse = await requestContext.get ('v2/pet/findByStatus?status=sold');
    const responseBody = await createResponse.json ();
    logger.debug (`API Resoponse: ${JSON.stringify (responseBody, null, 2)}`);

    // Print tuples { id, name }
    const formatedTuples = responseBody.map (pet => { return { id: pet.id, name: pet.name }; });
    logger.log (formatedTuples);

    expect (createResponse.status ()).toBe (200);
  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});

test ('Group and summarize sold pet\'s names', async ({ playwright }) => {
  try {
    const requestContext = await playwright.request.newContext ({
      baseURL: process.env.API_BASE_URL,
      extraHTTPHeaders: userHeaders,
    });

    const createResponse = await requestContext.get ('v2/pet/findByStatus?status=sold');
    const responseBody = await createResponse.json ();
    logger.debug (`API Resoponse: ${JSON.stringify (responseBody, null, 2)}`);

    // Print tuples { id, name }
    const formatedTuples = responseBody.map (pet => { return { id: pet.id, name: pet.name }; });
    petAnalyzer.load (formatedTuples);
    const groupedByName: Record<string,number> = petAnalyzer.countByProperty ('name');
    logger.log (groupedByName);

    expect (createResponse.status ()).toBe (200);
  } catch (error) {
    logger.error(`API test failed: ${error}`);
    throw error;
  }
});
