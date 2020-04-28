
window.onload = function () {
    
	const riskIdentifiers = [new FallIndentifier(new CrowdSourcingRiskMitigator())];
	startMeasuringRisks(riskIdentifiers);

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
    	box = document.querySelector('#textbox');
    	box.innerHTML = box.innerHTML == "Basic" ? "Sample" : "Basic";
    });
    
};

function startMeasuringRisks(riskIdentifiers) {
	console.log("Starting to measure risks.");
	riskIdentifiers.forEach(risk => risk.measureRisk());
}
