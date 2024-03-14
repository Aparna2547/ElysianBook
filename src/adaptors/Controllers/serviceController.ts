import {Request,Response} from "express"
import Serviceusecase from "../../use_case/serviceUseCase"



class serviceController{
    private servicecase : Serviceusecase
    constructor(servicecase: Serviceusecase){
        this.servicecase = servicecase
    }

  async addService(req:Request,res:Response){
    try {
        console.log('inside service controller');
        console.log(req.body);
        
        const image= req.file as object;
        // const serviceName = req.body.serviceName as string;
        // const category = req.body.category as string
        // const duration = req.body.duration as string
        const {serviceName,category,duration} = req.body

        console.log(serviceName,category,duration,image)

        // const newService = await this.servicecase.addService(serviceName,category,duration,image)
        // res.status(200).json(newService)
        
    } catch (error) {
        console.log(error);
        
    }
  }

  async categoriesToShow(req:Request,res:Response){
    try {
      console.log('controlleer ')
      const showCategories = await this.servicecase.categoriesToShow()
      res.status(200).json(showCategories)
    } catch (error) {
      
    }
  }
}

export default serviceController