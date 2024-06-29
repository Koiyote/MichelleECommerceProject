export class Product {
   constructor(public id: number,
              public sku: string,
              public name: string,
               public description: string,
               public unitPrice: number,
               public image_url: String,
               public active: boolean,
               public unitsInStock: number,
               public dateCreated: Date,
               public lastUpdated: Date){}

}
