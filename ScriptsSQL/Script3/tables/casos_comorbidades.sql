CREATE TRIGGER tg_h_cco
AFTER UPDATE OR DELETE
ON casos_comorbidades
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_comorbidades VALUES
        (
            :OLD.cco_cas_id,
            :OLD.cco_com_id,
            SYSDATE
        );
END;
/