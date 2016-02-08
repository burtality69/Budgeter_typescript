///<reference path="../../all.d.ts"/>

type trx = ITransactionModel;

module Budgeter.Services {
    
    class TrxList {
        
        static $inject = ['$rootScope','trxDataService','notify'];
        private _list: trx[];
        
        constructor (public $rootScope: ng.IRootScopeService, public trxDataSvc: Services.trxDataService, 
                private notify: ng.cgNotify.INotifyService) { 
                    this.load()
        }
        
        add(t:trx){
            this._list.push(t);
            this.broadcastChange();
        }
        
        /** Remove item from list -return a promise */
        remove(id: number): Promise<string> {
            return new Promise((res, rej) => {

                try {
                    this._list.splice(this.find(id), 1);
                    this.broadcastChange();
                    res(`Trx ${id} deleted successfully`)
                } catch (e) {
                    rej(e)
                }
            })

        }
        
        edit() {
            
        }
        /** return the index of element with the given ID */
        private find(id: number) {
            for(let i =0; i < this._list.length; i++) {
                if (this._list[i].ID == id){return i;}
            }
        }
        
        /** Populate the underlying list from the data service */
        private load () {
             this.trxDataSvc.get()
                .then(d => this._list = d)
                .catch((e: Error) => this.notify({ message: `Error loading data ${e.message}`, classes: 'alert-danger' }))
        }
        
        private broadcastChange() {
            this.$rootScope.$emit('refresh');
        }
        
        get list() {
            return this._list;
        }
        
        get activeTrx(){
            return ''
        }
        
        set activeTrx(id){
            
        }
        
    }
}