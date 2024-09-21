import { VerificationLevel } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";
import express from 'express';
import bodyParser from "body-parser";

const app_id = process.env.VITE_WLD_APP_ID;
const action = process.env.VITE_WLD_ACTION;

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/verify", async (req, res) => {
  const { proof, signal } = req.body;

  try {
    console.log(proof,signal);
    const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
    if (verifyRes.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        code: verifyRes.code,
        attribute: verifyRes.attribute,
        detail: verifyRes.detail,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


app.listen(port,()=>{
  console.log("Server listening on port: ", port);
})