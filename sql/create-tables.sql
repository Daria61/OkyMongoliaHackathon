CREATE SEQUENCE oky_mn.about_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483646 START 1 CACHE 1;

CREATE TABLE "oky_mn"."about" (
    "id" integer DEFAULT nextval('oky_mn.about_id_seq') NOT NULL,
    "json_dump" character varying NOT NULL,
    "timestamp" timestamp NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "about_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.about_banner_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483646 START 1 CACHE 1;

CREATE TABLE "oky_mn"."about_banner" (
    "id" integer DEFAULT nextval('oky_mn.about_banner_id_seq') NOT NULL,
    "image" character varying NOT NULL,
    "timestamp" timestamp NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "about_banner_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.analytics_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "oky_mn"."analytics" (
    "id" integer DEFAULT nextval('oky_mn.analytics_id_seq') NOT NULL,
    "type" character varying NOT NULL,
    "payload" json NOT NULL,
    "metadata" json NOT NULL,
    "date_created" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_cc3f23b88a99dbd75748995bc44" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.app_event_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "oky_mn"."app_event" (
    "id" integer DEFAULT nextval('oky_mn.app_event_id_seq') NOT NULL,
    "local_id" uuid NOT NULL,
    "type" character varying NOT NULL,
    "payload" json NOT NULL,
    "metadata" json NOT NULL,
    "user_id" character varying,
    "created_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "PK_2107093522d011af5866f5c7b8b" PRIMARY KEY ("id"),
    CONSTRAINT "UQ_b5ad7953934db4391d65a852736" UNIQUE ("local_id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."article" (
    "id" uuid NOT NULL,
    "category" character varying NOT NULL,
    "subcategory" character varying NOT NULL,
    "article_heading" character varying NOT NULL,
    "article_text" character varying NOT NULL,
    "date_created" timestamp DEFAULT now() NOT NULL,
    "live" boolean NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_8a87b738cfed36d3df1ae29f6f8" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."avatar_messages" (
    "id" uuid NOT NULL,
    "content" character varying NOT NULL,
    "live" boolean NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_caa28febed46e7e9cc603ba6336" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."category" (
    "id" uuid NOT NULL,
    "title" character varying NOT NULL,
    "primary_emoji" character varying NOT NULL,
    "primary_emoji_name" character varying NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_6ff10a6bb5bac58bf412a00dc8e" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."did_you_know" (
    "id" uuid NOT NULL,
    "title" character varying NOT NULL,
    "content" character varying NOT NULL,
    "isAgeRestricted" boolean DEFAULT false,
    "live" boolean NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_32deb816574cba45fcf50f4b364" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.help_center_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775806 START 1 CACHE 1;

CREATE TABLE "oky_mn"."help_center" (
    "id" integer DEFAULT nextval('oky_mn.help_center_id_seq') NOT NULL,
    "title" character varying NOT NULL,
    "caption" character varying NOT NULL,
    "contactOne" character varying NOT NULL,
    "contactTwo" character varying NOT NULL,
    "address" character varying NOT NULL,
    "website" character varying NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_b75170bf3fa752ce352ee24695e" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.notification_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "oky_mn"."notification" (
    "id" integer DEFAULT nextval('oky_mn.notification_id_seq') NOT NULL,
    "title" character varying NOT NULL,
    "content" character varying NOT NULL,
    "date_sent" character varying NOT NULL,
    "status" character varying NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_f8813f8c52a4bfe5ac252994970" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."oky_user" (
    "id" uuid NOT NULL,
    "date_of_birth" timestamp NOT NULL,
    "gender" character varying NOT NULL,
    "location" character varying NOT NULL,
    "country" character varying DEFAULT '00',
    "province" character varying DEFAULT '0',
    "store" json,
    "nameHash" character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    "memorableQuestion" character varying NOT NULL,
    "memorableAnswer" character varying NOT NULL,
    CONSTRAINT "PK_d6e1a97b8ab1251cdfa1e96cfae" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE SEQUENCE oky_mn.permanent_notification_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "oky_mn"."permanent_notification" (
    "id" integer DEFAULT nextval('oky_mn.permanent_notification_id_seq') NOT NULL,
    "message" character varying NOT NULL,
    "isPermanent" boolean NOT NULL,
    "live" boolean NOT NULL,
    "lang" character varying NOT NULL,
    "versions" character varying NOT NULL,
    CONSTRAINT "PK_fec922ab39cf369a3dc40fd75cc" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.privacy_policy_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483646 START 1 CACHE 1;

CREATE TABLE "oky_mn"."privacy_policy" (
    "id" integer DEFAULT nextval('oky_mn.privacy_policy_id_seq') NOT NULL,
    "json_dump" character varying NOT NULL,
    "timestamp" timestamp NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "privacy_policy_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."question" (
    "id" uuid NOT NULL,
    "question" character varying NOT NULL,
    "option1" character varying NOT NULL,
    "option2" character varying NOT NULL,
    "option3" character varying NOT NULL,
    "option4" character varying NOT NULL,
    "option5" character varying NOT NULL,
    "response" character varying NOT NULL,
    "is_multiple" boolean DEFAULT true,
    "next_question" json NOT NULL,
    "sort_number" character varying NOT NULL,
    "surveyId" uuid NOT NULL
) WITH (oids = false);

CREATE TABLE "oky_mn"."quiz" (
    "id" uuid NOT NULL,
    "topic" character varying NOT NULL,
    "question" character varying NOT NULL,
    "option1" character varying NOT NULL,
    "option2" character varying NOT NULL,
    "option3" character varying NOT NULL,
    "right_answer" character varying NOT NULL,
    "wrong_answer_response" character varying NOT NULL,
    "right_answer_response" character varying NOT NULL,
    "isAgeRestricted" boolean DEFAULT false,
    "live" boolean NOT NULL,
    "date_created" timestamp DEFAULT now() NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_d431cff50cfee5d1bf2b4a78bd4" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."subcategory" (
    "id" uuid NOT NULL,
    "title" character varying NOT NULL,
    "parent_category" character varying NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_35c7f127f3a4e0e26e2f46746ff" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."suggestion" (
    "id" uuid NOT NULL,
    "name" character varying NOT NULL,
    "dateRec" character varying NOT NULL,
    "organization" character varying NOT NULL,
    "platform" character varying NOT NULL,
    "reason" character varying NOT NULL,
    "email" character varying NOT NULL,
    "status" character varying NOT NULL,
    "content" character varying NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "PK_753936e5595250a6f94ef15273a" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE TABLE "oky_mn"."survey" (
    "id" uuid NOT NULL,
    "question" character varying NOT NULL,
    "option1" character varying NOT NULL,
    "option2" character varying NOT NULL,
    "option3" character varying NOT NULL,
    "option4" character varying NOT NULL,
    "option5" character varying NOT NULL,
    "response" character varying NOT NULL,
    "live" boolean NOT NULL,
    "date_created" timestamp DEFAULT now() NOT NULL,
    "lang" character varying NOT NULL,
    "isAgeRestricted" boolean DEFAULT false,
    "is_multiple" boolean DEFAULT true,
    CONSTRAINT "PK_6b410aa92ebd6c5e429c8c7555f" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.terms_and_conditions_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483646 START 1 CACHE 1;

CREATE TABLE "oky_mn"."terms_and_conditions" (
    "id" integer DEFAULT nextval('oky_mn.terms_and_conditions_id_seq') NOT NULL,
    "json_dump" character varying NOT NULL,
    "timestamp" timestamp NOT NULL,
    "lang" character varying NOT NULL,
    CONSTRAINT "terms_and_conditions_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

CREATE SEQUENCE oky_mn.user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

CREATE TABLE "oky_mn"."user" (
    "id" integer DEFAULT nextval('oky_mn.user_id_seq') NOT NULL,
    "username" character varying NOT NULL,
    "password" character varying NOT NULL,
    "lang" character varying NOT NULL,
    "date_created" character varying DEFAULT 'now()' NOT NULL,
    "type" character varying NOT NULL,
    CONSTRAINT "PK_6cb7c14d28b65103f54c5b538f1" PRIMARY KEY ("id")
) WITH (oids = false);

ca.sortingKey

CREATE OR REPLACE VIEW "oky_mn"."answered_surveys" AS SELECT (oky_mn.app_event.payload ->> 'id'::text) AS id,
    (oky_mn.app_event.payload ->> 'questions'::text) AS question,
    (oky_mn.app_event.payload ->> 'answerID'::text) AS answerid,
    (oky_mn.app_event.payload ->> 'answer'::text) AS answer,
    (oky_mn.app_event.payload ->> 'utcDateTime'::text) AS date,
    (oky_mn.app_event.payload ->> 'isCompleted'::text) AS iscompleted,
    (oky_mn.app_event.payload ->> 'isSurveyAnswered'::text) AS issurveyanswered,
    (oky_mn.app_event.payload ->> 'user_id'::text) AS user_id, -- Changed from 'userID' to 'user_id'
    (oky_mn.app_event.payload ->> 'questions'::text) AS questions
FROM oky_mn.app_event
WHERE ((oky_mn.app_event.type)::text = 'ANSWER_SURVEY'::text);