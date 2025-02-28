import { sheets, spreadSheet_id } from "../../utils/sheetIntegration.utils.js";

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadSheet_id,
      range: "Sheet1!A1:G",
    });
    const users = response.data.values || [];
    const user = users.find((row) => row[2] === email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const [name, , address, city, state, zipcode] = user;

    res.status(200).json({
      name,
      email,
      address,
      city,
      state,
      zipcode,
      message: "Profile retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
