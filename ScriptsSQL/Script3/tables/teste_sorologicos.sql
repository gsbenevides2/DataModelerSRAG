CREATE TRIGGER tg_h_tso
AFTER UPDATE OR DELETE
ON teste_sorologicos
FOR EACH ROW
BEGIN
    INSERT INTO h_teste_sorologicos VALUES
        (
            :OLD.tso_cas_id,
            :OLD.tso_tas_id,
            :OLD.tso_tts_id,
            :OLD.tso_data_coleta,
            :OLD.tso_data_resultado,
            :OLD.tso_rts_igg,
            :OLD.tso_rts_igm,
            :OLD.tso_rts_iga,
            SYSDATE
        );
END;
/