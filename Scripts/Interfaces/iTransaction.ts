///<refrence path="./all.d.ts"/>
interface ITransaction {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TransactionValues: Array<ITransactionValue>
}
