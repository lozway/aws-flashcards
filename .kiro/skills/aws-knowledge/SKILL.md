---
name: aws-knowledge
description: AWS service reference data including categories, key facts, and use cases. Use when generating flash card content or grounding GenAI prompts about AWS services.
---

# AWS Service Reference

## Categories
- **Compute**: EC2, Lambda, ECS, EKS, Fargate
- **Storage**: S3, EBS, EFS, Glacier
- **Database**: RDS, DynamoDB, ElastiCache, Aurora, Redshift
- **Networking**: VPC, CloudFront, Route 53, API Gateway, ELB
- **Messaging**: SNS, SQS, EventBridge, Kinesis
- **Security**: IAM, KMS, Secrets Manager, WAF, Shield
- **Monitoring**: CloudWatch, X-Ray, CloudTrail

## Key Facts Per Service

### EC2
- Virtual servers in the cloud
- Instance types: General (t3, m5), Compute (c5), Memory (r5), GPU (p3)
- Billing: On-Demand, Reserved (up to 75% savings), Spot (up to 90% savings)
- AMI = Amazon Machine Image (OS + software snapshot)

### S3
- Object storage, unlimited capacity, 11 9s durability
- Max object size: 5 TB (multipart upload required >100 MB recommended)
- Storage classes: Standard, IA, One-Zone-IA, Glacier, Glacier Deep Archive
- Globally unique bucket names

### Lambda
- Serverless functions, max 15 min timeout, up to 10 GB memory
- Triggers: API Gateway, S3, DynamoDB Streams, SNS, SQS, EventBridge
- Cold start mitigation: Provisioned Concurrency
- Concurrency limit: 1,000 by default (soft limit)

### RDS
- Managed relational DB: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora
- Multi-AZ for HA, Read Replicas for scaling reads
- Automated backups, max 35-day retention

### DynamoDB
- Serverless NoSQL key-value + document store
- Single-digit ms latency at any scale
- Partition key (required) + Sort key (optional) = primary key
- On-demand or provisioned capacity; DAX for microsecond caching

### IAM
- Identity and Access Management — no cost
- Principle of least privilege
- Key concepts: Users, Groups, Roles, Policies (identity-based vs resource-based)
- Root account: only for initial setup; use MFA

### VPC
- Logically isolated network in AWS
- Subnets: Public (internet-facing) vs Private
- NAT Gateway: lets private subnets reach internet
- Security Groups (stateful) vs NACLs (stateless)

### CloudFront
- Global CDN with 450+ edge locations
- Integrates with S3, ALB, API Gateway, custom origins
- Signed URLs/Cookies for private content

### API Gateway
- Managed REST, HTTP, and WebSocket APIs
- Integrates with Lambda, HTTP backends, AWS services
- Throttling, caching, authorization (Cognito, Lambda authorizers)

### SNS
- Pub/Sub messaging, push-based
- Fan-out pattern: one message → many subscribers (SQS, Lambda, email, SMS)

### SQS
- Managed message queue, pull-based
- Standard (best-effort ordering) vs FIFO (exactly-once, 300 TPS)
- Visibility timeout prevents double-processing

### ECS / EKS
- ECS: AWS-native container orchestration (Fargate or EC2 launch types)
- EKS: Managed Kubernetes; bring existing K8s workloads

### Route 53
- DNS service + domain registration
- Routing policies: Simple, Weighted, Latency, Failover, Geolocation, Multi-value

### CloudWatch
- Metrics, logs, alarms, dashboards
- Default metrics every 5 min (1 min with detailed monitoring)
- CloudWatch Logs Insights for log querying
