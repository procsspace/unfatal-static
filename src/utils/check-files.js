const Startup = require('./startup');
const startup = new Startup();

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: npm run check-files -- verbose=BOOLEAN');
    process.exit(1);
}

const useVerbose = args[0];

if (useVerbose === 'verbose=true') {
    startup.checkForInvalidFiles({ verbose: true });
} else {
    startup.checkForInvalidFiles();
}
