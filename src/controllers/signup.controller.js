import { generateToken } from "../../utils/generateToken.utils.js";
import { sheets, spreadSheet_id } from "../../utils/sheetIntegration.utils.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    const { name, email, address, city, state, zipcode, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = [[name, email, address, city, state, zipcode, hashedPassword]];
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadSheet_id,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values: data },
    });

    generateToken(email, name, res);

    res.status(200).json({
      name,
      message: "signup Successfully",
      googleSheetsResponse: response.data,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
