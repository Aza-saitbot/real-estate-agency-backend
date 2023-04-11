
export class CreateApartmentDto {
    readonly title:string
    readonly currency:string
    readonly price:number
    readonly provinces:string
    readonly county:string
    readonly district:string
    readonly lat:number
    readonly lng:number
    readonly description:string
    readonly totalRooms:string
    readonly totalArea:number
    readonly totalFloors:number
    readonly locationFloor:number
    readonly heatingType:string
}