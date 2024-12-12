const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const uploadImageToAzure = async (fileName, fileBuffer) => {
  const containerName = 'subastas'
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileBuffer);

    return blockBlobClient.url;
  } catch (error) {
    throw new Error(`Azure Blob Storage Upload Error: ${error.message}`);
  }
};

module.exports = {
  uploadImageToAzure,
};
