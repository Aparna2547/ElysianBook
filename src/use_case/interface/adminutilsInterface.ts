interface IAdminutilsRepository{

    addFacility(facility:string):Promise<any>,
    allFacilities():Promise<any>

}

export default IAdminutilsRepository