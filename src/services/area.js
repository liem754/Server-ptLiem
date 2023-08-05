import db from "../models";
export const getAreaSv = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Area.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Failed at getArea",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
