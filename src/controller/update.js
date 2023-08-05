import * as updateSv from "../services/update";
export const update = async (req, res) => {
  const { postId, overviewId, imageId, attributesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !overviewId || !attributesId || !imageId) {
      return res.status(400).json({
        err: -1,
        msg: "Missing input!!",
      });
    }
    const response = await updateSv.updateSV(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at Update!!" + error,
    });
  }
};
export const updateAd = async (req, res) => {
  const { userId, ...body } = req.body;
  const { id } = req.user;
  try {
    if (!id) {
      return res.status(400).json({
        err: -1,
        msg: "Mising input!",
      });
    }
    const response = await updateSv.updateAdSV(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at upDateAd!" + error,
    });
  }
};
