"use strict";

import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { request, APIRequest } from '@playwright/test';
import { Logger } from '../utils/Logger';
import { CustomWorld } from './world';
import sampleHeader from '../data/sample-headers/users.json';
import config from '../../playwright.config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config ({ path: path.resolve (__dirname, '../../.env') });
const logger = new Logger ('HOOKS');

Before (async function (this: CustomWorld) {
    try {
      this.apiContext = await request.newContext ({
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: sampleHeader
      });
  
      logger.debug (`Base URL: ${process.env.API_BASE_URL}`);
      logger.debug (`Base Headers: ${JSON.stringify (sampleHeader, null, 2)}`);
      logger.debug ('✅ API context initialized for scenario');
    } catch (error) {
      logger.error ('❌ Failed to initialize API context');
      throw error;
    }
});

After (async function (this: CustomWorld) {
    await this.apiContext.dispose ();
    logger.debug ('API context disposed for scenario');
});