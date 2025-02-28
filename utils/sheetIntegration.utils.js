import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

if (!process.env.GOOGLE_CREDENTIALS) {
  throw new Error("GOOGLE_CREDENTIALS is not defined in environment variables");
}

let credentials;
try {
  credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS, "base64").toString("utf-8")
  );
} catch (error) {
  throw new Error(
    "Failed to parse GOOGLE_CREDENTIALS. Ensure it's properly Base64 encoded."
  );
}

const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const authentication = new google.auth.GoogleAuth({
  credentials,
  scopes,
});

const sheets = google.sheets({ version: "v4", auth: authentication });

const spreadSheet_id = process.env.SPREADSHEET_ID;

export { sheets, spreadSheet_id };
