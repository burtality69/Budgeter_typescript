///<reference path="../../all.d.ts"/>
interface ITransactionModel {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TransactionValues: Array<ITransactionValueModel>
}
