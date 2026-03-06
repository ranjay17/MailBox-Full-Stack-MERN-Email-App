import Mail from "../models/mailModel.js";

export const composeMail = async(req,res) =>{
    try {
        const{to, subject, body} = req.body;
        if (!req.user || !req.user.email) {
          return res.status(400).json({ message: "Unauthorized" });
        }
        if(!to || !subject || !body){
            return res.status(400).json({message: "All fields are required"})
        }
        const mail = await Mail.create({
            from : req.user.email,
            to,
            subject,
            body,
        })
        res.status(200).json({ message: "Mail sent", mail });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getInbox = async (req, res) => {
  try {
    const inbox = await Mail.find({ to: req.user.email }).sort({
      createdAt: -1,
    });
    res.status(200).json(inbox);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSent = async(req,res) =>{
    try {
        const sent = await Mail.find({from: req.user.email}).sort({
            createdAt: -1,
        })
        res.status(200).json(sent)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const markAsRead = async (req, res) => {
  try {
    await Mail.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMail = async(req,res) =>{
  try {
    const mail = await Mail.findById(req.params.id)
    if(!mail){
      return res.status(400).json({ message: "Mail not found" });
    }
    if(mail.to != req.user.email && mail.from != req.user.email){
      return res
        .status(400)
        .json({ message: "Not allowed to delete this mail" });
    }
    await Mail.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
