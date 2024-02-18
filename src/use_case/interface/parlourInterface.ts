import Parlour from "../../domain/parlour"


interface ParlourRepository{
    saveParlour(parlour:Parlour):Promise<any>,
    findByEmail(email:string):Promise<any>
}

export default ParlourRepository