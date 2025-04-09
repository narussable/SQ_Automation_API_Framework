import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/logger';
import { stat } from 'fs';

const logger: Logger = new Logger ('THEN');

Then (/^the response status code should be (\d{3})$/i, async function (this: CustomWorld, statusCode) {
    try {
        // Get reponse code
        const response = await this.testObject.response;
        const responseStatusCode = await response.status ();
        logger.log (`Expected status: ${Number (statusCode)} - Actual: ${responseStatusCode}`);

        expect (responseStatusCode).toBe (Number (statusCode));

    } catch (error) {
        logger.error (`Error: the repsonse status code should be ${statusCode}`);
        logger.error (`Error: ${error}`);
        throw error;
    }
});