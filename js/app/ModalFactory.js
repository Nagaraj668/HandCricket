baseInstance.factory('Modal', function($rootScope) {
	return {
		show : function(data) {
			$('#myModal').modal('show');
			$rootScope.$broadcast('ModalShow', data);
		},
		showConfirm : function(data) {
			$('#ConfirmModal').modal('show');
			$rootScope.$broadcast('ModalShow', data);
		},
		showList : function(data) {
			$('#listModal').modal('show');
			$rootScope.$broadcast('ListModalShow', data);
		},
		showRegSetup : function(data) {
			$('#regSetupModal').modal('show');
			$rootScope.$broadcast('RegSetupModalShow', data);
		}
	};
});
