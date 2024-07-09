const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Make sure axios is imported

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "8266883d-aa17-4c24-bc54-5d3667b20ee6" } }
    );
    // Return the response status and data
    return res.status(r.status).json(r.data);
  } catch (e) {
    // Handle errors
    console.error("Error:", e); // Log the actual error for debugging

    // Check if e.response exists before accessing its properties
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      // If e.response is undefined, handle it appropriately
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // This line will never be reached because the function returns in try/catch blocks
  // return res.json({ username: username, secret: "sha256..." });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
