var filtersCfg = {
    ftype: 'filters',
    encode: true,
	local: false,
	updateBuffer: 1000
};

var showSummary = true;

Ext.define('ExtPOD.view.consumi.ConsumiGrid' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ConsumiGrid',

    requires: [
		'Ext.ux.grid.FiltersFeature',
		'Ext.grid.PagingScroller'
	],
	
	columnLines: true,
	
    iconCls: 'icon-grid',

	features: [
		filtersCfg,
		{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
			startCollapsed:true,
            hideGroupedHeader: false,
            enableGroupingMenu: true
        }
	],
	
    title : 'Consumi',
    store: 'Consumi',
	
	// Use a PagingGridScroller (this is interchangeable with a PagingToolbar)
    // verticalScrollerType: 'paginggridscroller',
    // verticalScroller: {
        // numFromEdge: 5,
        // trailingBufferZone: 10,
        // leadingBufferZone: 20
    // },
	// do not reset the scrollbar when the view refreshs
	//invalidateScrollerOnRefresh: false,
	// infinite scrolling does not support selection
	//disableSelection: true,   
	//loadMask: true,
	//viewConfig: {
	//	trackOver: false
	//},	

	width: 600,
	height: 600,	

	formatt_numeri_float: function(val) {
		if (val > 0) {
			return '<span style="color:blue;">' + val.toFixed(2) + '</span>';
		} else if (val <= 0) {
			return '<span style="color:red;">' + val.toFixed(2) + '</span>';
		}
		return val;
	},
	
	initComponent: function() {
		this.columns = 
					[			
					{
					text: 'POD', 
					dataIndex: 'pod',   
					width:110, 
					align:'center',
					editor: 'textfield',
					sortable: true,
					filter: {
						type: 'string'
						},
					summaryType: 'count',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
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
					renderer: Ext.util.Format.dateRenderer('d/m/Y'),
					summaryType: 'max',
					summaryRenderer: Ext.util.Format.dateRenderer('m/d/Y')
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
		];	

		this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    displayInfo: true,
                    store: 'Consumi',
                    items: [
						{
							tooltip: 'Mostra/Nasconde record di sintesi',
							text: 'Record riassuntivo',
							handler: function(){
								var view = Ext.ComponentQuery.query('ConsumiGrid')[0].getView();
								showSummary = !showSummary;
								view.getFeature('group').toggleSummaryRow(showSummary);
								view.refresh();
							}
						},				
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'filterData',
                            text: 'Filtri Attivi',
                            tooltip: 'Visualizza Filtri Attivi'
                        },
                        {
                            xtype: 'button',
                            itemId: 'clearFilter',
                            text: 'Resetta Filtri'
                        }
                    ]
                }		
		];
		
		this.listeners = [ {
				sortchange: function(){
					//var grid = Ext.ComponentQuery.query('ConsumiGrid')[0];
					getConsumiStore().load();
				}
				}
		];	
		
		// trigger the data store load
		//ConsumiStore.guaranteeRange(0, 199);
		
		this.callParent(arguments);
	}
});