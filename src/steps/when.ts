import { When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Logger } from '../utils/logger';

const logger: Logger = new Logger ('WHEN');
