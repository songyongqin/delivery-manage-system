import app from '../index.js'
console.info(app)
import ReportModelattack from '../modules/Report/models/Model_attack';
import ReportModelthreatEvent from '../modules/Report/models/Model_threat_event';
import ReportModel_call_on_domain from '../modules/Report/models/Model_call_on_domain';
import ReportModel_call_on_ip from '../modules/Report/models/Model_call_on_ip';
import ReportModel_fall_host from '../modules/Report/models/Model_fall_host';
import ReportModel_have_communicate_inside_ip from '../modules/Report/models/Model_have_communicate_inside_ip';
import ReportModel_mal_domain from '../modules/Report/models/Model_mal_domain';
import ReportModel_mal_ip from '../modules/Report/models/Model_mal_ip';
import ReportModel_suffer_host_call_on_record from '../modules/Report/models/Model_suffer_host_call_on_record';
import ReportModel_threat_info from '../modules/Report/models/Model_threat_info';

app.model(ReportModelattack)
app.model(ReportModelthreatEvent)
app.model(ReportModel_call_on_domain)
app.model(ReportModel_call_on_ip)
app.model(ReportModel_fall_host)
app.model(ReportModel_have_communicate_inside_ip)
app.model(ReportModel_mal_domain)
app.model(ReportModel_mal_ip)
app.model(ReportModel_suffer_host_call_on_record)
app.model(ReportModel_threat_info)