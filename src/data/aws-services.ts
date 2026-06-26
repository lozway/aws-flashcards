export type Category =
  | "Compute"
  | "Storage"
  | "Database"
  | "Networking"
  | "Messaging"
  | "Security"
  | "Monitoring";

export interface AWSService {
  id: string;
  name: string;
  emoji: string;
  category: Category;
  shortDesc: string;
  keyFacts: string[];
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Compute: "bg-orange-100 border-orange-400 text-orange-800",
  Storage: "bg-green-100 border-green-400 text-green-800",
  Database: "bg-blue-100 border-blue-400 text-blue-800",
  Networking: "bg-purple-100 border-purple-400 text-purple-800",
  Messaging: "bg-yellow-100 border-yellow-400 text-yellow-800",
  Security: "bg-red-100 border-red-400 text-red-800",
  Monitoring: "bg-teal-100 border-teal-400 text-teal-800",
};

export const AWS_SERVICES: AWSService[] = [
  {
    id: "ec2",
    name: "EC2",
    emoji: "🖥️",
    category: "Compute",
    shortDesc: "Virtual servers in the cloud",
    keyFacts: [
      "Instance types: General (t3/m5), Compute (c5), Memory (r5), GPU (p3)",
      "Pricing: On-Demand, Reserved (up to 75% savings), Spot (up to 90% savings)",
      "AMI = Amazon Machine Image — OS + software snapshot",
      "Elastic IPs are static public IPv4 addresses",
    ],
  },
  {
    id: "s3",
    name: "S3",
    emoji: "🪣",
    category: "Storage",
    shortDesc: "Object storage — unlimited scale, 11 nines durability",
    keyFacts: [
      "Max object size: 5 TB (multipart upload recommended >100 MB)",
      "Storage classes: Standard, IA, One-Zone-IA, Glacier, Deep Archive",
      "Bucket names are globally unique",
      "Versioning protects against accidental deletes",
    ],
  },
  {
    id: "lambda",
    name: "Lambda",
    emoji: "λ",
    category: "Compute",
    shortDesc: "Run code without managing servers",
    keyFacts: [
      "Max timeout: 15 minutes; max memory: 10 GB",
      "Triggers: API Gateway, S3, DynamoDB Streams, SNS, SQS, EventBridge",
      "Default concurrency limit: 1,000 (soft limit, can increase)",
      "Cold starts: mitigated with Provisioned Concurrency",
    ],
  },
  {
    id: "rds",
    name: "RDS",
    emoji: "🗄️",
    category: "Database",
    shortDesc: "Managed relational databases",
    keyFacts: [
      "Engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora",
      "Multi-AZ for high availability; Read Replicas for read scaling",
      "Automated backups with up to 35-day retention",
      "Aurora is up to 5× faster than MySQL, 3× faster than PostgreSQL",
    ],
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    emoji: "⚡",
    category: "Database",
    shortDesc: "Serverless NoSQL at any scale with single-digit ms latency",
    keyFacts: [
      "Primary key: Partition key (required) + Sort key (optional)",
      "On-demand or provisioned capacity modes",
      "DAX (DynamoDB Accelerator) for microsecond caching",
      "DynamoDB Streams for change data capture",
    ],
  },
  {
    id: "iam",
    name: "IAM",
    emoji: "🔐",
    category: "Security",
    shortDesc: "Control who can do what in AWS",
    keyFacts: [
      "Key entities: Users, Groups, Roles, Policies",
      "Identity-based vs resource-based policies",
      "Always use principle of least privilege",
      "Root account: only for initial setup; enable MFA immediately",
    ],
  },
  {
    id: "vpc",
    name: "VPC",
    emoji: "🌐",
    category: "Networking",
    shortDesc: "Your own isolated network in AWS",
    keyFacts: [
      "Subnets: Public (internet-facing) vs Private",
      "NAT Gateway: lets private subnets reach the internet",
      "Security Groups (stateful) vs NACLs (stateless)",
      "VPC Peering and Transit Gateway for multi-VPC connectivity",
    ],
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    emoji: "🚀",
    category: "Networking",
    shortDesc: "Global CDN with 450+ edge locations",
    keyFacts: [
      "Integrates with S3, ALB, API Gateway, custom origins",
      "Signed URLs/Cookies for private content distribution",
      "Supports HTTP/3, TLS termination at the edge",
      "Origin Shield reduces load on your origin",
    ],
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    emoji: "🔀",
    category: "Networking",
    shortDesc: "Managed REST, HTTP, and WebSocket APIs",
    keyFacts: [
      "Integrates with Lambda, HTTP backends, AWS services",
      "Built-in throttling, caching, and usage plans",
      "Authorization: Cognito, Lambda authorizers, API keys",
      "REST API vs HTTP API (HTTP API is cheaper and faster)",
    ],
  },
  {
    id: "sns",
    name: "SNS",
    emoji: "📣",
    category: "Messaging",
    shortDesc: "Pub/Sub messaging — push-based fan-out",
    keyFacts: [
      "One message → many subscribers (SQS, Lambda, email, SMS, HTTP)",
      "Fan-out pattern: decouple publishers from consumers",
      "FIFO topics preserve message ordering",
      "Message filtering with subscription filter policies",
    ],
  },
  {
    id: "sqs",
    name: "SQS",
    emoji: "📬",
    category: "Messaging",
    shortDesc: "Managed message queue — pull-based",
    keyFacts: [
      "Standard: best-effort ordering, nearly unlimited TPS",
      "FIFO: exactly-once processing, 300 TPS (3,000 with batching)",
      "Visibility timeout prevents double-processing",
      "Dead Letter Queue (DLQ) for failed messages",
    ],
  },
  {
    id: "ecs",
    name: "ECS",
    emoji: "🐳",
    category: "Compute",
    shortDesc: "AWS-native container orchestration",
    keyFacts: [
      "Launch types: Fargate (serverless) or EC2 (you manage instances)",
      "Task Definition: blueprint for containers (CPU, memory, image)",
      "Service: maintains desired count of running tasks",
      "Integrates with ALB, IAM roles per task, CloudWatch Logs",
    ],
  },
  {
    id: "eks",
    name: "EKS",
    emoji: "☸️",
    category: "Compute",
    shortDesc: "Managed Kubernetes on AWS",
    keyFacts: [
      "AWS manages the Kubernetes control plane",
      "Worker nodes: managed node groups or Fargate",
      "Fully compatible with standard Kubernetes tooling (kubectl, Helm)",
      "Use when you need Kubernetes portability or existing K8s workloads",
    ],
  },
  {
    id: "route53",
    name: "Route 53",
    emoji: "🗺️",
    category: "Networking",
    shortDesc: "Scalable DNS and domain registration",
    keyFacts: [
      "Routing policies: Simple, Weighted, Latency, Failover, Geolocation",
      "Health checks trigger automatic failover",
      "Alias records point to AWS resources (free queries)",
      "100% SLA for DNS resolution",
    ],
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    emoji: "📊",
    category: "Monitoring",
    shortDesc: "Metrics, logs, alarms, and dashboards",
    keyFacts: [
      "Default metric resolution: 5 min; Detailed Monitoring: 1 min",
      "CloudWatch Logs Insights for log querying with SQL-like syntax",
      "Alarms can trigger SNS, Auto Scaling, EC2 actions",
      "Composite alarms combine multiple alarms",
    ],
  },
];
