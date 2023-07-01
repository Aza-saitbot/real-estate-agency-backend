
export class CreateApartmentDto {
    readonly title:string
    readonly currency:string
    readonly price:number
    readonly address:string
    readonly employeeId:number
    readonly categoryId:number
    images: string[]
    apartmentInfos:string
}