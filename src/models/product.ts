export class Product {
  id: number;
  name: string;
  description: string;
  amount: number;
  image: string;
  date?: string;      // npr. "05.10.2025"
  time?: string;      // npr. "20:30"
  price?: number;     // npr. 2500
  location?: string;  // npr. "Štark Arena, Beograd"

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


