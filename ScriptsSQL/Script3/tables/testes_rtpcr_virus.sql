CREATE TRIGGER tg_h_testes_rtpcr_virus
AFTER UPDATE OR DELETE
ON testes_rtpcr_virus
FOR EACH ROW
BEGIN
    INSERT INTO h_testes_rtpcr_virus VALUES
        (
            :OLD.tsr_ter_id,
            :OLD.tsr_vir_id,
            SYSDATE
        );
END;