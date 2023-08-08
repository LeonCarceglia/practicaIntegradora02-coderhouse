import { Router } from "express"
import passport from "passport"

const router = Router()

router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/failureRedirect" }),
    async (req, res) => {
      res.send({ status: "success", message: "User created" })
    }
  )

  router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/failureRedirect" }),
    async (req, res) => {
      if (!req.user)
        return res.status(400).send({
          status: "failed",
          message: "User or password wrong",
        })
      req.session.user = req.user
      console.log(req.session.user)
      res.send({ status: "success", payload: req.user })
    }
  )
  
  router.get("/current", (req, res) => {
    res.send(req.session.user)
  })

  router.get("/github", passport.authenticate("github"), async (req, res) => {})

  router.get(
    "/githubcallback",
    passport.authenticate("github"),
    async (req, res) => {
      req.session.user = req.user
      res.redirect("/products")
    }
  )

export default router