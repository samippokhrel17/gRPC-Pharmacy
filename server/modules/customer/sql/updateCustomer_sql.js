// "use strict";

// const httpStatus = require("http-status");

// (() => {
//   const { dbHelper } = require("../../../helper");
//   module.exports = async (call, callback) => {
//     try {
//       let response = {
//         status: httpStatus.BAD_REQUEST,
//         message: "Data Not found",
//       };

//       let insert = [
//         call.approved_medicine,
//         call.quantity_given,
//         call.customerId,
//       ];
//       let query = await dbHelper.query(
//         `
//         UPDATE grpc_pharmacy.customer SET approved_medicine = ?,
//         quantity_given = ? where customer_id =?`,
//         insert
//       );
//       const [result] = await dbHelper.executeQuery(query);

//       if (result && result.length > 0) {
//         (response.status = httpStatus.OK),
//           (response.message = "Custome Data updated succesfully"),
//           (response.customer = result);
//       }
//       return response;
//     } catch (error) {
//       console.error(error);
//       return callback.status(500).json({ error: "Internal Server Error" });
//     }
//   };
// })();

"use strict";
(() => {
  const { dbHelper } = require("../../../helper");
  module.exports = async (call, callback) => {
    let connection;
    try {
      let response = { status: false, message: "Create Failed" };
      let insert = {
        approved_medicine: call.approved_medicine,
        quantity_given: call.quantity_given,
        customerId: call.customerId,
      };

          let query = await dbHelper.query(
//         `
//         UPDATE grpc_pharmacy.customer SET approved_medicine = ?,
//         quantity_given = ? where customer_id =?`,
//         insert
//       );







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
