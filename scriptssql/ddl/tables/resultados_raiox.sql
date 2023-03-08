CREATE TABLE resultados_raiox (
    rai_id   INTEGER,
    rai_desc VARCHAR2(30)
);

COMMENT ON TABLE resultados_raiox IS
    'Tabela de metadados que indica os possiveis resultados para um exame de raio x.';

COMMENT ON COLUMN resultados_raiox.rai_id IS
    'Identificador do tipo de resultado para o raio-x';

COMMENT ON COLUMN resultados_raiox.rai_desc IS
    'Descrição do tipo de resultado para o raiox.';

ALTER TABLE resultados_raiox ADD CONSTRAINT pk_rai PRIMARY KEY ( rai_id );
ALTER TABLE resultados_raiox ADD CONSTRAINT ck_rai_01 CHECK ( rai_desc IS NOT NULL );

CREATE SEQUENCE seq_rai START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_rai
BEFORE INSERT
ON resultados_raiox
FOR EACH ROW
BEGIN
  :new.rai_id := seq_rai.nextval;
END;
/
ALTER TRIGGER tg_seq_rai DISABLE;