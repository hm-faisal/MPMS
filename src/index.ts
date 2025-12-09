import { createServer, type Server as HTTPServer } from 'node:http';
import config from 'config';
import app from './app/app';
import { logger } from './config';
import { connectDb } from './db';

let httpServer: HTTPServer | null = null;
let isShuttingDown = false;

// Start server
const startServer = async (): Promise<void> => {
	httpServer = createServer(app);

	const port = config.get<number>('server.port');
	const environment = config.get<string>('server.env');

	await connectDb(config.get<string>('db.url'));
	httpServer.listen(port, () => {
		logger.info(
			`🚀 Server started successfully on port ${port} in ${environment} environment`,
		);
		logger.info(`🔗 API URL: http://localhost:${port}`);
	});

	// Set timeouts
	httpServer.timeout = 120_000; // 2 minutes
	httpServer.keepAliveTimeout = 65_000; // 65 seconds
	httpServer.headersTimeout = 66_000; // 66 seconds
};

// Graceful shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
	if (isShuttingDown) {
		logger.warn('⚠️  Shutdown already in progress...');
		return;
	}

	isShuttingDown = true;
	logger.warn(`📦 Server shutting down - Signal: ${signal}`);

	try {
		// Close HTTP server
		if (httpServer) {
			await new Promise<void>((resolve, reject) => {
				httpServer?.close((error) => {
					if (error) {
						reject(error);
					} else {
						logger.info('🧹 HTTP server closed');
						resolve();
					}
				});

				// Force close after 10 seconds
				setTimeout(() => {
					logger.warn('⏰ Forcing server shutdown after timeout');
					resolve();
				}, 10_000);
			});
		}

		// Add any additional cleanup here (database connections, etc.)
		logger.info('✅ Graceful shutdown completed');
		process.exit(0);
	} catch (_error) {
		logger.error('❌ Failed to perform graceful shutdown');
		process.exit(1);
	}
};

// Bootstrap
const main = async (): Promise<void> => {
	try {
		await startServer();

		// Handle uncaught exceptions
		process.on('uncaughtException', (error: Error) => {
			logger.error('💥 UNCAUGHT EXCEPTION!');
			logger.error(error.message, {
				stack: error.stack,
				name: error.name,
				context: 'uncaught_exception',
			});
			void gracefulShutdown('UNCAUGHT_EXCEPTION');
		});

		// Handle unhandled promise rejections
		process.on('unhandledRejection', (error: Error) => {
			logger.error('💥 UNHANDLED REJECTION!');
			logger.error(error.message, {
				stack: error.stack,
				name: error.name,
				context: 'unhandled_rejection',
			});
			void gracefulShutdown('UNHANDLED_REJECTION');
		});

		// Handle termination signals
		process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
		process.on('SIGINT', () => void gracefulShutdown('SIGINT'));

		logger.info('✨ Server initialization complete');
	} catch (error) {
		logger.error('❌ Failed to start server');
		if (error instanceof Error) {
			logger.error(error.message, {
				stack: error.stack,
				name: error.name,
				context: 'server_startup',
			});
		}
		process.exit(1);
	}
};

main();
