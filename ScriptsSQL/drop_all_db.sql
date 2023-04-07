SELECT 'DROP SEQUENCE', LOWER(sequence_name), ';' FROM user_sequences;
SELECT 'DROP TABLE', LOWER(table_name), 'CASCADE CONSTRAINTS;' from user_tables;