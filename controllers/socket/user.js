const Cart = require("../../models/cart")
const User = require("../../models/user")
const CartItem = require("../../models/cart-item")

exports.addProductToCart = async (data, user) => {
  const userId = user?.user_id
  const findCart = await Cart.findOne({ userId })
  let cartId
  if (!findCart) {
    const newCart = new Cart({
      userId,
    })
    const cart = await newCart.save()
    cartId = cart._id
  } else {
    cartId = findCart._id
  }
  const isAlredyAdded = await CartItem.findOne({
    productId: data?._id,
  })
  if (isAlredyAdded) {
    isAlredyAdded.quantity = isAlredyAdded.quantity + 1
    isAlredyAdded.totalAmount = isAlredyAdded.totalAmount + data.price
    await isAlredyAdded.save()
  } else {
    const newCartItem = new CartItem({
      cartId: cartId,
      productId: data._id,
      quantity: data.quantity,
      totalAmount: data?.price,
    })
    await newCartItem.save()
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        cartId,
      }
    )
  }
}

exports.removeProductFromCart = async (data, user) => {
  const userId = user?.user_id
  const findCart = await Cart.findOne({ userId })
  const findItem = await CartItem.findOne({
    productId: data?._id,
    cartId: findCart?._id,
  })

  if (findItem.productId[0] === data._id) {
    if (findItem.quantity === 1) {
      await CartItem.findOneAndDelete({
        productId: data?._id,
        cartId: findCart?._id,
      })
    } else {
      findItem.quantity = findItem.quantity - 1
      findItem.totalAmount = findItem.totalAmount - data.price
      await findItem.save()
    }
  }
}
exports.getAllCartProduct = async (user) => {
  const userId = user?.user_id
  const cartId = await Cart.findOne({ userId })

  if (cartId) {
    const cartItem = await CartItem.find({ cartId: cartId._id }).populate(
      "productId"
    )
    return cartItem
  }
}
