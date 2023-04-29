CREATE TRIGGER tg_h_tas
AFTER UPDATE OR DELETE
ON tipos_amostras_sorologicas
FOR EACH ROW
BEGIN
    INSERT INTO h_tipos_amostras_sorologicas VALUES
        (
            :OLD.tas_id,
            :OLD.tas_nome,
            SYSDATE
        );
END;