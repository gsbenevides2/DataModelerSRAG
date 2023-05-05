CREATE TRIGGER tg_h_int
AFTER UPDATE OR DELETE
ON internacoes
FOR EACH ROW
BEGIN
    INSERT INTO h_internacoes VALUES
        (
            :OLD.int_cas_id,
            :OLD.int_data,
            :OLD.int_mun_id,
            SYSDATE
        );
END;
/