"use strict";

(() => {
  const getCustomerInformationSql = require("./../sql/get_all_customer_info_sql");
  const httpStatus = require("http-status");
  module.exports = async (call, callback) => {
    try {
      let response = {
        status: httpStatus.BAD_REQUEST,
        message: "Data Not found",
      };

      const dbResponse = await getCustomerInformationSql(call.request);
      if (dbResponse.status === true) {
        response.status = httpStatus.OK;
        response.message = dbResponse.message;
        response.customer = dbResponse.customer[0];
      }
      return callback(null, dbResponse);
    } catch (error) {
      return callback(error);
    }
  };
})();
