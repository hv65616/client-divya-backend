import { sheets, spreadSheet_id } from "../../utils/sheetIntegration.utils.js";

export const becomeAPro = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    const {
      name,
      email,
      businessName,
      serviceCategory,
      experienceLevel,
      city,
      state,
      message,
    } = req.body;
    const data = [
      [
        name,
        email,
        businessName,
        serviceCategory,
        experienceLevel,
        city,
        state,
        message,
      ],
    ];
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadSheet_id,
      range: "Sheet2!A1",
      valueInputOption: "RAW",
      requestBody: { values: data },
    });

    res.status(200).json({
      message: "signup Successfully",
      googleSheetsResponse: response.data,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
