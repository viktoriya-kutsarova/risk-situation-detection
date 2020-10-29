window.onload = function () {
	
	requestLocationPermission();
	
	const riskMitigator = new BluetoothRiskMitigator();
	const riskIdentifiers = [new GestureWristUpIdentifier(riskMitigator)];
	startMeasuringRisks(riskIdentifiers);

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
        	try {
        		stopMeasuringRisks(riskIdentifiers);
        		tizen.application.getCurrentApplication().exit();
        	} catch (ignore) {
        	}
    });

    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){

    	riskMitigator.callForHelp();
    });
    
};

function requestLocationPermission() {
	tizen.ppm.requestPermission("http://tizen.org/privilege/location", 
			(s) => {console.log("success")}, 
			(e) => {console.log("error " + JSON.stringify(e))});
}

function startMeasuringRisks(riskIdentifiers) {
	console.log("Starting to measure risks.");
	riskIdentifiers.forEach(risk => risk.measureRisk());
}

function stopMeasuringRisks(riskIdentifiers) {
	console.log("Stop measuring risks.");
	riskIdentifiers.forEach(risk => risk.stopMeasuringRisk());
}