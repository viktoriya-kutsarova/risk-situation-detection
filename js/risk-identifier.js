const accelerometerCapability = tizen.systeminfo.getCapability('http://tizen.org/feature/sensor.accelerometer');
const fall_threshold = 10;

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
    constructor(riskMitigator) {
        super();
        
        if (accelerometerCapability == true) {
        	this.accelerometer = tizen.sensorservice.getDefaultSensor('ACCELERATION');
        } else {
        	throw Error('Can not identify fall using accelerometer.');
        }
        this.riskMitigator = riskMitigator;
    }

    measureRisk() {
    	/* Bind return a copy of the onSensorStart function with the this property set to the first argument.
    	 * Here, this would be set to the FallIndentifier object.
    	*/  
    	this.accelerometer.start(this.onSensorStart.bind(this));
    }
    
    //callback to accelerometer.start
    onSensorStart() {
    	this.accelerometer.setChangeListener(this.onaccelerationChange.bind(this), 500, 1);
    }
    
    onaccelerationChange(sensorData) {
  	  	if (sensorData.z > fall_threshold) {
  	  		console.log("Calling for help at " + Date.now());
  	  		this.riskMitigator.callForHelp();
  	  	}
    }
    
    stopMeasuringRisk() {
    	this.accelerometer.unsetChangeListener();
    	this.accelerometer.stop();
    }
}

class GestureWristUpIdentifier extends RiskIdentifier {
	constructor(riskMitigator) {
        super();
        this.riskMitigator = riskMitigator;
        this.gestureWristUpListenerId = 0;
        
        try {
    	    var isSupported = tizen.humanactivitymonitor.isGestureSupported('GESTURE_WRIST_UP');
    	    console.log('GESTURE_WRIST_UP is ' + (isSupported ? 'supported' : 'not supported'));
    	} catch (error) {
    	    console.log('Error ' + error.name + ': ' + error.message);
    	}
    }

    measureRisk() {
    	/* Bind return a copy of the onSensorStart function with the this property set to the first argument.
    	 * Here, this would be set to the GestureWristUpIdentifier object.
    	*/  
    	try {
    	    this.gestureWristUpListenerId 
    	    	= tizen.humanactivitymonitor.addGestureRecognitionListener('GESTURE_WRIST_UP', 
    	    			this.onGestureWristUp.bind(this), this.writsUpErrorCallback.bind(this), true);
    	} catch (error) {
    	    console.log('Error ' + error.name + ': ' + error.message);
    	}
    }
    
    onGestureWristUp(data) {
    	console.log('Received ' + data.event + ' event on ' + new Date(data.timestamp * 1000) + ' for '+ data.type + ' type');
    	this.riskMitigator.callForHelp();
    }
    
    writsUpErrorCallback(error) {
        console.log(error.name + ': ' + error.message);
    }
    
    stopMeasuringRisk() {
    	try {
    	    tizen.humanactivitymonitor.removeGestureRecognitionListener(this.gestureWristUpListenerId);
    	} catch (err) {
    	    console.log('Exception: ' + err.name);
    	}
    }
} 