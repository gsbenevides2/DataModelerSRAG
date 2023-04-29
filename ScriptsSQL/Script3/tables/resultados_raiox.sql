CREATE TRIGGER tg_h_rai
AFTER UPDATE OR DELETE
ON resultados_raiox
FOR EACH ROW
BEGIN
    INSERT INTO h_resultados_raiox VALUES
        (
            :OLD.rai_id,
            :OLD.rai_desc,
            SYSDATE
        );
END;