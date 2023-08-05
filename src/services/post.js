import db from "../models";
const { Op } = require("sequelize");
import { v4 } from "uuid";
import generCode from "../ultis/generCode";
import moment from "moment";
import generDate from "../ultis/generDate";
export const getPostSv = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "published", "acreage", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            // attributes: ["price", "published", "acreage", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Get Post Failed!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const getLimitPostSv = (
  page,
  { limitPost, order, ...query },
  { priceNumber, areaNumber }
) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      const limit = +limitPost || +process.env.LIMIT;
      queries.limit = limit;
      if (priceNumber) query.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) query.areaNumber = { [Op.between]: areaNumber };
      if (order) queries.order = [order];
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: offset * limit,
        ...queries,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "published", "acreage", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            // attributes: ["price", "published", "acreage", "hashtag"],
          },
          {
            model: db.Label,
            as: "labelData",
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Get Post Failed!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostSv = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        offset: 0,
        limit: +process.env.LIMIT2,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "published", "acreage", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Get Post Failed!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createNewPostSV = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = v4();
      const overviewId = v4();
      const imagesId = v4();
      const currentDate = generDate();
      const labelCode = generCode(body.label);
      const hashtag = Math.floor(Math.random() * Math.pow(10, 6));
      await db.Post.create({
        id: v4(),
        title: body?.title,

        labelCode: labelCode,
        address: body?.address,
        attributesId,
        categoryCode: body?.categoryCode,
        description: JSON.stringify(body?.description.split(".")) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body?.areaCode,
        priceCode: body?.priceCode,
        provinceCode: body?.province.includes("Thành phố")
          ? generCode(body?.province.replace("Thành phố ", ""))
          : generCode(body?.province.replace("Tỉnh ", "")),
        priceNumber: body?.priceNumber,
        areaNumber: body?.areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${+body?.priceNumber * 1000000} đồng/tháng`
            : `${+body?.priceNumber} triệu/tháng`,
        acreage: `${+body?.areaNumber}m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag: hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body?.images),
      });
      await db.Label.findOrCreate({
        where: { code: labelCode },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });
      await db.Overview.create({
        id: overviewId,
        code: `#${hashtag}`,
        area: body.labelov,
        type: body.category || null,
        target: body?.target || null,
        bonus: "Tin thường",
        created: currentDate.today,
        expired: currentDate.expireday,
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
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });
export const getPostLimitAdminSV = (page, id, query) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query, userId: id };

      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        order: [["createdAt", "DESC"]],
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "published", "acreage", "hashtag"],
          },
          {
            model: db.User,
            as: "users",
            // attributes: ["price", "published", "acreage", "hashtag"],
          },
          {
            model: db.Overview,
            as: "overviews",
            attributes: ["code", "created", "target", "expired"],
          },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK!" : "Get Post Failed!",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const delePostSV = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: response > 0 ? 0 : -1,
        msg: response > 0 ? "Delete ok!" : "no delete",
      });
    } catch (error) {
      reject(error);
    }
  });
