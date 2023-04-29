CREATE TRIGGER tg_h_testes_rtpcr
AFTER UPDATE OR DELETE
ON testes_rtpcr
FOR EACH ROW
BEGIN
    INSERT INTO h_testes_rtpcr VALUES
        (
            :OLD.ter_cas_id,
            :OLD.ter_rtr_id,
            :OLD.ter_data_resultado,
            SYSDATE
        );
END;