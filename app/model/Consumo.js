/*
* Modello dei dati i consumi
*/

Ext.define('ExtPOD.model.Consumo', {
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
	]
});