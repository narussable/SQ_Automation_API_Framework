"use strict";

import { Logger } from '../Logger';

const logger: Logger = new Logger ('PET.PROPERTY.ANALYZER');

export class PetPropertyAnalyzer {
    private static instance: PetPropertyAnalyzer;
    private pets = [];

    // Singleton to avoid creating new instances, and consuming compute resources.
    private constructor () {}

    public static getInstance (): PetPropertyAnalyzer {
        if (!PetPropertyAnalyzer.instance) {
            PetPropertyAnalyzer.instance = new PetPropertyAnalyzer();
          }
          return PetPropertyAnalyzer.instance;
    }

    public load (listOfPets): void {
        this.pets = listOfPets;
    }

    public countByProperty (propertyName: string): Record<string, number> {
        return this.pets.reduce ((acc, pet) => {
            const prop = (pet[propertyName] as String)?.trim () || 'Unknown';
            acc[prop] = (acc[prop] || 0) + 1;
            
            return acc;
        }, {} as Record<string, number>);
    }
};
