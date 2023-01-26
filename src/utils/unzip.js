// const JSZip = require('JSZip');
const AdmZip = require('adm-zip');
const fs = require('fs');
const { resolve } = require('path');

const outputDir = resolve('.temp');

module.exports = (filePath) =>
  new Promise((resolve, reject) => {
    try {
      const zip = new AdmZip(filePath);

      zip.extractAllTo(outputDir, { overwrite: true });
      const fileArray = [];

      for (const zipEntry of zip.getEntries()) {
        fileArray.push(zipEntry.name);
      }
      resolve(fileArray);
    } catch (e) {
      console.log(`Something went wrong. ${e}`);
    }
  });
