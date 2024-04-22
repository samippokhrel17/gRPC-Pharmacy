"use strict";
(() => {
  const { dbHelper } = require("../../helper");
  module.exports = async (call, callback) => {
    let connection;
    try {
      let response = { status: false, message: "Create Failed" };
      let insert = {
        firstName: call.firstName,
        lastName: call.lastName,
        contact: call.contact,
      };
      const [rows] = await dbHelper.query(
        `insert into customer set ? `,
        insert
      );
      if (rows.insertId > 0) {
        response.status = true;
        response.message = "Created Successfully";
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      if (connection) dbHelper.releaseConnection(connection);
    }
  };
})();
