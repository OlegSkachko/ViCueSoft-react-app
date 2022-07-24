export interface IBeer {
    id: number;
    name: string;
    image_url?: string;
    tagline?: string;
    description: string;
    abv?: string;
    food_pairing: string[];
}