CREATE TRIGGER tg_h_csi
AFTER UPDATE OR DELETE
ON casos_sintomas
FOR EACH ROW
BEGIN
    INSERT INTO h_casos_sintomas VALUES
        (
            :OLD.csi_sin_id,
            :OLD.csi_cas_id,
            SYSDATE
        );
END;