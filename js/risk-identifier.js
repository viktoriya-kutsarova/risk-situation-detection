var accelerometerCapability = tizen.systeminfo.getCapability('http://tizen.org/feature/sensor.accelerometer');

class RiskIdentifier {
	
    measureRisk() {
    	throw new Error('You have to implement the method measureRisk!');
    }
    
    stopMeasuringRisk() {
    	throw new Error('You have to implement the method stopMeasuringRisk!');
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
    	console.log("Inside measure risk: " + this);
    	/* Bind return a copy of the onSensorStart function with the this property set to the first argument.
    	 * Here, this would be set to the FallIndentifier object.
    	*/  
    	this.accelerometer.start(this.onSensorStart.bind(this));
    }
    
    //callback to accelerometer.start
    onSensorStart() {
    	console.log("Successfully started accelerometer");
    	this.accelerometer.setChangeListener(this.onaccelerationChange, 500, 1);
    }
    
    onaccelerationChange(sensorData) {
    	console.log("######## Changed acceleration sensor data ########");
    	console.log("Timestamp: " + Date.now());
  	  	console.log("x: " + sensorData.x);
  	  	console.log("y: " + sensorData.y);
  	  	console.log("z: " + sensorData.z);
    }
    
    stopMeasuringRisk() {
    	this.accelerometer.unsetChangeListener();
    	this.accelerometer.stop();
    }
}