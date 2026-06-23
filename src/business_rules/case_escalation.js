// Table: sn_customerservice_case  (Business Rule)
// Name: Case Escalation on SLA Breach
// Trigger table: sn_customerservice_case
// When: before
// Actions: insert=false update=true delete=false query=false
// Description: Auto-escalate cases that have breached SLA or been open > 48h.

(function executeRule(current, previous) {
    // Skip if already escalated
    if (current.escalation == '3') return;

    var openedAgo = new GlideDuration(
        gs.nowDateTime(), current.opened_at.toString()
    );

    // Escalate if over 48 hours old and not resolved
    if (openedAgo.getDurationValue() > 172800 &&
        current.state != '3' && current.state != '4') {
        current.escalation = '3';
        current.priority   = '2'; // High
        current.work_notes = 'AUTO-ESCALATED: Case open > 48 hours without resolution.';

        // Notify support manager
        var mgr = gs.getProperty('customer_support.escalation_manager', '');
        if (mgr) {
            gs.eventQueue('case.escalated', current, mgr, current.number.toString());
        }
    }
})(current, previous);
