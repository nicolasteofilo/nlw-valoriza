import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import ListUserSendComplimentsController from "./controllers/ListUserSendComplimentsController";
import ListUserReceiverComplimentsController from "./controllers/ListUserReceiverComplimentsController";
import ListTagController from "./controllers/ListTagsController";
import ListUserController from "./controllers/ListUserController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listReceiveSendComplimentsController = new ListUserReceiverComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get('/users/compliments/send',ensureAuthenticated, listUserSendComplimentsController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listReceiveSendComplimentsController.handle)

router.get('/tags',ensureAuthenticated, listTagController.handle)

router.get('/users',ensureAuthenticated, listUserController.handle)

export { router };
