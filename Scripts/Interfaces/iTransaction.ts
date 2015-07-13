///<reference path="../../all.d.ts"/>
interface ITransactionModel {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TypeDescription: string,
	TransactionValues: Array<ITransactionValueModel>
}
