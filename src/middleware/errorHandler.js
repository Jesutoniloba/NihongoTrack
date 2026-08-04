const errorHandling = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
  });
};

export default errorHandling;
