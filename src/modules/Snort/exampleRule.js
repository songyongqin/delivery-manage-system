export default `# snort规则示例如下：

alert tcp $EXTERNAL_NET $HTTP_PORTS -> $HOME_NET any (msg:"{"threattype": ["Unknow"], "description": "ET EXPLOIT libPNG - Possible integer overflow in allocation in png_handle_sPLT", "family": "System", "attack_phase": "invasion", "apt_org": "", "extract_date": "", "remarks": "", "threat_level": "", "id": "2001195", "sign_source": "", "author": "Suricata", "behavior": ["Unknow"], "cve_number": "", "refer": ""}"; flow: established; content:"|89 50 4E 47 0D 0A 1A 0A|"; depth:8; content:"sPLT"; isdataat:80,relative; content:!"|00|"; distance: 0; reference:url,www.securiteam.com/unixfocus/5ZP0C0KDPG.html; reference:url,doc.emergingthreats.net/bin/view/Main/2001195; classtype:Unknow; sid:2001195; rev:9; metadata:created_at 2010_07_30, updated_at 2010_07_30;)

# 具体的Snort规则编写方法参照官方的使用说明：（保证Snort规则能被suricate正常解析）

# http://suricata.readthedocs.io/en/latest/rules/index.html`