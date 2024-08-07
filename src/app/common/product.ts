export class Product {
   constructor(public id: String,
              public sku: string,
              public name: string,
               public description: string,
               public unitPrice: number,
               public image_url: string,
               public active: boolean,
               public unitsInStock: number,
               public dateCreated: Date,
               public lastUpdated: Date){}

}
