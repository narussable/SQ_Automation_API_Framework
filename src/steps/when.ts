import { When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/Logger';

const logger: Logger = new Logger ('WHEN');

When (/^the user retrieves the user information$/, async function (this:CustomWorld) {
    try {
        const url: string = `v2/user/${this.testObject.username}`;
        logger.log (`This is the user: ${url}`);

        const getResponse = await this.apiContext.get (url);
        this.testObject.response = getResponse;
    } catch (error) {
        logger.error ('Error: the user retrieves the user information');
        logger.error (`Error: ${error}`);
        throw error;
    }
});