import db from "../models";
const { Op } = require("sequelize");
import generCode from "../ultis/generCode";
export const updateSV = ({
  postId,
  overviewId,
  attributesId,
  imageId,
  ...body
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const labelCode = generCode(body.label);

      await db.Post.update(
        {
          title: body?.title,
          labelCode: labelCode,
          address: body?.address,
          categoryCode: body?.categoryCode,
          description: JSON.stringify(body?.description.split(",")) || null,
          areaCode: body?.areaCode,
          priceCode: body?.priceCode,
          provinceCode: body?.province.includes("Thành phố")
            ? generCode(body?.province.replace("Thành phố ", ""))
            : generCode(body?.province.replace("Tỉnh ", "")),
          priceNumber: body?.priceNumber,
          areaNumber: body?.areaNumber,
        },
        {
          where: { id: postId },
        }
      );
      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${+body?.priceNumber * 1000000} đồng/tháng`
              : `${+body?.priceNumber} triệu/tháng`,
          acreage: `${+body?.areaNumber}m2`,
        },
        {
          where: { id: attributesId },
        }
      );
      await db.Image.update(
        {
          image: JSON.stringify(body?.images),
        },
        {
          where: { id: imageId },
        }
      );
      await db.Overview.update(
        {
          area: body.labelov,
          type: body.category || null,
          target: body?.target || null,
        },
        {
          where: { id: overviewId },
        }
      );
      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            {
              value: body?.province?.replace("Thành phố ", ""),
            },
            {
              value: body?.province.replace("Tỉnh ", ""),
            },
          ],
        },
        defaults: {
          code: body?.province.includes("Thành phố")
            ? generCode(body?.province.replace("Thành phố ", ""))
            : generCode(body?.province.replace("Tỉnh ", "")),
          value: body?.province.includes("Thành phố")
            ? body?.province.replace("Thành phố ", "")
            : body?.province.replace("Tỉnh ", ""),
        },
      });
      resolve({
        err: 0,
        msg: "update ok",
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateAdSV = ({ userId, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          name: body?.name,
          zalo: body?.zalo || null,
          fbUrl: body?.fbUrl || null,
          avatar: JSON.stringify(body?.avatar) || null,
        },
        {
          where: { id: userId },
        }
      );
      resolve({
        err: 0,
        msg: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });
