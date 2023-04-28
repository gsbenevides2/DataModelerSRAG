CREATE TRIGGER tg_h_tipos_teste_antigeno
AFTER UPDATE OR DELETE
ON tipos_teste_antigeno
FOR EACH ROW
BEGIN
    INSERT INTO h_tipos_teste_antigeno VALUES
        (
            :OLD.tta_id,
            :OLD.tta_nome,
            SYSDATE
        );
END;