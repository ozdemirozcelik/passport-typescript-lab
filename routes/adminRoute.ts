import express, { Request, Response } from 'express';
import { ensureAuthenticatedAsAdmin } from '../middleware/checkAuth';
import activeSessions from '../app';
import { getUserById} from "../controllers/userController";

const router = express.Router();


router.get("/", ensureAuthenticatedAsAdmin, (req, res) => {

  console.log("-ADMIN----Active sessions:");
  console.log(activeSessions);
  console.log("--------------------------");

  const activeUsers: { [key: string]: string } = {};

  activeSessions.forEach((userObject: any, id: string) => {

  if (!(typeof userObject === "undefined")) {
    let userDetails = getUserById(Number(userObject.user));
    activeUsers[id] = userDetails;
  }
  
  });
  console.log(activeUsers);

  res.render("admin", {
    user: req.user,
    activeUsers: activeUsers,
  });

});


router.get('/revoke', ensureAuthenticatedAsAdmin, (req, res) => {

  const sessionId = req.query.session as string;

  // Access the session store
  const sessionStore = req.sessionStore;

  // Find the session by session ID
  sessionStore.get(sessionId, (error, session) => {
    if (error) {
      // Handle the error appropriately
      console.error('Error retrieving session:', error);
      res.status(500).send('Error retrieving session');
      return;
    }

    if (!session) {
      // Session not found
      res.status(404).send('Session not found');
      return;
    }

    // Revoke the session by destroying it
    sessionStore.destroy(sessionId, (error) => {
      if (error) {
        // Handle the error appropriately
        console.error('Error revoking session:', error);
        res.status(500).send('Error revoking session');
        return;
      }

      // Update session Map
      activeSessions.delete(sessionId);

      // Session revoked successfully
      res.redirect("/admin");
    });
  });

});


export default router;
