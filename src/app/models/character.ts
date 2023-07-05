export interface Character {
    name:string,
    category:{
      categoryId:string,
      category:string
    }
    image_link:string,
    description:string,
    content:string,
    isFeatures:boolean,
    powerLevel:string,
    status:string,
    createdAt:Date,
    comments: string[];
}