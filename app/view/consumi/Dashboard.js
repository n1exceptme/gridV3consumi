Ext.define('ExtPOD.view.consumi.Dashboard', {
	extend: 'Ext.form.Panel',
	alias : 'widget.Dashboard',

	requires: [
        'ExtPOD.view.consumi.ConsumiGrid'
	],

	title: 'Consumi POD',
    frame: true,
    bodyPadding: 5,
    //width: 870,
    //height: 720,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [
		{
		xtype: 'ConsumiGrid'
		}
	]
});