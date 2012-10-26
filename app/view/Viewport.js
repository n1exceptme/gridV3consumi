/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('ExtPOD.view.Viewport', {
    extend: 'Ext.Viewport',
	layout: 'fit',
    
    requires: [
		'ExtPOD.view.consumi.Dashboard',
        'ExtPOD.view.consumi.ConsumiGrid',
		'ExtPOD.view.chart.ConsumiChart'
    ],
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
		
            items: [
                {
                    xtype: 'Dashboard'
                }
            ]
        });
                
        me.callParent(arguments);
    }
});