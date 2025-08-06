const express = require("express");
const multer = require("multer");
const contentstack = require("@contentstack/management");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { firstName, lastName, email, PhoneNumber, yearsOfExperience } = req.body;
    const file = req.file;

    // Contentstack client
    const client = contentstack.client({ authtoken: process.env.CONTENTSTACK_AUTHTOKEN });
    const stack = client.stack({ api_key: process.env.CONTENTSTACK_API_KEY });

    // 1. Upload asset
    const asset = await stack.asset().create({
      upload: file.path,
      title: file.originalname,
      description: "Resume upload"
    });

    // 2. Create entry with asset UID and mapped fields
    const entry = await stack
      .contentType(process.env.CONTENTSTACK_CONTENT_TYPE_UID)
      .entry()
      .create({
        entry: {
          title: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: PhoneNumber,
          years_of_experence: yearsOfExperience,
          upload_resume: asset.uid // field UID for file
        }
      });

    res.status(200).json({ success: true, entry });
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;