"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb_service_1 = require("../dynamodb/dynamodb.service");
const crypto_1 = require("crypto");
const lib_dynamodb_2 = require("@aws-sdk/lib-dynamodb");
let TasksService = class TasksService {
    constructor(dynamodbService) {
        this.dynamodbService = dynamodbService;
        this.tableName = 'Tasks';
    }
    async findAll() {
        const client = this.dynamodbService.getClient();
        const command = new lib_dynamodb_1.ScanCommand({
            TableName: this.tableName,
        });
        const result = await client.send(command);
        return result.Items ?? [];
    }
    async create(dto) {
        const client = this.dynamodbService.getClient();
        const task = {
            taskId: (0, crypto_1.randomUUID)(),
            title: dto.title,
            description: dto.description,
            dueDate: dto.dueDate,
            creator: dto.creator,
            assignee: dto.assignee,
            status: dto.status ?? 'pending',
            createdAt: Math.floor(Date.now() / 1000),
        };
        const command = new lib_dynamodb_2.PutCommand({
            TableName: this.tableName,
            Item: task,
        });
        await client.send(command);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map