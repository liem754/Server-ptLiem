import * as getProvinceSV from "../services/province";
export const getProvince = async (req, res) => {
  try {
    const response = await getProvinceSV.getProvinceSV();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getProvince Controller!" + error,
    });
  }
};
