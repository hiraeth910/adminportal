export interface WithdrawalRecord {
    withdrawl_id: number;
    amount: number;
    provider:number;
    withdrawl_created_at: string; // Formatted as 'yyyy-MM-dd HH:mm:ss'
    bank_name: string;
    bank: string;
    acno: string;
    ifsc: string;
}

export interface WithdrawalResponse {
    data?: WithdrawalRecord[];
    last_seen_id?: number;
    top_id?: number;
    message?: string;
}