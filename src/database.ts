import Dexie from 'Dexie';
export class TransactionAppDB extends Dexie {
  transactions : Dexie.Table<ITransaction, number>;
  constructor(){
    super("MoneyMapAppDB");

    this.version(1).stores({
      transactions: '++id,amount,lat,lng,title,imageUrl'
    });
    this.transactions.mapToClass(Transaction);
  }
}

export interface ICategory{

}
export interface ITransaction{
  id?: number,
  amount: number,
  lat: number,
  lng: number,
  title: string,
  imageUrl: string
}

export class Transaction implements ITransaction{
  id?: number;
  amount: number;
  lat: number;
  lng: number;
  title: string;
  imageUrl: string;

  constructor(amount: number,title: string, lat?: number,lng?: number, id?: number, imageUrl?: string){
    this.amount = amount;
    this.title = title;
    if(id) this.id = id;
    if(lng) this.lng = lng;
    if(lat) this.lat = lat;
    if(imageUrl) this.imageUrl = imageUrl;
  }
  save(){
    return db.transactions.add(this);
  }
  setCoords(coords){
    this.lat = coords.latitude;
    this.lng = coords.longitude;
  }
  cleanCoords(){
    this.lat = null;
    this.lng = null;
  }
  static all(){
    return db.transactions.orderBy("id").reverse().toArray();
  }
}

export let db = new TransactionAppDB();
