import * as getOneControll from "../services/user";
export const getOne = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await getOneControll.getOneSV(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed getUser Controller!",
    });
  }
};
