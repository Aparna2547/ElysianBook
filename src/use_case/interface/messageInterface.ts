interface ImessageInterface{
save(data:object):Promise<any>,
getMessages(id: string): Promise<any>
getLastMessages(): Promise<any>
}
export default ImessageInterface