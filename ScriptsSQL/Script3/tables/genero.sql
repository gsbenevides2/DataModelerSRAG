CREATE TRIGGER tg_h_gen
AFTER UPDATE OR DELETE
ON genero
FOR EACH ROW
BEGIN
    INSERT INTO h_genero VALUES
        (
            :OLD.gen_id,
            :OLD.gen_descricao,
            SYSDATE
        );
END;
/