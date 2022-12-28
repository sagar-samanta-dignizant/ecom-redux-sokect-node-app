const socket = require("../socket/socket")
const io = require("../socket/socket")
const { server } = require("./events/events")

exports.sendProductEvents = (data) => {
  io.getIo().emit(server.PRODUCT_CREATE_EVENTS, {
    action: "create",
    product: data,
  })
}
exports.updateProductEvents = (data) => {
  io.getIo().emit(server.PRODUCT_UPDATE_EVENTS, {
    action: "update",
    product: data,
  })
}
exports.deleteProductEvents = (data) => {
  io.getIo().emit(server.PRODUCT_DELETE_EVENTS, {
    action: "delete",
    product: data,
  })
}
exports.viewProductEvents = (data) => {
  io.getIo().emit(server.PRODUCT_VIEW_EVENTS, {
    action: "view",
    product: data,
  })
}
exports.sendCreatedCupon = (data) => {
  io.getIo().emit(server.SEND_CREATED_CUPON, {
    action: "cupon",
    cupon: data,
  })
}
