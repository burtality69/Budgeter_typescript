///<reference path="../../all.d.ts"/>
interface ITransactionServerModel {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TypeDescription: string,
	TransactionValues: Array<ITransactionValueServerModel>
}