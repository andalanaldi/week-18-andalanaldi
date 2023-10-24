
const getAllIpoToDo = async (req, res) => {
  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const ipo = await ipoCollection.find().toArray();

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations successfully retrieved',
          data: ipo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const createIpoToDo = async (req, res) => {
  const { username, 
          code, 
          sector, 
          owner, 
          purpose, 
          valuation,
          performance, 
          outstanding, 
          ipovalue, 
          underwriter,
          status } = req.body;

  console.log(
    username, 
    code, 
    sector, 
    owner, 
    purpose, 
    valuation,
    performance, 
    outstanding, 
    ipovalue, 
    underwriter,
    status, '<=== ipo todo ===>');

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const newIpo = await ipoCollection.insertOne({ 
        username, 
        code, 
        sector, 
        owner, 
        purpose, 
        valuation,
        performance, 
        outstanding, 
        totalipo, 
        underwriter,
        status });

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations successfully created',
          data: newIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const approvalIpo = async (req, res) => {
  const { id, status } = req.body;

  console.log(id, status, '<=== ipo todo ===>');

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const updatedIpo = await ipoCollection.updateOne(
          { _id: ObjectId(id) }, // MongoDB's default ObjectId is used as assumed
          { $set: { status } }
      );

      if (updatedIpo.matchedCount === 0) {
          // To Do List of IPO Order Preperations are not found
          res.status(404).json({ error: 'To Do List of IPO Order Preperations are not found' });
          return;
      }

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations status successfully approved',
          data: updatedIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIpoToDo,
  createIpoToDo,
  approvalIpo,
};