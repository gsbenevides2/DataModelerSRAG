CREATE USER APP IDENTIFIED BY APP123
QUOTA UNLIMITED ON USERS
DEFAULT TABLESPACE USERS
TEMPORARY TABLESPACE TEMP;

GRANT CONNECT, RESOURCE TO APP;

