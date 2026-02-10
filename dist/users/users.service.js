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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb_service_1 = require("../dynamodb/dynamodb.service");
let UsersService = class UsersService {
    constructor(dynamodbService) {
        this.dynamodbService = dynamodbService;
        this.tableName = 'Users';
    }
    async findAll() {
        const client = this.dynamodbService.getClient();
        const result = await client.send(new lib_dynamodb_1.ScanCommand({
            TableName: this.tableName,
        }));
        return (result.Items ?? []);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dynamodb_service_1.DynamodbService])
], UsersService);
//# sourceMappingURL=users.service.js.map