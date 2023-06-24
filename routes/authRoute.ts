import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

// add github login endpoint here
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] })); // send back email
// github to send back data to this endpoint after user logs in
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/login' }), (req, res) => {
  res.redirect('/dashboard');
});


router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { errorMessage: req.flash('error')[0] });
})


router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    // The failureMessage: true option indicates that the failure message should be stored in the req.flash object
    failureFlash: true,
  }));

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
