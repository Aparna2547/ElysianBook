module.exports = {
    apps: [
        {
            name: 'backend',
            script: './src/server.ts',
            watch: true,
            ignore_watch: ['node_modules', 'logs'],
            instances: 1,
            exec_mode: 'fork',
            autorestart: true,
            max_restarts: 10,
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};