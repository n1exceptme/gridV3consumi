Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.grid.PagingScroller',
    'Ext.ux.form.SearchField'
]);

Ext.onReady(function(){
    Ext.define('ForumThread', {
        extend: 'Ext.data.Model',
        fields: [
			{name: 'id',type: 'int'},
			{name: 'fornitore',type: 'string'},
			{name: 'tipo_documento',type: 'string'},
			{name: 'pod',type: 'string'},
			{name: 'numero_fiscale',type: 'string'},
			{name: 'data_emissione',type: 'date'},
			{name: 'anno_riferimento',type: 'int'},
			{name: 'mese_riferimento',type: 'int'},
			{name: 'anno_consumi',type: 'int'},
			{name: 'mese_consumi',type: 'int'},
			{name: 'totale_fattura_netto',type: 'float'},
			{name: 'importo_iva',type: 'float'},
			{name: 'totale_fattura',type: 'float'},
			{name: 'consumo_f1',type: 'float'},
			{name: 'consumo_f2',type: 'float'},
			{name: 'consumo_f3',type: 'float'},
			{name: 'consumo_fascia_peak',type: 'float'},
			{name: 'consumo_fascia_off_peak',type: 'float'},
			{name: 'consumo_f0',type: 'float'},
			{name: 'importo_totale_attiva_f1',type: 'float'},
			{name: 'importo_totale_attiva_f2',type: 'float'},
			{name: 'importo_totale_attiva_f3',type: 'float'},
			{name: 'importo_totale_attiva_peak',type: 'float'},
			{name: 'importo_totale_attiva_off_peak',type: 'float'},
			{name: 'importo_totale_attiva_f0',type: 'float'},
			{name: 'importo_totale_reattiva',type: 'float'},
			{name: 'totale_distribuzione',type: 'float'},
			{name: 'totale_parte_a',type: 'float'},
			{name: 'imposte_erariali',type: 'float'},
			{name: 'totale_dispacciamento',type: 'float'}		
        ],
        idProperty: 'id'
    });

    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        id: 'store',
        model: 'ForumThread',
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        
        // The topics-remote.php script appears to be hardcoded to use 50, and ignores this parameter, so we
        // are forced to use 50 here instead of a possibly more efficient value.
        pageSize: 50,

        // This web service seems slow, so keep lots of data in the pipeline ahead!
        leadingBufferZone: 1000,
		encode: true,
		
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'ajax',
			api: {
				read: 'php/elencaConsumi2.php',
				create: 'php/nuovoConsumo.php', 
				update: 'php/aggiornaConsumo.php',
				destroy: 'php/eliminaConsumo.php'
			},
			reader: {
				type: 'json',
				root: 'consumi',
				successProperty: 'success',
				totalProperty: 'count'
			},
			writer: {
				type: 'json',
				writeAllFields: true,
				encode: true,
				root: 'consumi'
			},			
            // sends single sort as multi parameter
            simpleSortMode: true,
            
            // Parameter name to send filtering information in
            filterParam: 'query',

            // The PHP script just use query=<whatever>
            encodeFilters: function(filters) {
                return filters[0].value;
            }
        },
        listeners: {
            totalcountchange: onStoreSizeChange
        },
		sorters : {
			property : 'pod',
			direction : 'ASC'
		},		
        remoteFilter: true,
        autoLoad: true
    });
    
    function onStoreSizeChange() {
        grid.down('#status').update({count: store.getTotalCount()});
    }

    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 600,
        title: 'ExtJS.com - Browse Forums',
        store: store,
        loadMask: true,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                width: 400,
                fieldLabel: 'Search',
                labelWidth: 50,
                xtype: 'searchfield',
                store: store
            }, '->', {
                xtype: 'component',
                itemId: 'status',
                tpl: 'Matching threads: {count}',
                style: 'margin-right:5px'
            }]
        }],
        selModel: {
            pruneRemoved: false
        },
        multiSelect: true,
        viewConfig: {
            trackOver: false
        },
        // grid columns
        columns:[
					{
					xtype: 'rownumberer',
					width: 50,
					align: 'left',
					locked: true,
					sortable: false
					},
					{
					text: 'POD', 
					dataIndex: 'pod',   
					width:110, 
					align:'center',
					editor: 'textfield',
					sortable: true,
					filter: {
						type: 'string'
					}					
					},
					{
					text: 'Fornitore', 
					dataIndex: 'fornitore',   
					width:110, 
					align:'center',
					editor: 'textfield',
					sortable: true,
					filter: true
					},
					{
					text: 'Tipo di<br>documento', 
					dataIndex: 'tipo_documento',   
					width:110, 
					align:'center',
					editor: 'textfield',
					sortable: true,
                    filter: {
                        type: 'list',
                        options: [
                            'C', 'D', 'F', 'M', 'R', 'S'
                        ],
						phpMode: true
                    },					
					},
					{
					text: 'Numero Fiscale', 
					dataIndex: 'numero_fiscale',   
					width:110, 
					align:'center',
					editor: 'textfield',
					sortable: true,
					filter: true
					},							
					{
					text: 'Mese di<br>Riferimento', 
					dataIndex: 'mese_riferimento',  
					width:80, 
					align:'center', 
					sortable: true,
                    filter: {
                        type: 'numeric'  // specify type here or in store fields config
                    }					
					},
					{
					text: 'Anno di<br>Riferimento', 
					dataIndex: 'anno_riferimento',  
					width:80, 
					align:'center', 
					sortable: true,
					filter: true				
					},
					{
					text: 'Mese <br>Consumi', 
					dataIndex: 'mese_consumi',  
					width:80, 
					align:'center', 
					sortable: true,
					filter: true
					},
					{
					text: 'Anno <br>Consumi', 
					dataIndex: 'anno_consumi',  
					width:80, 
					align:'center', 
					sortable: true,
					filter: true
					},					
					{
					text: 'Data di<br>emissione', 
					dataIndex: 'data_emissione',  
					width:80, 
					align:'center', 
					sortable: true,
					filterable:true,
					filter: {
						type: 'date'
						//value:1,    // 0 is false, 1 is true
						//active:true // turn on the filter
						},				
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
					},
					{ 
					text: 'Totale Fattura<br>Netto',
					dataIndex:'totale_fattura_netto',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	
					{
					text: 'Importo IVA',
					dataIndex:'importo_iva',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Totale Fattura',
					dataIndex:'totale_fattura',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo F1',
					dataIndex:'consumo_f1',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo F2',
					dataIndex:'consumo_f2',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo F3',
					dataIndex:'consumo_f3',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo Fascia Peak',
					dataIndex:'consumo_fascia_peak',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo Fascia Off Peak',
					dataIndex:'consumo_fascia_off_peak',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Consumo F0',
					dataIndex:'consumo_f0',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Importo Totale<br>Attiva F1',
					dataIndex:'importo_totale_attiva_f1',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Importo Totale<br>Attiva F2',
					dataIndex:'importo_totale_attiva_f2',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Importo Totale<br>Attiva F3',
					dataIndex:'importo_totale_attiva_f3',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Importo Totale<br>Attiva Peak',
					dataIndex:'importo_totale_attiva_peak',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ 
					text: 'Importo Totale<br>Attiva Off Peak',
					dataIndex:'importo_totale_attiva_off_peak',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	
					{ 
					text: 'Importo Totale<br>Attiva F0',
					dataIndex:'importo_totale_attiva_f0',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ text: 'Importo Totale<br>Reattiva',
					 dataIndex:'importo_totale_reattiva',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ text: 'Totale Distribuzione',
					 dataIndex:'totale_distribuzione',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ text: 'Totale Parte A',
					 dataIndex:'totale_parte_a',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ text: 'Imposte Erariali',
					 dataIndex:'imposte_erariali',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					},	

					{ text: 'Totale Dispacciamento',
					 dataIndex:'totale_dispacciamento',
					type: 'float', 
					width:70, 
					align:'right', 
					sortable: true,
					renderer : this.formatt_numeri_float,
					filter: true
					}						
		],
        renderTo: Ext.getBody()
    });
});