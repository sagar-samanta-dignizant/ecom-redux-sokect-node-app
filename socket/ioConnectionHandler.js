const {
  addProduct,
  updateProduct,
  deleteProduct,
  getSelectedproduct,
  login,
  getAllProduct,
  getUserDetails,
  addCupon,
  getCuponData,
  verifyToken,
} = require("../controllers/socket/admin")
const {
  addProductToCart,
  getAllCartProduct,
  removeProductFromCart,
} = require("../controllers/socket/user")
const { authenticate } = require("../middleware/authentication")
const { client, server } = require("./events/events")
const { onInitSocket } = require("./onInitSocket")
let users = []

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId })
  }
}
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId)
}
exports.ioConnectionHandler = async (socket) => {
  await onInitSocket(socket)

  socket.on(client.TYPPING_STARTED, () => {
    socket.broadcast.emit(server.TYPPING_STARTED_BY_USER)
  })
  socket.on(client.TYPPING_STOPPED, () => {
    socket.broadcast.emit(server.TYPPING_STOPPED_BY_USER)
  })
  socket.on(client.LOGIN, async (data, cb) => {
    addUser(data.email, socket.id)
    const val = await login(data)
    cb(val)
  })
  socket.on(client.ADD_PRODUCT, async (data, token) => {
    // const user = await authenticate(token)
    // data.requestUserId = user?.user_id
    addProduct(data)
  })
  socket.on(client.UPDATE_PRODUCT, async (data, token) => {
    const user = await authenticate(token)
    data.requestUserId = user?.user_id
    updateProduct(data)
  })
  socket.on(client.REMOVE_PRODUCT, async (data, token) => {
    const user = await authenticate(token)
    data.requestUserId = user?.user_id
    deleteProduct(data)
  })
  socket.on(client.VIEW_PRODUCT, async (data, cb) => {
    const recvData = await getSelectedproduct(data)
    cb(recvData[0])
  })
  socket.on(client.GET_ALL_PRODUCT, async (recvData, cb) => {
    const products = await getAllProduct()
    cb(products)
  })
  socket.on(client.GET_USER_DETAILS, async (recvData, cb) => {
    const user = await authenticate(recvData)

    const data = await getUserDetails(user?.user_id)
    cb(data)
  })
  socket.on(client.INSERT_PRODUCT_TO_CART, async (recvData, token) => {
    const user = await authenticate(token)
    await addProductToCart(recvData, user)
  })
  socket.on(client.REMOVE_PRODUCT_FROM_CART, async (recvData, token) => {
    const user = await authenticate(token)
    await removeProductFromCart(recvData, user)
  })
  socket.on(client.GET_CART_ITEM, async (recvData, token, cb) => {
    console.log("called")
    const user = await authenticate(token)
    const data = await getAllCartProduct(user)
    cb(data)
  })
  socket.on(client.CREATE_CUPON_CODE, async (data) => {
    await addCupon(data)
  })
  socket.on(client.GET_CUPON_CODE, async (recvdata, cb) => {
    const cupon = await getCuponData()
    console.log(cupon)
    cb(cupon)
  })
  socket.on(client.VERIFY_COUPON, async (recvdata, cb) => {
    const data = await verifyToken(recvdata)
    cb(data)
  })
  socket.on("disconnect", () => {
    console.log("Disconncted User :", socket.id)
    removeUser(socket.id)
  })
}
