// import * as authService from "../services/auth";
import * as insertService from "../services/insert";
export const insert = async (req, res) => {
  //   const { name, phone, password } = req.body;
  try {
    // if (!name || !phone || !password) {
    //   return res.status(400).json({
    //     err: 1,
    //     msg: "Missing inputs !",
    //   });
    // } else {
    const response = await insertService.insertService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
