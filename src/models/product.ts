export class Product {
  id: number;
  name: string;
  description: string;
  amount: number;
  image: string;
  date?: string;      
  time?: string;      
  price?: number;     
  location?: string;

  constructor(
    id: number,
    name: string,
    description: string,
    amount: number,
    image: string,
    date?: string,
    time?: string,
    price?: number,
    location?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.image = image;
    this.date = date;
    this.time = time;
    this.price = price;
    this.location = location;
  }
}


