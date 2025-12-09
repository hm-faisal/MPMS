/**
 * Swagger/OpenAPI Configuration
 * API documentation settings
 */

import path from 'node:path';
import YML from 'yamljs';

/**
 * Swagger configuration
 */
export const swaggerDocs = YML.load(path.join(__dirname, '../../docs/api-docs.yml'));
