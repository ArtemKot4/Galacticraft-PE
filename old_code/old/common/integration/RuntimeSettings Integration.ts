ModAPI.addAPICallback("RuntimeConfig", (api: any) => {
    const ConfigStorage = api.ConfigStorage;
    const BuilderConfig = api.BuilderConfig;
    const Setting = api.Setting;
    
    let config = new ConfigStorage(__dir__+"runtime_config.json")
    .put("clearing_clusters_enable", true);
    
    let builder = new BuilderConfig(config)
    .addSectionDivider("Clearing Clusters")
    .addCheckBox("Enable", "clearing_clusters_enable");
    
    new Setting(__dir__)
    .setBuilderConfig(builder)
    .setChangeSetting((cfg, config, builder) => {
    
    });
    });