CREATE TRIGGER tg_h_tam
AFTER UPDATE OR DELETE
ON tipos_amostra
FOR EACH ROW
BEGIN
    INSERT INTO h_tipos_amostra VALUES
        (
            :OLD.tam_id,
            :OLD.tam_nome,
            SYSDATE
        );
END;
/