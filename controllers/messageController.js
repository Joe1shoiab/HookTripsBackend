const Message = require('../models/Message');

// Create a new message
exports.createMessage = async (req, res) => {
  const { name, phone, subject, message } = req.body;
  
  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ 
      error: "All fields (name, phone, subject, message) are required" 
    });
  }

  try {
    const newMsg = new Message({ 
      name,
      phone,
      subject,
      message
    });
    await newMsg.save();
    res.status(200).json({ success: true, msg: "Message saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}; 