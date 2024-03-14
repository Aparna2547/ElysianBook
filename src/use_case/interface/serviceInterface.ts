interface IServiceRepository{
findService(serviceName:string):Promise<any>,
saveService(serviceName:string,category:string,duration:string,image:string):Promise<any>,
categoriesToShow():Promise<any>;
}
export default IServiceRepository