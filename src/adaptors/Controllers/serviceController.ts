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
        // console.log(req.body);
        
        const image= req.file as object;
        
        const {serviceName,category,duration,description,price} = req.body

        console.log('cate',category)

        const newService = await this.servicecase.addService(serviceName,category,duration,description,price,image)
        res.status(200).json(newService)
        
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

  //display all services
  async showAllServices(req:Request,res:Response){
    try {
      console.log('show all services controller');
      
      const showAllServices = await this.servicecase.showAllServices()
      res.status(200).json(showAllServices)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default serviceController