import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/Logger';
import usersPayload from '../data/sample-payloads/users.json';

const logger: Logger = new Logger ('GIVEN');

Given (/^a user retrieves (sold|available|pending) pets$/, async function (this: CustomWorld, petStatus: string) {
    try {
        // Make api call for specific petStatus
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

Given (/^a user uses (dummy|valid) (data|list)$/, async function (this: CustomWorld, isValid:string, typeOfDummyData: string) {
    try {
        // Use dummy data from sample-payloads
        const timestamp = Date.now ();
        const url: string = (typeOfDummyData === 'data') ? 'v2/user' : 'v2/user/createWithArray';
        var requestBody:any = (typeOfDummyData === 'data') ? usersPayload[0] : usersPayload;

        if (isValid === 'valid') {
            requestBody.id = 560 + Number (timestamp.toString ().substr (-2));
            requestBody.username = `dummy_${timestamp.toString ().substr (-8)}`;
            requestBody.userStatus = 1;
        }

        const postUser = await this.apiContext.post (url, {
            data: requestBody
        });
        logger.debug (`This is the request body: ${JSON.stringify (usersPayload[0])}`);

        this.testObject.response = postUser;
        this.testObject.username = requestBody.username;
    } catch (error) {
        logger.error (`Error: a user uses ${isValid} ${typeOfDummyData}`);
        logger.error (`Error: ${error}`);
        throw error;
    }
});
