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
      const search = req.query.search as string
      const page = parseInt(req.query.page as string)
      const showAllServices = await this.servicecase.showAllServices(search,page)
      res.status(200).json(showAllServices)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  //edit services
  async editService(req:Request,res:Response){
    try {
      console.log("inside edit service controller")
      const serviceName = req.body.serviceName;
      console.log('servicename:' ,serviceName)
      const {category,duration,price,description} = req.body;
      const id = req.query.id as string
      const image = req.file as object
      console.log(id,serviceName,category,duration,price,description,image);
      const serviceFound = await this.servicecase.editService(id,serviceName,category,duration,price,description,image)
      res.status(200).json(serviceFound)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  //list services
  async listService(req:Request,res:Response){
    try { 
      const id = req.query.id as string
      console.log('controller,id',id);
      const serviceData = await this.servicecase.listService(id)
      res.status(200).json(serviceData)
      
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default serviceController