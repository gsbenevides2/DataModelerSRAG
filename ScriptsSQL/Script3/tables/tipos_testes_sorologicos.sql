CREATE TRIGGER tg_h_tipos_testes_sorologicos
AFTER UPDATE OR DELETE
ON tipos_testes_sorologicos
FOR EACH ROW
BEGIN
    INSERT INTO h_tipos_testes_sorologicos VALUES
        (
            :OLD.tts_id,
            :OLD.tts_nome,
            SYSDATE
        );
END;