CREATE TABLE auditoria(
    aud_id INTEGER,
    aud_data DATE,
    aud_tabela VARCHAR(30),
    aud_operacao CHAR(1),
    aud_coluna VARCHAR(30),
    aud_valor_antigo VARCHAR(2000),
    aud_valor_novo VARCHAR(2000),
    aud_usuario_bd VARCHAR(30),
    aud_usuario_so VARCHAR(200),
    aud_rowid VARCHAR(30),
    CONSTRAINT PK_AUD PRIMARY KEY(aud_id)
);

CREATE SEQUENCE seq_auditoria NOCACHE;

CREATE TRIGGER tg_seq_auditoria
BEFORE INSERT
ON auditoria
FOR EACH ROW
BEGIN
    :new.aud_id := seq_auditoria.nextval;
END;
/

CREATE OR REPLACE PROCEDURE proc_insere(
    pr_data IN DATE,
    pr_tabela IN VARCHAR2,
    pr_operacao IN VARCHAR2,
    pr_coluna IN VARCHAR2,
    pr_valor_antigo IN VARCHAR2,
    pr_valor_novo IN VARCHAR2,
    pr_usuario_bd IN VARCHAR2,
    pr_usuario_so IN VARCHAR2,
    pr_rowid IN VARCHAR2
) AS
BEGIN
    INSERT INTO auditoria
    VALUES (
        NULL,
        pr_data,
        pr_tabela,
        pr_operacao,
        pr_coluna,
        pr_valor_antigo,
        pr_valor_novo,
        pr_usuario_bd,
        pr_usuario_so,
        pr_rowid
    );
END proc_insere;
/

GRANT EXECUTE ON proc_insere TO APP;
/