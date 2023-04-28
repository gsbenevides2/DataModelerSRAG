CREATE TRIGGER tg_h_cla
AFTER UPDATE OR DELETE
ON classificacoes
FOR EACH ROW
BEGIN
    INSERT INTO h_classificacoes VALUES
        (
            :OLD.cla_id,
            :OLD.cla_desc,
            SYSDATE
        );
END;