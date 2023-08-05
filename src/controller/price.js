import * as priceController from "../services/price";
export const getPrice = async (req, res) => {
  try {
    const response = await priceController.getPriceSV();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getPrice Controller!" + error,
    });
  }
};
