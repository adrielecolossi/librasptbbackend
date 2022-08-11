const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const KEYFILEPATH = 'ServiceAccountCred.json';
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
}
);
const createAndUploadFile = async function (fileName, filePath, auth) {
    const driveService = google.drive({ version: 'v3', auth });
    let fileMetaData = {
        'name': fileName,
        'parents': ['1K4Fiu8ZfBrkFyp02wKtvVd5QDdVEWkBH'] //id da pasta
    }
    let media = {
        mimeType: "image/jpg",
        mimeType: "video/mp4",
        body: fs.createReadStream(filePath)
    }
    let response = await driveService.files.create({
        resource: fileMetaData,
        media: media,
        fields: "id"
    })
    switch (response.status) {
        case 200:
            return response.data.id;
            break;
    }
};
//createAndUploadFile('blabla.mp4','./rest_api/server/tmp/uploads/oi.mp4',auth)= funciona o upload no google só não funciona o multer
module.exports = { createAndUploadFile };