CREATE TABLE antivirais_covid (
    anc_id INTEGER,
    anc_nome VARCHAR(30)
);

COMMENT ON TABLE antivirais_covid IS
    'Tabela com a lista de antivirais para Covid.';

COMMENT ON COLUMN antivirais_covid.anc_id IS
    'Identificador do antiviral para covid.';

COMMENT ON COLUMN antivirais_covid.anc_nome IS
    'Nome do Antiviral para covid.';

ALTER TABLE antivirais_covid ADD CONSTRAINT pk_anc PRIMARY KEY ( anc_id );
ALTER TABLE antivirais_covid ADD CONSTRAINT ck_anc_01 CHECK (anc_nome IS NOT NULL);

CREATE SEQUENCE seq_anc START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_anc
BEFORE INSERT 
ON antivirais_covid 
FOR EACH ROW
BEGIN
    :new.anc_id := seq_anc.nextval;
END;
/

ALTER TRIGGER tg_seq_anc DISABLE;
