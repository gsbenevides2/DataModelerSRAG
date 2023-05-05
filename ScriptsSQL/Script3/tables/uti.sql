CREATE TRIGGER tg_h_uti
AFTER UPDATE OR DELETE
ON uti
FOR EACH ROW
BEGIN
    INSERT INTO h_uti VALUES
        (
            :OLD.uti_cas_id,
            :OLD.uti_data_entrada,
            :OLD.uti_data_saida,
            SYSDATE
        );
END;
/