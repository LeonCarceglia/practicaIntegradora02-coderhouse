import express from "express"
import CartsManager from "../dao/manager/db/carts.js"
import ProductsManager from "../dao/manager/db/products.js"

const router = express.Router()
const cartManager = new CartsManager()
const productManager = new ProductsManager()

router.get("/products", async (req, res)=> {
  const user = req.session.user
  const products = await productManager.getProductsRender()
  const productsRender = products.docs.map((item) => {
    return {
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      stock: item.stock,
      _id: item._id
    }
  })
  res.render("products", {products: productsRender, user})
})

router.get('/cart/:cid',async (req,res) => {
  const {cid} = req.params
  const cart = await cartManager.getCart(cid)
  const cartRender = cart.type.map((item) => {
    return {
      product: item.product,
      quantity: item.quantity,
    }
  })
  res.render('carts', {cart: cartRender})
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/',(req,res)=>{
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})


export default router