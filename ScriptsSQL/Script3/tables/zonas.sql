CREATE TRIGGER tg_h_zon
AFTER UPDATE OR DELETE
ON zonas
FOR EACH ROW
BEGIN
    INSERT INTO h_zonas VALUES
        (
            :OLD.zon_id,
            :OLD.zon_descricao,
            SYSDATE
        );
END;