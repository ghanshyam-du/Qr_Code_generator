/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';


import qr from 'qr-image';
import fs, { write } from 'fs';

inquirer
    .prompt([
        {
            "message": "Type your URL here",
            "name": "url"
        } 
    ])
    .then((answers) => {
        const url = answers.url;
        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('qrg.png'));

        fs.writeFile('url.txt', url, (err) => {
            if (err) throw err;
            console.log('URL saved to url.txt');
        });
        console.log('QR code generated and saved as qrg.png');
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
