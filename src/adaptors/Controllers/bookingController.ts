import {Request,Response} from "express"
import Bookingusecase from '../../use_case/bookingUseCase'
import jwt, { JwtPayload } from 'jsonwebtoken';


class bookingController{
    private bookingusecase:Bookingusecase
    constructor(bookingusecase:Bookingusecase){
        this.bookingusecase = bookingusecase
    }



    async createBooking(req:Request,res:Response){
        try {
            console.log('hello inside booking controller')
            let userId ;
            const token = req.cookies.userJWT
            if(token){
                const decoded =  jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }
           const parlourId  = req.query.id as string;
        //    console.log('user-',userId,'parlour',parlourId)
           const {bookingDetails} = req.body
           bookingDetails.parlourId = parlourId
           bookingDetails.userId = userId
           console.log(bookingDetails)

        } catch (error) {
            console.log(error);
            
        }
    }
}

export default bookingController