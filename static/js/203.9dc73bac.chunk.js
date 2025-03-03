"use strict";(self.webpackChunklineage_diagram_react=self.webpackChunklineage_diagram_react||[]).push([[203],{2203:function(e){e.exports=JSON.parse('{"$schema":"https://ev2schema.azure.net/schemas/2020-04-01/regionAgnosticRolloutSpecification.json","contentVersion":"1.0.0.0","rolloutMetadata":{"serviceModelPath":"ServiceModels\\\\IngestionRegionAgnosticEnv.ServiceModel.Buildout.json","scopeBindingsPath":"ScopeBindings\\\\IngestionRegionAgnosticEnv.ScopeBindings.json","name":"IngestionRegionAgnosticEnv","rolloutType":"Minor","buildSource":{"parameters":{"serviceGroupRoot":"ServiceGroupRoot","versionFile":"buildver.txt"}},"notification":{"email":{"to":"idctorus-subfc@microsoft.com"}}},"orchestratedSteps":[{"name":"ApplicationDiagStorageAccount","targetType":"ServiceResourceDefinition","targetName":"ApplicationDiagStorageAccount","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"ApplicationGateway","targetType":"ServiceResourceDefinition","targetName":"ApplicationGateway","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","Ev2IssuerName","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionApp","IngestionAppGatewayPublicIp","IngestionAppGatewaySSLCertificateName","IngestionAppType","IngestionAppTypeVersion","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"AzureIpRule","targetType":"ServiceResourceDefinition","targetName":"AzureIpRule","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"ClusterPassword","targetType":"ServiceResourceDefinition","targetName":"ClusterPassword","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"DbExtension","targetType":"ServiceResourceDefinition","targetName":"DbExtension","actions":["shell/SetupDatabase"],"dependsOn":["AzureIpRule","EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","TorusRule1","TorusRule2","VmssIdentity"]},{"name":"EcsAuthCertificate","targetType":"ServiceResourceDefinition","targetName":"EcsAuthCertificate","actions":["extension/ECSAuthCertName"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"EcsConfigLoader","targetType":"ServiceResourceDefinition","targetName":"EcsConfigLoader","actions":["extension/IngestionBuildoutConfigs"]},{"name":"Ev2IssuerName","targetType":"ServiceResourceDefinition","targetName":"Ev2IssuerName","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"GcpApp","targetType":"ServiceResourceDefinition","targetName":"GcpApp","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","GcpAppType","GcpAppTypeVersion","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"GcpAppType","targetType":"ServiceResourceDefinition","targetName":"GcpAppType","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"GcpAppTypeVersion","targetType":"ServiceResourceDefinition","targetName":"GcpAppTypeVersion","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","GcpAppType","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"GenevaAuthCertName","targetType":"ServiceResourceDefinition","targetName":"GenevaAuthCertName","actions":["extension/GenevaAuthCertName"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"GenevaLogs","targetType":"ServiceResourceDefinition","targetName":"GenevaLogs","actions":["extension/GenevaLogsUploadExternal"],"dependsOn":["EcsConfigLoader","GenevaAuthCertName","GenevaRoleAssignments","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"GenevaMetrics","targetType":"ServiceResourceDefinition","targetName":"GenevaMetrics","actions":["extension/GenevaMonitoringAccount"],"dependsOn":["EcsConfigLoader","GenevaAuthCertName","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"GenevaRoleAssignments","targetType":"ServiceResourceDefinition","targetName":"GenevaRoleAssignments","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp"]},{"name":"GenevaRp","targetType":"ServiceResourceDefinition","targetName":"GenevaRp","actions":["extension/PreReqExtension"],"dependsOn":["EcsConfigLoader"]},{"name":"GriffinRuntimeCertificate","targetType":"ServiceResourceDefinition","targetName":"GriffinRuntimeCertificate","actions":["extension/GriffinRuntimeCertificate"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"IngestionApp","targetType":"ServiceResourceDefinition","targetName":"IngestionApp","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","Ev2IssuerName","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionAppType","IngestionAppTypeVersion","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionAppGatewayPublicIp","targetType":"ServiceResourceDefinition","targetName":"IngestionAppGatewayPublicIp","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"IngestionAppGatewaySSLCertificateName","targetType":"ServiceResourceDefinition","targetName":"IngestionAppGatewaySSLCertificateName","actions":["extension/IngestionAppGwSSLCertificateName"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"IngestionAppInsights","targetType":"ServiceResourceDefinition","targetName":"IngestionAppInsights","actions":["deploy"],"dependsOn":["EcsConfigLoader","LogAnalyticsConfigs","LogAnalyticsTableConfigs"]},{"name":"IngestionAppService","targetType":"ServiceResourceDefinition","targetName":"IngestionAppService","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","Ev2IssuerName","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionApp","IngestionAppType","IngestionAppTypeVersion","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionAppType","targetType":"ServiceResourceDefinition","targetName":"IngestionAppType","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","Ev2IssuerName","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionAppTypeVersion","targetType":"ServiceResourceDefinition","targetName":"IngestionAppTypeVersion","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","Ev2IssuerName","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionAppType","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionDBPassword","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSqlServerprimary","IngestionSSLCertificateName","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionClusterCertificateName","targetType":"ServiceResourceDefinition","targetName":"IngestionClusterCertificateName","actions":["extension/IngestionClusterCertificate"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"IngestionClusterSSLClientCertificateName","targetType":"ServiceResourceDefinition","targetName":"IngestionClusterSSLClientCertificateName","actions":["extension/IngestionSSLClientCertificateName"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"IngestionDBPassword","targetType":"ServiceResourceDefinition","targetName":"IngestionDBPassword","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionFabric","targetType":"ServiceResourceDefinition","targetName":"IngestionFabric","actions":["deploy"],"dependsOn":["EcsAuthCertificate","EcsConfigLoader","GenevaAuthCertName","GenevaRp","IngestionClusterSSLClientCertificateName","IngestionNsg","IngestionNsgRules","IngestionSSLCertificateName","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionLb","targetType":"ServiceResourceDefinition","targetName":"IngestionLb","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionPublicIp"]},{"name":"IngestionNsg","targetType":"ServiceResourceDefinition","targetName":"IngestionNsg","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"IngestionNsgRules","targetType":"ServiceResourceDefinition","targetName":"IngestionNsgRules","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg"]},{"name":"IngestionPublicIp","targetType":"ServiceResourceDefinition","targetName":"IngestionPublicIp","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"IngestionQuota","targetType":"ServiceResourceDefinition","targetName":"IngestionQuota","actions":["extension/IngestionQuota"],"dependsOn":["EcsConfigLoader"]},{"name":"IngestionSbNamespace","targetType":"ServiceResourceDefinition","targetName":"IngestionSbNamespace","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"IngestionSbTopic","targetType":"ServiceResourceDefinition","targetName":"IngestionSbTopic","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionSbNamespace"]},{"name":"IngestionSqlDatabase","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlDatabase","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerAadAuth","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerAadAuth","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerAdmin","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerAdmin","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerAlertPolicies","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerAlertPolicies","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerAuditRules","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerAuditRules","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerprimary","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerprimary","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServersecondary","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServersecondary","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerThreatDetectionRules","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerThreatDetectionRules","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSqlServerVnetRules","targetType":"ServiceResourceDefinition","targetName":"IngestionSqlServerVnetRules","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"IngestionSSLCertificateName","targetType":"ServiceResourceDefinition","targetName":"IngestionSSLCertificateName","actions":["extension/IngestionSSLCertificateName"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"IngestionTopicSub","targetType":"ServiceResourceDefinition","targetName":"IngestionTopicSub","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionSbNamespace","IngestionSbTopic"]},{"name":"IngestionVmss","targetType":"ServiceResourceDefinition","targetName":"IngestionVmss","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSSLCertificateName","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","SupportLogStorageAccount","VmssIdentity"]},{"name":"IngestionVnet","targetType":"ServiceResourceDefinition","targetName":"IngestionVnet","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules"]},{"name":"KeyVaultIngestionappkv","targetType":"ServiceResourceDefinition","targetName":"KeyVaultIngestionappkv","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","VmssIdentity"]},{"name":"KeyvaultIssuer","targetType":"ServiceResourceDefinition","targetName":"KeyvaultIssuer","actions":["extension/ingestionappkvIssuer"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"LogAnalyticsConfigs","targetType":"ServiceResourceDefinition","targetName":"LogAnalyticsConfigs","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"LogAnalyticsTableConfigs","targetType":"ServiceResourceDefinition","targetName":"LogAnalyticsTableConfigs","actions":["deploy"],"dependsOn":["EcsConfigLoader","LogAnalyticsConfigs"]},{"name":"SbRoleAssignments","targetType":"ServiceResourceDefinition","targetName":"SbRoleAssignments","actions":["deploy"],"dependsOn":["ApplicationDiagStorageAccount","EcsAuthCertificate","EcsConfigLoader","GenevaAuthCertName","GenevaLogs","GenevaMetrics","GenevaRoleAssignments","GenevaRp","IngestionClusterCertificateName","IngestionClusterSSLClientCertificateName","IngestionFabric","IngestionLb","IngestionNsg","IngestionNsgRules","IngestionPublicIp","IngestionSbNamespace","IngestionSbTopic","IngestionSSLCertificateName","IngestionTopicSub","IngestionVmss","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","ScannerSbTopic","ScannerTopicSub","SupportLogStorageAccount","VmssIdentity"]},{"name":"ScannerSbTopic","targetType":"ServiceResourceDefinition","targetName":"ScannerSbTopic","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionSbNamespace"]},{"name":"ScannerTopicSub","targetType":"ServiceResourceDefinition","targetName":"ScannerTopicSub","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionSbNamespace","ScannerSbTopic"]},{"name":"ServerFailoverGroupSchema","targetType":"ServiceResourceDefinition","targetName":"ServerFailoverGroupSchema","actions":["deploy"],"dependsOn":["AzureIpRule","DbExtension","EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlDatabase","IngestionSqlServerprimary","IngestionSqlServersecondary","IngestionVnet","KeyVaultIngestionappkv","TorusRule1","TorusRule2","VmssIdentity"]},{"name":"SupportLogStorageAccount","targetType":"ServiceResourceDefinition","targetName":"SupportLogStorageAccount","actions":["deploy"],"dependsOn":["EcsConfigLoader"]},{"name":"TorusRule1","targetType":"ServiceResourceDefinition","targetName":"TorusRule1","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"TorusRule2","targetType":"ServiceResourceDefinition","targetName":"TorusRule2","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionDBPassword","IngestionNsg","IngestionNsgRules","IngestionSqlServerprimary","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"TorusSSLCertificate","targetType":"ServiceResourceDefinition","targetName":"TorusSSLCertificate","actions":["extension/TorusSSLCertificate"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","KeyvaultIssuer","VmssIdentity"]},{"name":"TrafficManagerProfile","targetType":"ServiceResourceDefinition","targetName":"TrafficManagerProfile","actions":["deploy"],"dependsOn":["EcsConfigLoader","IngestionAppGatewayPublicIp"]},{"name":"VaultAccessPolicy","targetType":"ServiceResourceDefinition","targetName":"VaultAccessPolicy","actions":["deploy"],"dependsOn":["EcsConfigLoader","GenevaRp","IngestionNsg","IngestionNsgRules","IngestionVnet","KeyVaultIngestionappkv","VmssIdentity"]},{"name":"VmssIdentity","targetType":"ServiceResourceDefinition","targetName":"VmssIdentity","actions":["deploy"],"dependsOn":["EcsConfigLoader"]}]}')}}]);