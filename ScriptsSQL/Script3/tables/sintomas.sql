CREATE TRIGGER tg_h_sin
AFTER UPDATE OR DELETE
ON sintomas
FOR EACH ROW
BEGIN
    INSERT INTO h_sintomas VALUES
        (
            :OLD.sin_id,
            :OLD.sin_nome,
            SYSDATE
        );
END;