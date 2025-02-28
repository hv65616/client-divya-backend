import { generateToken } from "../../utils/generateToken.utils.js";
import { sheets, spreadSheet_id } from "../../utils/sheetIntegration.utils.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadSheet_id,
      range: "Sheet1!A1:G",
    });

    const users = response.data.values || [];

    const user = users.slice(1).find((row) => row[1] === email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const [name, , address, city, state, zipcode, hashedPassword] = user;

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    generateToken(email, name, res);

    res.status(200).json({
      message: "Login successful",
      user: { name, email, address, city, state, zipcode },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
