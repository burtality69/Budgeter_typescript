///<reference path="../../all.d.ts"/>

module Budgeter.Controllers {
	
	export class authController {
		
		static $inject = ['authFactory','sessionService','$modal']; 
		
		public loginForm: ILoginModel
		public registerForm: IRegistrationModel
		private authFactory: Budgeter.Factories.authFactory;
		private sessionService: Budgeter.Services.sessionService;
		private $modal: ng.ui.bootstrap.IModalService
		private $modalInstance: ng.ui.bootstrap.IModalServiceInstance; 
		
		constructor (authFactory: Budgeter.Factories.authFactory, sessionService: Budgeter.Services.sessionService, modal: ng.ui.bootstrap.IModalService){
			this.authFactory = authFactory;
			this.sessionService = sessionService; 
			this.$modal = modal; 
		}
		
		loggedIn(): boolean {
			return this.sessionService.Token !== undefined;
		}
		
		openModal() {
			this.$modalInstance = this.$modal.open({
				templateUrl: '/Views/Templates/LoginRegister.html',
				controllerAs: 'loginModalCtrl',
				controller: function($modalinstance: ng.ui.bootstrap.IModalServiceInstance , $rootscope: ng.IRootScopeService)
			})
			
		}
	}
	
	
}