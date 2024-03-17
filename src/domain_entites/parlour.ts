interface Parlour{
    id?:string,
    name:string,
    email:string,
    password:string,
    vendorImage:string,
    isBlocked:boolean,
    parlourName:string,
    landmark:string,
    locality:string,
    district:string,
    openingTime:string,
    closingTime:string,
    contact:number,
    seats:number,
    latitude:number,
    longitude:number,
    facilities:string[],
    banners:string[],
    status:string,
    
}

export default Parlour