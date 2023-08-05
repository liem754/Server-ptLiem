import db from "../models";
export const getCategorySV = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
        attributes: ["code", "value", "header", "subheader"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Failed to getCategory!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
