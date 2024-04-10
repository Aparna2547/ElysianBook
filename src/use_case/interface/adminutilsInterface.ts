interface IAdminutilsRepository{

    addFacility(facility:string):Promise<any>,
    allFacilities():Promise<any>,
    addBanner(imageLink:any):Promise<any>,
    getBanners():Promise<any>,
    deleteBanner(banner:string):Promise<any>

}

export default IAdminutilsRepository