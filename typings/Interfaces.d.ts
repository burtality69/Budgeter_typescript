interface IAuthToken {
	access_token: string,
	token_type: string,
	expires_in: number,
	userName: string,
	issued: Date,
	expires: Date
}

interface ITokenResponse {
	data: IAuthToken,
	status: number,
	headers: Object,
	config: Object,
	statusText: string
}

interface IBudgetHeadLines {
	balance: number,
	savings: number,
	incoming: number,
	outgoing: number,
}

interface iBudgetRowModel {
	month: string,
	description: string,
	amount: string
}


/** Parameter model for forecast API */
interface IForecastParams {
	startDate: Date;
    endDate: Date;
    startBal: number,
}


interface IForecastRowModel {
    caldate: Date,
    payment_details: {[name: string]: number}
    total_payments: number,
    deduction_details: {[name: string]: number}
    total_deductions: number,
    savings_details: {[name: string]: number}
    total_savings: number,
    balance: number,
    savings: number
}

interface IForecastRowServerModel {
    caldate: string,
    payment_details: {[name: string]: number}
    total_payments: number,
    deduction_details: {[name: string]: number}
    total_deductions: number,
    savings_details: {[name: string]: number}
    total_savings: number,
    balance: number,
    savings: number
}

//LOGIN + REGISTER

interface ILoginModel {
	username: string;
	password: string; 
	errorMessage: string; 
}


interface IRegistrationModel {
	Email: string; 
	password: string; 
	confirmPassword: string; 
	errorMessage: string;
}

interface ITransactionModel {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TypeDescription: string,
	TransactionValues: Array<ITransactionValueClientModel>
}

interface ITransactionServerModel {
	ID: number,
	Name: string,
	TypeID: number,
	UserID: string,
	TypeDescription: string,
	TransactionValues: Array<ITransactionValueServerModel>
}

interface ITransactionValueClientModel {
	ID: number,
	TransactionID: number,
	Value: number,
	FrequencyID: number,
	FrequencyDescription: string,
	Day: number,
	Start_date: Date,
	End_date: Date,
	include: boolean
}

interface ITransactionValueServerModel {}
	ID: number,
	TransactionID: number,
	Value: number,
	FrequencyID: number,
	FrequencyDescription: string,
	Day: number,
	Start_date: string;
	End_date: string;
	include: boolean; 
}


