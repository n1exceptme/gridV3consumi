/**
 * Ext JS Library 4.1.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license

 * @author Loiane Groner
 * http://loianegroner.com (English)
 * http://loiane.com (Portuguese)
 */
Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);


Ext.application({
    name: 'ExtPOD',

    controllers: [
        'ControllerConsumi'
    ], 

	launch: function(){
		Ext.create( 'ExtPOD.view.Viewport' );
	}
	
});
