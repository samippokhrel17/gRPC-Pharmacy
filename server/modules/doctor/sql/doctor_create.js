"use strict";
(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {
    let connection;
    try {
      let response = { status: false, message: "Create Failed" };
      let insert = {
        firstName: call.firstName,
        lastName: call.lastName,
        email: call.email,
        specilization: call.specilization,
        contact: call.contact,
      };
      const [rows] = await dbHelper.query(`insert into doctor set ? `, insert);
      if (rows.insertId > 0) {
        response.status = true;
        response.message = "Doctor Table Created Successfully";
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      if (connection) dbHelper.releaseConnection(connection);
    }
  };
})();
