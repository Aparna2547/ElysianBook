interface Ijwt{
    // createJwt(userId:string,role:string):string

    generateAccessToken(userId:string,role:string):string,
    generateRefreshToken(userId:string,role:string):string
}

export default Ijwt