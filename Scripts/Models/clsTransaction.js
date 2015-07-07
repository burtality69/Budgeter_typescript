budgeterModels.factory('ClsTransaction',['ClsTransactionValue',function (ClsTransactionValue) {

    /*** Constructor, with class name*/
    function ClsTransaction(ID, Name, TransactionValues, TypeDescription,TypeID, UserID ) {
        // Public properties, assigned to the instance ('this')
        this.ID = ID || undefined,
        this.Name = Name || undefined,
        this.TypeDescription = TypeDescription || undefined,
        this.TypeID = TypeID || undefined,
        this.TransactionValues = TransactionValues || [new ClsTransactionValue()]
        this.UserID = UserID || undefined
    }

    /*** Static method, assigned to class* Instance ('this') is not available in static context*/
    ClsTransaction.build = function (data) {

        return new ClsTransaction (
            data.ID,
            data.Name,
            data.TransactionValues.map(ClsTransactionValue.build),
            data.TypeDescription,
            data.TypeID,
            data.UserID
            );
    };

    /*** Return the constructor function*/
    return ClsTransaction;
}]);

