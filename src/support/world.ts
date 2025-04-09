// src/support/world.ts
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext } from '@playwright/test';

export class CustomWorld extends World {
  apiContext!: APIRequestContext;
  // Generic property object to save within test cases
  testObject: Record<string,any> = {};
}

setWorldConstructor(CustomWorld);
