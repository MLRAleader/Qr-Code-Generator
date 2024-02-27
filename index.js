/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from 'qr-image';
import fs from "fs";
inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Veuillez saisir votre url :'
    },
  ])
  .then((answers) => {
    const url = answers.url;
    console.log(`Votre url est : ${url}`);
    const qrCodeLinkImage = qr.image(url, { type: 'png' });
    qrCodeLinkImage.pipe(fs.createWriteStream('qrCodeLinkImage.png'));
    const filePath = 'user_url.txt';
    fs.writeFile(filePath, url, (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
      } else {
        console.log(`Le lien a été enregistré avec succès dans ${filePath}`);
      }
    })
    console.log(`Le qr code a été généré avec succès et stocké dans qrCodelinkImage.png`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Impossible d'afficher l'url");
    } else {
      console.error("Une erreur s\'est produite :", error);
    }
  });
