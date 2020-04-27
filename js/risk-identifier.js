var accelerometerCapability = tizen.systeminfo.getCapability('http://tizen.org/feature/sensor.accelerometer');

class RiskIdentifier {
	
    measureRisk() {
    	throw new Error('You have to implement the method measureRisk!');
    }
    
    toString() {
        return Object.getPrototypeOf(this).constructor.name;
    }
}

class FallIndentifier extends RiskIdentifier {
    constructor() {
        super();
        
        if (accelerometerCapability == true) {
        	this.accelerometer = tizen.sensorservice.getDefaultSensor('ACCELERATION');
        } else {
        	throw Error('Can not identify fall using accelerometer.');
        }
    }

    measureRisk() {
    	this.accelerometer.start(this.onsuccessSensorStart);
    }
    
    onsuccessSensorStart() {
    	console.log("Successfully started accelerometer");
    }
}

function displayRiskIdentifiers(riskIdentifiers) {
	console.log("inside: " + riskIdentifiers);
	riskIdentifiers.forEach(risk => console.log(`Risk: ${risk.measureRisk()}`));
}

const riskIdentifiers = [new FallIndentifier("high")];
console.log("risks: " + riskIdentifiers);
console.log(displayRiskIdentifiers(riskIdentifiers));