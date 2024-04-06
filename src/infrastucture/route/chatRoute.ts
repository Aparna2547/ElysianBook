import express from 'express'
import chatController from "../../adaptors/Controllers/chatController"
import chatUseCase from "../../use_case/chatUseCase"
import messageRepository from "../repository/messageRepository"
import conversationRepository from "../repository/conversationRepository";
import userRepository from "../repository/userRepository";


const router = express.Router()

const conversationrepository = new conversationRepository()
const messagerepository = new messageRepository()
const userrepository= new userRepository();
const chatusecase =  new chatUseCase(userrepository,conversationrepository,messagerepository)
const  chatcontroller = new chatController(chatusecase)


router.post('/newConversation',(req, res) => chatcontroller.newConversation(req,res))
router.get('/getConversation',(req, res) => chatcontroller.getConversations(req, res))
router.post('/newMessage',(req,res)=>chatcontroller.addMessage(req,res))
router.get('/getMessages',(req,res)=>chatcontroller.getMessages(req,res))
router.get('/findUserById',(req,res)=>chatcontroller.findUserById(req,res))


export default router