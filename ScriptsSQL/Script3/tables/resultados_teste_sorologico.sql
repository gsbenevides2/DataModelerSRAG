CREATE TRIGGER tg_h_rts
AFTER UPDATE OR DELETE
ON resultados_teste_sorologico
FOR EACH ROW
BEGIN
    INSERT INTO h_resultados_teste_sorologico VALUES
        (
            :OLD.rts_id,
            :OLD.rts_desc,
            SYSDATE
        );
END;
/