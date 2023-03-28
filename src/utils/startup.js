const fs = require('fs');
const path = require('path');

const checkInvalidFolder = (verbose) => {
    if (verbose) console.log('Checking for invalid folder');
    if (!fs.existsSync(path.join(__dirname, '..', 'public', 'invalid'))) {
        if (verbose) console.log('Creating./public/invalid');
        fs.mkdirSync(path.join(__dirname, '..', 'public', 'invalid'));
        if (verbose) console.log('Created./public/invalid');
    }
    
    if (fs.readdirSync(path.join(__dirname, '..', 'public', 'invalid')).length > 0) {
        if (verbose) console.log('The./public/invalid folder is not empty. Please empty it before starting the server.');
        throw new Error('The./public/invalid folder is not empty. Please empty it before starting the server.');

    }
    if (verbose) console.log('Done checking inside of./public/invalid');
};


class Startup {
    constructor() {}


    checkForInvalidFiles({ verbose }) {
        checkInvalidFolder(verbose);
        let numberOfInvalidFiles = 0;

        if (numberOfInvalidFiles > 0) numberOfInvalidFiles = 0;

        if (verbose) console.log('Checking for invalid files');
        const media = fs.readdirSync(path.join(__dirname, '..', 'public', 'media'));
        media.forEach(file => {
            if (!file.endsWith('.mp4') &&!file.endsWith('.webm') &&!file.endsWith('.mov')) {
                if (verbose) console.log(`Found invalid file ${file}`);
                fs.renameSync(path.join(__dirname, '..', 'public','media', file), path.join(__dirname, '..', 'public', 'invalid', file));
                if (verbose) console.log(`Moved ${file} to./public/invalid`);
                numberOfInvalidFiles++;
                if (verbose) console.log(`Incremented numberOfInvalidFiles to ${numberOfInvalidFiles}`);
            }
        });

        if (verbose) console.log('Done checking inside of ./public/media');

        const images = fs.readdirSync(path.join(__dirname, '..', 'public', 'images'));
        images.forEach(file => {
            if (!file.endsWith('.png') &&!file.endsWith('.jpg') &&!file.endsWith('.jpeg') &&!file.endsWith('.gif') &&!file.endsWith('.webp')) {
                if (verbose) console.log(`Found invalid file ${file}`);
                fs.renameSync(path.join(__dirname, '..', 'public', 'images', file), path.join(__dirname, '..', 'public', 'invalid', file));
                if (verbose) console.log(`Moved ${file} to ./public/invalid`);
                numberOfInvalidFiles++;
                if (verbose) console.log(`Incremented numberOfInvalidFiles to ${numberOfInvalidFiles}`);
            }
        });

        if (verbose) console.log('Done checking inside of./public/images');
        

        return "Done";
    }
}

module.exports = Startup;