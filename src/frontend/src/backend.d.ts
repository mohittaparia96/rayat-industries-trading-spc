import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    message: string;
    timestamp: Time;
    senderName: string;
    senderEmail: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<ContactSubmission>>;
    submitContactForm(senderName: string, senderEmail: string, message: string): Promise<void>;
}
