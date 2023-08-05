import moment from "moment";
const fomatDate = (timeOJ) => {
  let day = timeOJ.getDay() === 0 ? "Chủ nhật" : `Thứ ${timeOJ.getDay() + 1}`;
  let date = `${timeOJ.getDate()}/${
    timeOJ.getMonth() + 1
  }/${timeOJ.getFullYear()}`;
  let time = `${timeOJ.getHours()}:${timeOJ.getMinutes()}`;
  return `${day}, ${time} ${date}`;
};
const generDate = () => {
  let gapExpire = Math.floor(Math.random() * 29) + 1;
  let today = new Date();
  let expireDate = moment(today).add(gapExpire, "d").toDate();
  return {
    today: fomatDate(today),
    expireday: fomatDate(expireDate),
  };
};
export default generDate;
