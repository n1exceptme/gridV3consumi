Ext.define('ExtPOD.controller.ControllerConsumi', {
    extend: 'Ext.app.Controller',

    stores: ['Consumi'],

    models: ['Consumo'],

    views: [
		'consumi.ConsumiGrid', 
		'chart.ConsumiChart'
		],

    refs: [
		{
            ref: 'ConsumiChart',
            selector: 'chart'
        },
		{
            ref: 'ConsumiGrid',
            selector: 'grid'
        }
    ],

    init: function() {
		
		this.getConsumiStore().load();
/*        this.control({
		
			'ConsumiChart': {
                afterrender: function (chart,o) {
                    var series = chart.series.getAt(0);
                    series.listeners = {
                        itemmouseup: function(item) {                            
                           
                            var series = Ext.ComponentQuery.query('ConsumiChart')[0].series.get(0);
                            var index = Ext.Array.indexOf(series.items, item);
                            var selectionModel = Ext.ComponentQuery.query('ConsumiGrid')[0].getSelectionModel();
                     
                            var selectedStoreItem = item.storeItem;
                            selectionModel.select(index);
                        }
                    }
                },
                beforerefresh: this.beforerefresh
            },
			
            'ConsumiGrid dataview': {
                itemdblclick: this.modificaFornitura
            },
			'ConsumiGrid': {
        		selectionchange: this.gridSelectionChange,
                viewready: this.onViewReady
			},
            'ConsumiGrid button[action=add]': {
            	click: this.modificaFornitura
            },
            'ConsumiGrid button[action=edit]': {
            	click: this.modificaFornitura
            },			
            'ConsumiGrid button[action=delete]': {
                click: this.eliminaFornitura
            },
            'ConsumiGrid button[action=cerca]': {
                click: this.cercaFornitura
            },	
            'ConsumiGrid button[action=resetsearch]': {
                click: this.resetcercaFornitura
            },			
            'EditForm button[action=save]': {
                click: this.aggiornaFornitura
            }
        });
   */ },

    modificaFornitura: function(grid, record) {
        var edit = Ext.create('ExtPOD.view.fornitura.EditForm').show();
        
        if(record){
        	edit.down('form').loadRecord(record);
        }
    },
    
    aggiornaFornitura: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
        
        var nuovo = false;
        
		if (values.id > 0){
			record.set(values);
		} else{
			record = Ext.create('ExtPOD.model.Fornitura');
			record.set(values);
			this.getFornitureStore().add(record);
            nuovo = true;
		}
        
		win.close();
        this.getFornitureStore().sync();

        if (nuovo){ //faz reload para atualziar
            this.getStore().load();
        }
    },
    
    eliminaFornitura: function(button) {
    	
    	var grid = this.getConsumiGrid(),
    	record = grid.getSelectionModel().getSelection(), 
        store = this.getFornitureStore();

	    store.remove(record);
	    this.getFornitureStore().sync();

        //faz reload para atualziar
        this.getFornitureStore().load();
    },
	
	localizzaFornitura: function(button) {
/* 		var mapwin;
		if (!mapwin) {
			mapwin = Ext.create('Ext.window.Window', {
                autoShow: true,
                layout: 'fit',
                title: 'Google Maps',
                closeAction: 'hide',
                width:450,
                height:450,
                border: false,
                x: 40,
                y: 60,
                items: {
                    xtype: 'gmappanel',
                    center: {
                        geoCodeAddr: '38 Via Nuova Brecce, 80147 Napoli',
                        marker: {title: 'Sede Citelum'}
                    }
                }
            });
		} */
    },
	
    beforerefresh: function() {
        var timer = false;

        return function() {
            clearTimeout(timer);

            var series = Ext.ComponentQuery.query('ConsumiChart')[0].series.get(0);
            var index = Ext.Array.indexOf(series.items, item);
            var selectionModel = Ext.ComponentQuery.query('ConsumiGrid')[0].getSelectionModel();
            var selectedStoreItem = item.storeItem; 

            if (selectedStoreItem) {
                timer = setTimeout(function() {
                    this.selectItem(selectedStoreItem);
                }, 900);
            }
        };
    },

    gridSelectionChange: function(model, records) {
        if (records[0]) {
             this.getScheda().getForm().loadRecord(records[0]);
        }
    },
    
    onViewReady: function(grid) {
        grid.getSelectionModel().select(0);
    }   
	
});
