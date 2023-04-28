CREATE TRIGGER tg_h_enc
AFTER UPDATE OR DELETE
ON encerramentos
FOR EACH ROW
BEGIN
    INSERT INTO h_encerramentos VALUES
        (
            :OLD.enc_cas_id,
            :OLD.enc_cri_id,
            :OLD.enc_data,
            SYSDATE
        );
END;