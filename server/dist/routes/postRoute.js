"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreatePost_1 = __importDefault(require("../controller/postControllers/CreatePost"));
const middleware_1 = __importDefault(require("../middleware/middleware"));
const Getposts_1 = __importDefault(require("../controller/postControllers/Getposts"));
const DeletePost_1 = __importDefault(require("../controller/postControllers/DeletePost"));
const LikeUnlikePosts_1 = __importDefault(require("../controller/postControllers/LikeUnlikePosts"));
const ReplyToPosts_1 = __importDefault(require("../controller/postControllers/ReplyToPosts"));
const GetFeedPosts_1 = __importDefault(require("../controller/postControllers/GetFeedPosts"));
const getPostbyUsername_1 = __importDefault(require("../controller/postControllers/getPostbyUsername"));
const postRouter = express_1.default.Router();
postRouter.post('/create', middleware_1.default, CreatePost_1.default);
postRouter.get('/post/:id', Getposts_1.default);
postRouter.delete('/post/:id', middleware_1.default, DeletePost_1.default);
postRouter.put('/like/:id', middleware_1.default, LikeUnlikePosts_1.default);
postRouter.put('/reply/:id', middleware_1.default, ReplyToPosts_1.default);
postRouter.get('/feed', middleware_1.default, GetFeedPosts_1.default);
postRouter.get('/userpost/:username', getPostbyUsername_1.default);
exports.default = postRouter;
