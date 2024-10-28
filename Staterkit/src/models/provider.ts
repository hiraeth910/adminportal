// ProviderDetails.ts
export interface ProviderDetails {
    request_id: number;
    provider_id: number;
    pan: string;
    image: string;
    name: string;
    verified: boolean;
}

// Extended response interface
export interface ProviderDetailsResponse {
    data: ProviderDetails[];
    last_seen_id?: number; // Optional if it's not provided
    top_id?: number;   
}
