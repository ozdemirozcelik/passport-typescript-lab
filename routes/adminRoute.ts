import express, { Request, Response } from 'express';
import { ensureAuthenticatedAsAdmin } from '../middleware/checkAuth';

const router = express.Router();

router.get("/", ensureAuthenticatedAsAdmin, (req, res) => {

  // console.log("*************activeSessions");
  // console.log(activeSessions);
  // const sessionList = Object.values(activeSessions).map((session: any) => ({
  //   id: session.id,
  //   userId: session.userId,
  // }));

  res.render("admin", {
    user: req.user,
    // sessionList: sessionList,
  });
});


router.get('/revoke/:userId', ensureAuthenticatedAsAdmin, (req: Request, res: Response) => {

    req.session.destroy((err: any) => {
      if (err) {
        //log
        console.error('Failed to revoke session:', err);
      }
      res.redirect('/admin');
    });

});


export default router;
