///<reference path="../../all.d.ts"/>
var Budgeter;
(function (Budgeter) {
    var Controllers;
    (function (Controllers) {
        var AuthController = (function () {
            function AuthController(authFactory, sessionService, modal) {
                this.authFactory = authFactory;
                this.sessionService = sessionService;
                this.$modal = modal;
            }
            AuthController.prototype.loggedIn = function () {
                return this.sessionService.Token !== undefined;
            };
            AuthController.prototype.openModal = function () {
                this.$modalInstance = this.$modal.open({
                    templateUrl: '/Views/Templates/LoginRegister.html',
                    controllerAs: 'loginModalCtrl',
                    controller: LoginModalController,
                    size: 'sm',
                });
            };
            AuthController.$inject = ['authFactory', 'sessionService', '$modal'];
            return AuthController;
        })();
        Controllers.AuthController = AuthController;
        ;
        var LoginModalController = (function () {
            function LoginModalController(authFactory, sessionService, modalinstance) {
                this.tabs = [
                    { Header: "Log in", title: 'Login', url: 'Login.html' },
                    { Header: "Create an account", title: 'Register', url: 'Register.html' }
                ];
                this.authFactory = authFactory;
                this.sessionService = sessionService;
                this.$modalInstance = modalinstance;
                this.loginForm = { username: '', password: '', errorMessage: '' };
                this.registerForm = { Email: '', password: '', confirmPassword: '', errorMessage: '' };
                this.currentTab = 'Login.html';
            }
            /** hit the token endpoint, store the access token in cookies */
            LoginModalController.prototype.login = function () {
                var _this = this;
                this.authFactory.login(this.loginForm)
                    .success(function (response) {
                    _this.sessionService.Token = response.access_token;
                    _this.$modalInstance.close();
                    _this.$rootscope.$broadcast('redrawChart');
                })
                    .error(function (err) {
                    console.log(err.message);
                });
            };
            LoginModalController.prototype.register = function (registerForm) {
                this.authFactory.register(this.registerForm)
                    .then(function (success) { return console.log(success); });
            };
            LoginModalController.prototype.onClickTab = function (tab) {
                this.currentTab = tab.url;
            };
            LoginModalController.prototype.isActiveTab = function (tabUrl) {
                return tabUrl === this.currentTab;
            };
            LoginModalController.$inject = ['authFactory', 'sessionService', '$modalInstance'];
            return LoginModalController;
        })();
        Controllers.LoginModalController = LoginModalController;
    })(Controllers = Budgeter.Controllers || (Budgeter.Controllers = {}));
})(Budgeter || (Budgeter = {}));
