///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	export class AuthController {
		
		public static $inject = ['authFactory','sessionService','$modal']; 
		
		public $modal: ng.ui.bootstrap.IModalService
		public $modalInstance: ng.ui.bootstrap.IModalServiceInstance;
		
		constructor(public authSvc: Budgeter.Services.authSvc,
			public sessionService: Budgeter.Services.sessionService, modal: ng.ui.bootstrap.IModalService) {
			this.$modal = modal;
		}
		
		loggedIn(): boolean {
			return this.sessionService.Token !== undefined;
		}
		
		openModal() {
			this.$modalInstance = this.$modal.open({
				templateUrl: '/Views/Templates/LoginRegister.html',
				controllerAs: 'loginModalCtrl',
				controller: LoginModalController,
				size: 'sm',
			})		
		}
		
		logOut() {
			this.sessionService.destroySession();
		}
	}
	
	interface tab {Header: string, title: string, url: string};
	
	export class LoginModalController{
		
		private $modalInstance: ng.ui.bootstrap.IModalServiceInstance;
		private $rootscope: ng.IRootScopeService;
		private sessionService: Budgeter.Services.sessionService;
		public loginForm: ILoginModel;
		public registerForm: IRegistrationModel;
		public tabs: Array<tab>; 
		public currentTab: string; 
		
		
		static $inject = ['authSvc','sessionService','$modalInstance','$rootScope']; 
		
		constructor(public authSvc: Budgeter.Services.authSvc, sessionService: Budgeter.Services.sessionService, 
			modalinstance: ng.ui.bootstrap.IModalServiceInstance, $rootScope: ng.IRootScopeService) {
			
			this.tabs = [
				{ Header: "Log in", title: 'Login', url: 'Login.html' },
				{ Header: "Create an account", title: 'Register', url: 'Register.html' }
			];
			
			this.$rootscope = $rootScope;
			this.sessionService = sessionService;
			this.$modalInstance = modalinstance;
			
			this.loginForm = { username: '', password: '', errorMessage: '' };
			this.registerForm = { Email: '', password: '', confirmPassword: '', errorMessage: '' }
			this.currentTab = 'Login.html'
			
		}
		
		/** hit the token endpoint, store the access token in cookies */
		login() {
			this.authSvc.login(this.loginForm)
				.then(
					(response: IAuthToken) => {
						this.sessionService.Token = response.access_token;
						this.$modalInstance.close();
						this.$rootscope.$broadcast('redrawChart');
					})
				.catch((err: Error) => {
					console.log(err.message)
				})
		}
		
		register(registerForm: IRegistrationModel) {
			this.authSvc.register(this.registerForm)
				.then((success: ITokenResponse) => console.log(success))
		}
		
		onClickTab(tab: tab): void {
			this.currentTab = tab.url; 
		}
		
		isActiveTab(tabUrl: string): boolean {
			return tabUrl === this.currentTab;
		}
		
	}
	
	
}