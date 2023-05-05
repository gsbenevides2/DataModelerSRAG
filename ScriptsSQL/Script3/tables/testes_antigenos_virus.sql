CREATE TRIGGER tg_h_tsa
AFTER UPDATE OR DELETE
ON testes_antigenos_virus
FOR EACH ROW
BEGIN
    INSERT INTO h_testes_antigenos_virus VALUES
        (
            :OLD.tsa_tea_id,
            :OLD.tsa_vir_id,
            SYSDATE
        );
END;
/