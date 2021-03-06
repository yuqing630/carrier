DROP DATABASE IF EXISTS mail;

CREATE DATABASE mail;

\c mail;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
email varchar(100) NOT NULL,
password varchar(100) NOT NULL,
name varchar(100),
bio varchar(250),
UNIQUE (EMAIL)
);

CREATE TABLE campaigns (
id SERIAL PRIMARY KEY,
name varchar(500) NOT NULL,
status varchar(100) NOT NULL,
subject varchar(500) NOT NULL,
templateURL varchar(1000),
userID integer REFERENCES users(id)
);

CREATE TABLE contacts (
id SERIAL PRIMARY KEY,
name varchar(100) NOT NULL,
email varchar(100) NOT NULL,
unsubscribe boolean NOT NULL
);

CREATE TABLE campaignContacts (
id SERIAL PRIMARY KEY,
campaignID integer REFERENCES campaigns(id),
contactID integer REFERENCES contacts(id),
opened boolean
);

CREATE TABLE groups (
id SERIAL PRIMARY KEY,
name varchar(500) NOT NULL,
userID integer REFERENCES users(id)
);

CREATE TABLE groupContacts (
id SERIAL PRIMARY KEY,
groupID integer REFERENCES groups(id),
contactID integer REFERENCES contacts(id)
);

-- setting up postgreSQL:
-- start postgres: pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
-- create database: CREATE DATABASE databasename;
-- reference for psql: http://postgresguide.com/utilities/psql.html
-- to import schema, run psql -f schema.sql
-- run 'psql articlesDB' to run psql with the database
--run \list to see all databases
-- stop postgres: pg_ctl -D /usr/local/var/postgres stop && brew services stop postgresql
-- more commands: https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

insert into users (email, password) values ('allegra.berndt@gmail.com', 'rawr');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Sent', 'Newsletter volume 1', 'google.com', '1');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Sent', 'Newsletter volume 2', 'google.com', '1');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Active', 'Newsletter volume 3', 'google.com', '1');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Active', 'Newsletter volume 4', 'google.com', '1');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Draft', 'Newsletter volume 5', 'https://s3.amazonaws.com/targ-templates/Testjh+Name', '1');
insert into campaigns (name, status, subject, templateURL, userID) values ('Newsletter', 'Draft', 'Newsletter volume 6', 'google.com', '1');
insert into contacts (name, email, unsubscribe) values ('Jake', 'jake@statefarm.com', false);
insert into campaignContacts (campaignID, contactID) values ('3', '1');
insert into contacts (name, email, unsubscribe) values ('Alex', 'alex@gmail.com', false);
insert into campaignContacts (campaignID, contactID) values ('3', '2');
insert into groups (name, userID) values ('Spring Emails', '1');
insert into groupContacts (groupID, contactID) values ('1', '1');
insert into groupContacts (groupID, contactID) values ('1', '2');
