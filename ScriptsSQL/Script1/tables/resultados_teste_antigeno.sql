CREATE TABLE resultados_teste_antigeno (
    rta_id        INTEGER,
    rta_descricao VARCHAR2(40)
);

COMMENT ON TABLE resultados_teste_antigeno IS
    'Tabela que armazena os possiveis valores para resultados de testes antigenos.';

COMMENT ON COLUMN resultados_teste_antigeno.rta_id IS
    'Identificador do Tipo de Resultado para testes antigenos.';

COMMENT ON COLUMN resultados_teste_antigeno.rta_descricao IS
    'Descrição do tipo de resultado para testes antigenos.';

ALTER TABLE resultados_teste_antigeno ADD CONSTRAINT pk_rta PRIMARY KEY ( rta_id );
ALTER TABLE resultados_teste_antigeno ADD CONSTRAINT ck_rta_01 CHECK ( rta_descricao IS NOT NULL );

CREATE SEQUENCE seq_rta START WITH 10 NOCACHE;

CREATE TRIGGER tg_seq_rta
BEFORE INSERT
ON resultados_teste_antigeno
FOR EACH ROW
BEGIN
  :new.rta_id := seq_rta.nextval;
END;
/
ALTER TRIGGER tg_seq_rta DISABLE;