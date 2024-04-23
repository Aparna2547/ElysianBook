module.exports = {
    script: 'dist/server.js', // Path to your compiled JavaScript file
    watch: true, // Auto-restart the app when files change (optional)
    ignore_watch: ['node_modules','logs'], 
    env: {
        Node_ENV: 'production',
        PORT: 3000,
},
};