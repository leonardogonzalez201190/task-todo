export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class CreateTaskDto {
    title: string;
    createdBy: string;
    description?: string;
    dueDate?: number;
    assignedTo?: string;
    status?: TaskStatus;
}
