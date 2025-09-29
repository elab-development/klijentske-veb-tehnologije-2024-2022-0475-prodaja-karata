
export class Product {
    id: number;
    name: string;
    description: string;
    amount: number;
    image: string;

    constructor(id: number, name: string, description: string, amount: number, image: string) {
        this.id = id;

        this.name = name;

        this.description = description;

        this.amount = amount;

        this.image = image;
    }
}



