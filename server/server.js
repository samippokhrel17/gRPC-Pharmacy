"use strict";
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
console.log(path.resolve(process.cwd(), ".env"));
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { dbHelper } = require("./helper");
const packageDefinition = protoLoader.loadSync("./proto/pharmacy.rpc.proto", {
  keepCase: true,
  longs: "string",
  defaults: true,
});
const port = process.env.GRPC_PORT;
const server = new grpc.Server();
const simpleProto = grpc.loadPackageDefinition(packageDefinition);
// Grpc Methods
const simpleServiceCtl = require("./modules");

server.addService(simpleProto.example.pharmacy.rpc.pharmacyService.service, {
  createCustomer: simpleServiceCtl.createCustomer,
  CreateDoctor: simpleServiceCtl.createDoctor,
});

server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  async (err, port) => {
    if (err) return err;
    console.log("Server running on port ", port);

    await dbHelper.init();
  }
);
