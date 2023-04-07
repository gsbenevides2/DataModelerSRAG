ALTER TABLE casos_antivirais_covid
    ADD CONSTRAINT fk_cac_anc FOREIGN KEY ( cac_anc_id )
        REFERENCES antivirais_covid ( anc_id );

ALTER TABLE casos_antivirais_covid
    ADD CONSTRAINT fk_cac_cas FOREIGN KEY ( cac_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_antivirais_gripe
    ADD CONSTRAINT fk_cag_ang FOREIGN KEY ( cag_ang_id )
        REFERENCES antivirais_gripe ( ang_id );

ALTER TABLE casos_antivirais_gripe
    ADD CONSTRAINT fk_cag_cas FOREIGN KEY ( cag_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_amostras
    ADD CONSTRAINT fk_cam_cas FOREIGN KEY ( cam_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_amostras
    ADD CONSTRAINT fk_cam_tam FOREIGN KEY ( cam_tam_id )
        REFERENCES tipos_amostra ( tam_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_cla FOREIGN KEY ( cas_cla_id )
        REFERENCES classificacoes ( cla_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_esc FOREIGN KEY ( cas_esc_id )
        REFERENCES escolaridades ( esc_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_gen FOREIGN KEY ( cas_gen_id )
        REFERENCES genero ( gen_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_idg FOREIGN KEY ( cas_idg_id )
        REFERENCES idades_gestacionais ( idg_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_mun FOREIGN KEY ( cas_mun_id )
        REFERENCES municipios ( mun_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_rac FOREIGN KEY ( cas_rac_id )
        REFERENCES racas ( rac_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_sve FOREIGN KEY ( cas_sve_id )
        REFERENCES suporte_ventilador ( sve_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_tan FOREIGN KEY ( cas_tan_id )
        REFERENCES trabalha_animais ( tan_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_uni FOREIGN KEY ( cas_uni_id )
        REFERENCES unidades ( uni_id );

ALTER TABLE casos
    ADD CONSTRAINT fk_cas_zon FOREIGN KEY ( cas_zon_id )
        REFERENCES zonas ( zon_id );

ALTER TABLE casos_comorbidades
    ADD CONSTRAINT fk_cco_cas FOREIGN KEY ( cco_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_comorbidades
    ADD CONSTRAINT fk_cco_com FOREIGN KEY ( cco_com_id )
        REFERENCES comorbidades ( com_id );

ALTER TABLE casos_evolucoes
    ADD CONSTRAINT fk_cev_cas FOREIGN KEY ( cev_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_evolucoes
    ADD CONSTRAINT fk_cev_evo FOREIGN KEY ( cev_evo_id )
        REFERENCES evolucoes ( evo_id );

ALTER TABLE casos_raiosx
    ADD CONSTRAINT fk_crx_cas FOREIGN KEY ( crx_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_raiosx
    ADD CONSTRAINT fk_crx_rai FOREIGN KEY ( crx_rai_id )
        REFERENCES resultados_raiox ( rai_id );

ALTER TABLE casos_sintomas
    ADD CONSTRAINT fk_csi_cas FOREIGN KEY ( csi_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE casos_sintomas
    ADD CONSTRAINT fk_csi_sin FOREIGN KEY ( csi_sin_id )
        REFERENCES sintomas ( sin_id );

ALTER TABLE casos_tomografia
    ADD CONSTRAINT fk_cto_ast FOREIGN KEY ( cto_ast_id )
        REFERENCES aspectos_tomografia ( ast_id );

ALTER TABLE casos_tomografia
    ADD CONSTRAINT fk_cto_cas FOREIGN KEY ( cto_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE encerramentos
    ADD CONSTRAINT fk_enc_cas FOREIGN KEY ( enc_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE encerramentos
    ADD CONSTRAINT fk_enc_cri FOREIGN KEY ( enc_cri_id )
        REFERENCES criterios_encerramento ( cri_id );

ALTER TABLE internacoes
    ADD CONSTRAINT fk_int_cas FOREIGN KEY ( int_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE internacoes
    ADD CONSTRAINT fk_int_mun FOREIGN KEY ( int_mun_id )
        REFERENCES municipios ( mun_id );

ALTER TABLE municipios
    ADD CONSTRAINT fk_mun_est FOREIGN KEY ( mun_est_id )
        REFERENCES estados ( est_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_rts_igg FOREIGN KEY ( tso_rts_igg )
        REFERENCES resultados_teste_sorologico ( rts_id );

ALTER TABLE testes_antigeno
    ADD CONSTRAINT fk_tea_cas FOREIGN KEY ( tea_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE testes_antigeno
    ADD CONSTRAINT fk_tea_rta FOREIGN KEY ( tea_rta_id )
        REFERENCES resultados_teste_antigeno ( rta_id );

ALTER TABLE testes_antigeno
    ADD CONSTRAINT fk_tea_tta FOREIGN KEY ( tea_tta_id )
        REFERENCES tipos_teste_antigeno ( tta_id );

ALTER TABLE testes_antigenos_virus
    ADD CONSTRAINT fk_tsa_tea FOREIGN KEY ( tsa_tea_id )
        REFERENCES testes_antigeno ( tea_cas_id );

ALTER TABLE testes_antigenos_virus
    ADD CONSTRAINT fk_tsa_vir FOREIGN KEY ( tsa_vir_id )
        REFERENCES virus_respiratorios ( vir_id );

ALTER TABLE testes_rtpcr
    ADD CONSTRAINT fk_ter_cas FOREIGN KEY ( ter_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE testes_rtpcr
    ADD CONSTRAINT fk_ter_rtr FOREIGN KEY ( ter_rtr_id )
        REFERENCES resultados_teste_rtpc ( rtr_id );

ALTER TABLE testes_rtpcr_virus
    ADD CONSTRAINT fk_tsr_ter FOREIGN KEY ( tsr_ter_id )
        REFERENCES testes_rtpcr ( ter_cas_id );

ALTER TABLE testes_rtpcr_virus
    ADD CONSTRAINT fk_tsr_vir FOREIGN KEY ( tsr_vir_id )
        REFERENCES virus_respiratorios ( vir_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_tso_cas FOREIGN KEY ( tso_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_tso_rts_iga FOREIGN KEY ( tso_rts_iga )
        REFERENCES resultados_teste_sorologico ( rts_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_tso_rts_igm FOREIGN KEY ( tso_rts_igm )
        REFERENCES resultados_teste_sorologico ( rts_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_tso_tas FOREIGN KEY ( tso_tas_id )
        REFERENCES tipos_amostras_sorologicas ( tas_id );

ALTER TABLE teste_sorologicos
    ADD CONSTRAINT fk_tso_tts FOREIGN KEY ( tso_tts_id )
        REFERENCES tipos_testes_sorologicos ( tts_id );

ALTER TABLE unidades
    ADD CONSTRAINT fk_uni_mun FOREIGN KEY ( uni_mun_id )
        REFERENCES municipios ( mun_id );

ALTER TABLE uti
    ADD CONSTRAINT fk_uti_cas FOREIGN KEY ( uti_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE vacinas_covid
    ADD CONSTRAINT fk_vac_cas FOREIGN KEY ( vac_cas_id )
        REFERENCES casos ( cas_id );

ALTER TABLE vacinas_covid
    ADD CONSTRAINT fk_vac_dos FOREIGN KEY ( vac_dos_id )
        REFERENCES doses ( dos_id );

ALTER TABLE vacinas_covid
    ADD CONSTRAINT fk_vac_fab FOREIGN KEY ( vac_fab_id )
        REFERENCES fabricantes ( fab_id );

ALTER TABLE vacinas_gripe
    ADD CONSTRAINT fk_vag_cas FOREIGN KEY ( vag_cas_id )
        REFERENCES casos ( cas_id );
