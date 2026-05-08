CREATE TABLE "pdfs" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar(10000) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"summary" varchar(10000) NOT NULL,
	"content" varchar(10000) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
