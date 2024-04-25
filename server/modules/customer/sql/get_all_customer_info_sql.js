"use strict";

const httpStatus = require("http-status");

(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      let query = await dbHelper.format(
        ` 
        SELECT 
    customer_id,
    firstName,
    lastName,
    contact

FROM
    grpc_pharmacy.customer
`
      );
      const [result] = await dbHelper.executeQuery(query);

      if (result && result.length > 0) {
        (response.status = httpStatus.OK),
          (response.message = "Customer Data fetch succesfully!11111111111!"),
          (response.customer = result);
      }
      return response;
    } catch (error) {
      console.error(error);
      return callback.status(500).json({ error: "Internal Server Error" });
    }
  };
})();
