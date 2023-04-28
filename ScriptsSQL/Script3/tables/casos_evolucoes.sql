CREATE TRIGGER tg_h_cev
AFTER UPDATE OR DELETE
ON casos_evolucoes
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_evolucoes VALUES
        (
            :OLD.cev_cas_id,
            :OLD.cev_evo_id,
            :OLD.cev_date,
            SYSDATE
        );
END;