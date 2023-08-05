import db from "../models";
export const getPriceSV = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Faild at getPrice!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
