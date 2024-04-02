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


    //     async confirmBooking(req:Request,res:Response){
    //         try {
    //             // console.log('controleerr',req.app.locals.bookingDetails);
    //             console.log('jijijij');
                
    //         //   console.log(req.body.data.object.payment_intent);
    //         const bookingDetails = req.app.locals.bookingDetails
    //         bookingDetails.payment_intent = req.body.data.object.payment_intent;
    //         console.log(bookingDetails);
            


    //       if(req.body.data.object.status=='complete'){
    //         const confirmBooking = await this.bookingusecase.confirmBooking(bookingDetails)
    //         res.status(200).json(confirmBooking)
    //       }
            
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    async confirmBooking(req: Request, res: Response) {
        try {
            console.log('jijijij');
    
            // Ensure bookingDetails is initialized
            let bookingDetails = req.app.locals.bookingDetails;
            if (!bookingDetails) {
                // Initialize bookingDetails if it's not already set
                bookingDetails = {}; // Or set it to a default object structure
                req.app.locals.bookingDetails = bookingDetails;
            }
    
            // Now you can safely set the payment_intent property
            bookingDetails.payment_intent = req.body.data.object.payment_intent;
            console.log(bookingDetails);
    
            if (req.body.data.object.status == 'complete') {
                const confirmBooking = await this.bookingusecase.confirmBooking(bookingDetails);
                res.status(200).json(confirmBooking);
            }
        } catch (error) {
            console.log(error);
            // Consider sending an error response here
            res.status(500).json({ error: 'An error occurred while confirming the booking.' });
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

    async cancelBooking(req:Request,res:Response){
        try{
            console.log('helloooooo')
            const reason = req.body.reason as string
            const bookingId = req.query.bookingId as string
            console.log(reason,bookingId);
            const cancelBooking = await this.bookingusecase.cancelBooking(bookingId,reason)
            res.status(200).json(cancelBooking)
            
        }catch(error){
            console.log(error)
        }
    }


    //for showing all bookings
async allBookings(req:Request,res:Response){
    try {
        let parlourId ;
        const token = req.cookies.vendorJWT
        if(token){
            const decoded =  jwt.verify(token,process.env.JWT_KEY as string) as JwtPayload;
            parlourId = decoded.id
        }
        console.log(parlourId)
        const page =parseInt(req.query.page as string)
        const bookingDetails = await this.bookingusecase.allBookings(parlourId,page)
        res.status(200).json(bookingDetails)
    } catch (error) {
        console.log(error);
        
    }
}

//showig slots
async bookedSlots(req:Request,res:Response){
    try {
        const parlourId = req.query.parlourId as string
        const dateString = new Date(req.query.date  as string);
        console.log('daya',dateString)
        const date = dateString.toISOString().split('T')[0];
        console.log(date);
        

        // const convertedDate = new Date(date)
        // convertedDate.setDate(convertedDate.getDate()+1)
        // convertedDate.setUTCHours(0, 0, 0, 0);
        // console.log('bookeddate',convertedDate.toISOString())

        const slots = await this.bookingusecase.bookedSlots(parlourId,date)
        res.status(200).json(slots)
    } catch (error) {
        console.log(error);
        
    }
}
}

export default bookingController