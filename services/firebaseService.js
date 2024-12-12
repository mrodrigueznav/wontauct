const { getFirestore, doc, setDoc } = require('firebase/firestore');
const db = require('../config/firebase');

const saveAuctionResult = async (auctionId, data) => {
  try {
    const auctionRef = doc(db, 'auctions', auctionId.toString());
    await setDoc(auctionRef, data);
    return { success: true, message: 'Auction result saved to Firebase.' };
  } catch (error) {
    throw new Error(`Firebase Save Error: ${error.message}`);
  }
};

module.exports = {
  saveAuctionResult,
};
