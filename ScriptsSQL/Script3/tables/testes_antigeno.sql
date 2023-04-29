CREATE TRIGGER tg_h_testes_antigeno
AFTER UPDATE OR DELETE
ON testes_antigeno
FOR EACH ROW
BEGIN
    INSERT INTO h_testes_antigeno VALUES
        (
            :OLD.tea_cas_id,
            :OLD.tea_tta_id,
            :OLD.tea_rta_id,
            :OLD.tea_data_resultado,
            SYSDATE
        );
END;