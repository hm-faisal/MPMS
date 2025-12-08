/**
 * CORS Middleware Configuration
 * Applies CORS settings from the config
 */

import cors from 'cors';
import { corsConfig } from '@/config/index.js';

/**
 * Create CORS middleware with configuration
 */
export const corsMiddleware = cors(corsConfig);

export default corsMiddleware;
