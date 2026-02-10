# Task Todo Backend

Backend API for the management of tasks and users, built with **NestJS**, **DynamoDB** and deployed on **AWS Elastic Beanstalk**.

---

## 📐 Architecture Overview

The application follows a **modular and decoupled architecture**, aligned with NestJS best practices.

### 🔹 Principales componentes

- **NestJS**  
  Framework principal for structuring the application (controllers, services, modules).

- **AWS DynamoDB**  
  NoSQL database used for:
  - `Tasks` → CRUD of tasks
  - `Users` → read-only (user list)

- **AWS SDK v3**  
  Access to DynamoDB using `@aws-sdk/lib-dynamodb`.

- **Elastic Beanstalk (Node.js 20)**  
  Deployment platform on AWS.

- **Jest**  
  Unit testing framework.
  npm run test

## 🌐 Deployed Service URL

The backend is deployed on **AWS Elastic Beanstalk**.

### 🔗 Base URL

```text
https://task-todo-env.eba-m9fdtti5.us-east-1.elasticbeanstalk.com/docs
```

---

### 📦 Main modules

```text
src/
├── tasks/
│   ├── dto/
│   ├── entities/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.module.ts
│   └── __tests__/
│
├── users/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── __tests__/
│
├── dynamodb/
│   ├── dynamodb.service.ts
│   └── dynamodb.module.ts
│
├── app.module.ts
└── main.ts
```

