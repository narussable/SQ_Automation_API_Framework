import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/Logger';
import { PetPropertyAnalyzer } from '../utils/helpers/PetPropertyAnalyzer';

const logger: Logger = new Logger ('THEN');
const petAnalyzer: PetPropertyAnalyzer = PetPropertyAnalyzer.getInstance ();

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

Then (/^the list should contain just pet IDs and names$/, async function (this: CustomWorld) {
    try {
        // Get reponse code
        const response = await this.testObject.response;
        const body = await response.json ();
        const filteredList = body.map ((pet: any) => { return { id: pet.id, name: pet.name }; });
        var areTwoProperties: Boolean = true;
        var isIdInTuple: Boolean = true;
        var isNameInTuple: Boolean = true;

        filteredList.forEach((petTuple: Object) => {
            const objKeys = Object.keys (petTuple);
            const qtyProperties = objKeys.length;
            areTwoProperties = areTwoProperties && (qtyProperties === 2);
            isIdInTuple = isIdInTuple && objKeys.includes ('id');
            isNameInTuple = isNameInTuple && objKeys.includes ('name');
        });

        expect (areTwoProperties).toBe (true);
        expect (isIdInTuple).toBe (true);
        expect (isNameInTuple).toBe (true);

        this.testObject.soldPets = filteredList;

    } catch (error) {
        logger.error ('Error: the list should contain just pet IDs and names');
        logger.error (`Error: ${error}`);
        throw error;
    }
});

Then (/^print count by name$/, async function (this: CustomWorld) {
    try {
        // Get tuple with id and name
        const list = await this.testObject.soldPets;

        // Load list to singleton analyzer
        petAnalyzer.load (list);
        const groupedByName: Record<string,number> = petAnalyzer.countByProperty ('name');
        logger.log (`This is the count per name:\n\n${JSON.stringify (groupedByName, null, 2)}`);

    } catch (error) {
        logger.error ('Error: the list should contain just pet IDs and names');
        logger.error (`Error: ${error}`);
        throw error;
    }
});
