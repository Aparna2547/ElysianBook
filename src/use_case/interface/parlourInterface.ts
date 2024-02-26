import Parlour from "../../domain_entites/parlour"

interface ParlourRepository{
    saveParlour(parlour:Parlour):Promise<any>,
    findByEmail(email:string):Promise<any>,
    changePassword(email:string,password:string):Promise<any>
}

export default ParlourRepository