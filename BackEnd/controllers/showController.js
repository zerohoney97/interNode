const { Show } = require("../models");

exports.enrollShow = async (req, res) => {
  try {
    const { title, content, price,duration } = req.body;
    const { filename } = req.file;
    const array = [content, duration];
    const stringArray = JSON.stringify(array);
    await Show.create({
      title,
      content: stringArray,
      img: filename,
      price,
    });
  } catch (error) {
    console.log(error);
  }
};
