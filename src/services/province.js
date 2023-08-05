import db from "../models";
export const getProvinceSV = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Failed getProvince!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
