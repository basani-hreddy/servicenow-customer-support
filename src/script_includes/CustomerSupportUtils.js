// Table: sys_script_include
// Name: CustomerSupportUtils
// API Name: x_custom.CustomerSupportUtils
// Active: true
// Description: Utility methods for Customer Support module.

var CustomerSupportUtils = Class.create();
CustomerSupportUtils.prototype = {
    initialize: function() {}|,

    /**
     * Get all open cases for an account.
     * @param {string} accountSysId
     * @returns {Array}
     */
    getOpenCasesForAccount: function(accountSysId) {
        var results = [];
        var gr = new GlideRecord('sn_customerservice_case');
        gr.addQuery('account', accountSysId);
        gr.addQuery('state', 'NOT IN', '3,4'); // exclude Solved, Closed
        gr.orderByDesc('priority');
        gr.query();
        while (gr.next()) {
            results.push({
                number:   gr.number.toString(),
                sys_id:   gr.getUniqueValue(),
                priority: gr.priority.getDisplayValue(),
                state:    gr.state.getDisplayValue(),
                summary:  gr.short_description.toString()
            });
        }
        return results;
    },

    /**
     * Calculate customer satisfaction score for an account.
     * @param {string} accountSysId
     * @returns {Object} {avg, count}
     */
    getSatisfactionScore: function(accountSysId) {
        var ga = new GlideAggregate('sn_customerservice_case');
        ga.addQuery('account', accountSysId);
        ga.addNotNullQuery('customer_satisfaction_score');
        ga.addAggregate('AVG', 'customer_satisfaction_score');
        ga.addAggregate('COUNT');
        ga.query();
        if (ga.next()) {
            return {
                avg:   parseFloat(ga.getAggregate('AVG', 'customer_satisfaction_score') || 0).toFixed(1),
                count: parseInt(ga.getAggregate('COUNT'), 10)
            };
        }
        return { avg: 'N/A', count: 0 };
    },

    type: 'CustomerSupportUtils'
};
