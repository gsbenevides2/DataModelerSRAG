CREATE TRIGGER tg_h_fab
AFTER UPDATE OR DELETE
ON fabricantes
FOR EACH ROW
BEGIN
    INSERT INTO h_fabricantes VALUES
        (
            :OLD.fab_id,
            :OLD.fab_nome,
            SYSDATE
        );
END;
/