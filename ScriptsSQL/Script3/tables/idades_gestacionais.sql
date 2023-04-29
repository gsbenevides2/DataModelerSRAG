CREATE TRIGGER tg_h_idg
AFTER UPDATE OR DELETE
ON idades_gestacionais
FOR EACH ROW
BEGIN
    INSERT INTO h_idades_gestacionais VALUES
        (
            :OLD.idg_id,
            :OLD.idg_descricao,
            SYSDATE
        );
END;