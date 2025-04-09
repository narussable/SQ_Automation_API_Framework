import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/logger';

const logger: Logger = new Logger ('GIVEN');

Given (/^a user retrieves (sold|available|pending) pets$/, async function (this: CustomWorld, petStatus) {
    try {
        // Make api call for specific petStatus
        logger.debug (this.apiContext);
        const retrieveResponse = await this.apiContext.get (`v2/pet/findByStatus?status=${petStatus}`);
        expect (retrieveResponse.status ()).toBe (200);

        const retrievedBody = await retrieveResponse.json ();
        logger.debug (`Retrieved data: ${JSON.stringify (retrievedBody, null, 2)}`);

        // Save in world context, to further use in When, Then
        this.testObject.response = retrieveResponse;
        logger.debug ('Response property successfuly assigned');
    } catch (error) {
        logger.error (`Error: A user retrieves ${petStatus} pets`);
        logger.error (`Error: ${error}`);
        throw error;
    }
});
