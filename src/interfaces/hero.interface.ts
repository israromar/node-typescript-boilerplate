interface IHero {
    id:number,
    name:string,
    aliases:Array<string>,
    occupation:string,
    gender:string,
    height:{
        ft:number,
        in:number
    },
    hair:string,
    eyes:string,
    powers:Array<string>
}
export default IHero;