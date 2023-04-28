CREATE TRIGGER tg_h_anc
AFTER UPDATE OR DELETE
ON antivirais_covid
FOR EACH ROW
BEGIN
    INSERT INTO h_antivirais_covid VALUES
        (:OLD.anc_id, :OLD.anc_nome, SYSDATE);
END;