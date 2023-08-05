import * as getPostC from "../services/post";
export const getPost = async (req, res) => {
  try {
    const response = await getPostC.getPostSv();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed getPost Controller" + error,
    });
  }
};
export const getLimitPost = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await getPostC.getLimitPostSv(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed getPost Controller" + error,
    });
  }
};

export const getNewPost = async (req, res) => {
  try {
    const response = await getPostC.getNewPostSv();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getNewPost controller!",
    });
  }
};
export const createNewPost = async (req, res) => {
  const {
    categoryCode,
    priceCode,
    address,
    areaCode,
    title,
    label,
    description,
  } = req.body;
  const { id } = req.user;
  try {
    if (
      !categoryCode ||
      !priceCode ||
      !address ||
      !areaCode ||
      !title ||
      !id ||
      !label
    ) {
      return res.status(400).json({
        err: -1,
        msg: "Missing input!!",
      });
    }
    const response = await getPostC.createNewPostSV(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at createNewPost!!" + error,
    });
  }
};
export const getPostLimitAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id) {
      return res.status(400).json({
        err: -1,
        msg: "Miss input!",
      });
    }
    const response = await getPostC.getPostLimitAdminSV(page, id, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getPostLimitAdmin!" + error,
    });
  }
};
export const delePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id) {
      return res.status(400).json({
        err: -1,
        msg: "Missing input!",
      });
    }
    const response = await getPostC.delePostSV(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at delete!" + error,
    });
  }
};
