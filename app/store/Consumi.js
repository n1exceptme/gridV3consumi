/*
* Store per i consumi
*/

Ext.define('ExtPOD.store.Consumi', {
    extend: 'Ext.data.Store',
    model: 'ExtPOD.model.Consumo',
	
	storeId: 'Consumi',
	
    remoteSort:true,
	//remoteFilter: true,
	simpleSortMode:true,
	//autoLoad: true,
    sorters : {
        property : 'pod',
        direction : 'ASC'
    },

	// allow the grid to interact with the paging scroller by buffering
	//buffered: true,
	//leadingBufferZone: 300,
	pageSize: 50,

    proxy: {
        type: 'ajax',
        api: {
        	read: 'php/elencaConsumi.php',
			create: 'php/nuovoConsumo.php', 
            update: 'php/aggiornaConsumo.php',
            destroy: 'php/eliminaConsumo.php'
        },

        reader: {
            type: 'json',
            root: 'consumi',
			idProperty: 'id',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'consumi'
        }
    }
});