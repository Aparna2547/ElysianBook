import {Request,Response} from "express"
import Bookingusecase from '../../use_case/bookingUseCase'
import jwt, { JwtPayload } from 'jsonwebtoken';


class bookingController{
    private bookingusecase:Bookingusecase
    constructor(bookingusecase:Bookingusecase){
        this.bookingusecase = bookingusecase
    }



    async proceedForPayment(req:Request,res:Response){
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
        //    console.log(bookingDetails)

        //converting time to zero
        console.log(bookingDetails)

            const convertedDate = new Date(bookingDetails.date)
            convertedDate.setDate(convertedDate.getDate()+1)
            convertedDate.setUTCHours(0, 0, 0, 0);
            console.log('bookeddate',convertedDate.toISOString())

            bookingDetails.date = convertedDate.toISOString()


        //    req.app.locals.bookingDetails = bookingDetails

           const slotAvailability = await this.bookingusecase.slotAvailability(bookingDetails)

           if (!slotAvailability ) {
            return res.status(401).json({ message: "No slots available" });
        }else{
            const paymentStatus = await this.bookingusecase.proceedForPayment(bookingDetails)
            bookingDetails.seatNo = slotAvailability
            bookingDetails.paymentId = paymentStatus
            req.app.locals.bookingDetails = bookingDetails
            res.status(200).json(paymentStatus)
        }

        } catch (error) {
            console.log(error);
            
        }
    }


    async confirmBooking(req:Request,res:Response){
        try {
            console.log('controleerr',req.app.locals.bookingDetails);
          console.log(req.body);
          const bookingDetails = req.app.locals.bookingDetails

          if(req.body.data.object.status=='complete'){
            const confirmBooking = await this.bookingusecase.confirmBooking(bookingDetails)
            res.status(200).json(confirmBooking)
          }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    async allUserBooking(req:Request,res:Response){
        try {
            console.log('inside controller')
            let userId ;
            const token = req.cookies.userJWT
            if(token){
                const decoded =  jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
                userId = decoded.id
            }
            console.log('userid',userId)

            const page = req.body.page as number
            const userBookings = await this.bookingusecase.userBookings(userId,page)
            res.status(200).json(userBookings)

        } catch (error) {
            console.log(error);
            
        }
    }
}

export default bookingController