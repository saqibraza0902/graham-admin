export enum RoleEnum {
    USER = 'USER',
    ADMIN = "ADMIN"
}
export interface IUser {
    _id: string
    country: string
    email: string
    phoneNumber: string
    role: RoleEnum
    city: string
    fullName: string
    state: string
    username: string
    zip_code: string
    profile_image: string
}
