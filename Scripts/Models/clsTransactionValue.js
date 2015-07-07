/* global budgeterModels */
budgeterModels.factory('ClsTransactionValue',['dateParser',function (dateParser) {

  function ClsTransactionValue(ID, TransactionID, Value, FrequencyID, FrequencyDescription, Day, Start_date, End_date,Include) {
      // Public properties, assigned to the instance ('this')
      this.ID = ID,
      this.TransactionID = TransactionID,
      this.Value = Value,
      this.FrequencyID = FrequencyID,
      this.FrequencyDescription = FrequencyDescription,
      this.Day = Day,
      this.Start_date = Start_date || new Date(),
      this.End_date = End_date || new Date(),
      this.include = Include || true;
  }

  ClsTransactionValue.build = function (data) {

      return new ClsTransactionValue (
          data.ID,
          data.TransactionID,
          data.Value,
          data.FrequencyID,
          data.FrequencyDescription,
          data.Day,
          dateParser.getUTCDate(data.Start_date),
          dateParser.getUTCDate(data.End_date),
          data.include
    );
  };

  ClsTransactionValue.prototype.formatforApi = function () {
    return {
      ID: this.ID,
      TransactionID: this.TransactionID,
      Value: this.Value,
      FrequencyID: this.FrequencyID,
      Day: this.Day,
      Start_date: this.Start_date.toLocaleDateString('en-US'),
      End_date: this.End_date.toLocaleDateString('en-US'),
      include: this.include
    };
  };

    return ClsTransactionValue;
    
}]);
