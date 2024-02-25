import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Example: Adding a custom task
            on('task', {
                hello: () => {
                    console.log('Hello from a Cypress task!');
                    return null;
                },
            });

            // Example: Modifying config based on environment variables
            if (process.env.CUSTOM_ENV_VARIABLE) {
                config.baseUrl = process.env.CUSTOM_ENV_VARIABLE;
            }

            return config; // make sure to return the modified config
        },
    },
});
