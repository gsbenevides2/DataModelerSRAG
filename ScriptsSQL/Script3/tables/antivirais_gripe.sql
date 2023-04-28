CREATE TRIGGER tg_h_ang
AFTER UPDATE OR DELETE
ON antivirais_gripe
FOR EACH ROW
BEGIN
    INSERT INTO h_antivirais_gripe VALUES
        (:OLD.ang_id, :OLD.ang_nome, SYSDATE);
END;