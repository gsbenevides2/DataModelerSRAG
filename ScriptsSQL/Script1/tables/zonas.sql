CREATE TABLE zonas (
    zon_id        NUMBER(1),
    zon_descricao VARCHAR2(30)
);

COMMENT ON TABLE zonas IS
    'Tabela de metadados que contem todas as zonas possiveis que uma pessoa pode morar: Urbana, Rural etc.';

COMMENT ON COLUMN zonas.zon_id IS
    'Identificador únicoda zona de residencias.';

COMMENT ON COLUMN zonas.zon_descricao IS
    'Descrição do tipo de zona de residencias.';

ALTER TABLE zonas ADD CONSTRAINT pk_zon PRIMARY KEY ( zon_id );
ALTER TABLE zonas ADD CONSTRAINT ck_zon_01 CHECK (zon_descricao IS NOT NULL);

CREATE SEQUENCE seq_zon START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_zon
BEFORE INSERT 
ON zonas
FOR EACH ROW
BEGIN
 :new.zon_id := seq_zon.nextval;
END;
/
ALTER TRIGGER tg_seq_zon DISABLE;