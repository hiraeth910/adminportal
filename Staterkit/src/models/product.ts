// types.ts
export interface NewProduct {
    id: number;
    prod_id: number;
    ppu: number;
    channel_name: string;
    type: string;
    channel: boolean;
    displaytext: string;
    createdon: Date; // Changed to Date type to represent a timestamp
    image: string | null; // Image can be null
}
