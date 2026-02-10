import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export declare class DynamodbService {
    private client;
    constructor();
    getClient(): DynamoDBDocumentClient;
}
