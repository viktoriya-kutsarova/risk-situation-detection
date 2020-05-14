const CREATE_TASK_URL = 'http://192.168.0.108:8000/create_task.php';
const BLUETOOTH_SERVICE_UUID = 'e1ce069e-55f5-4b39-99d5-a7f2a0cd7267';

class RiskMitigator {

	callForHelp() {
    	throw new Error('You have to implement the method callForHelp!');
    }
}

class CrowdSourcingRiskMitigator extends RiskMitigator {
	
	constructor() {
        super();
    }
	
	callForHelp() {
		sendDataToCrowdsThroughInternet();
    }
}

class BluetoothRiskMitigator extends RiskMitigator {

	constructor() {
        super();
        this.adapter = tizen.bluetooth.getDefaultAdapter();
        this.socket = null;
        this.device = null;
    }

	callForHelp() {
		this.sendDataToPhoneThroughBluetooth();
    }

	sendDataToPhoneThroughBluetooth() {
		if (this.socket == null) {
			/* Retrieve known devices */
			this.adapter.getKnownDevices(this.onGotDevices.bind(this));
		} else {
			if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition(
		        		(position) => {
					    	 var crdToStr = {lat: position.coords.latitude, lng : position.coords.longitude};
					    	 var str = JSON.stringify(crdToStr);
					    	 console.log('Sending coordinates to server: ' + str);
					    	 var bytes = [];
							 for (var j = 0; j < str.length; ++j)  
								 bytes.push(str.charCodeAt(j));
							 var length = this.socket.writeData(bytes);
		        			},
					    (error) => {console.log(error)},
					    {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
		    }
		}
	}

	/* When a known device is found */
	onGotDevices(devices) {
		// assume currently we are paired with only one device from the watch
	    console.log('The number of known devices: ' + devices[0].address);
	    this.device = devices[0];
	    this.device.connectToServiceByUUID(BLUETOOTH_SERVICE_UUID,
	    		this.onConnectionToServiceByUUIDSuccess.bind(this),
	    		this.onConnectionToServiceByUUIDError.bind(this));
	}

	onConnectionToServiceByUUIDSuccess(sock) {
		console.log('socket connected: ' + sock);
	    this.socket = sock;
	}

	onConnectionToServiceByUUIDError(error) {
		console.log('Error while connecting: ' + error.message);
	}
}

async function sendDataToCrowdsThroughInternet() {
	
	var formData = new FormData();

	formData.append("email", 'test@mail.com');
	formData.append("answer_choices", "y;n");
	formData.append("file", "single_choice.php");
	formData.append("question", "Can you help?");
	formData.append("description", "This person at location XYZ is in trouble.");
	formData.append("type", "hit");
	formData.append("hit_type", "single");
	
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        		(position) => {
			    	 var crd = position.coords;
			    	 formData.append("lat", crd.latitude);
			    	 formData.append("lng", crd.longitude);
			    	 createTask(formData);},
			    (error) => {console.log(error)},
			    {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
    }
	
	return "";
}

async function createTask(formData) {
	const response = await fetch(CREATE_TASK_URL, {
	    method: 'POST',
	    body: formData, // string or object
	    headers: {
	    	'Cache': 'no-cache',
	        'Credentials': 'same-origin',
	        'Cookie': 'XDEBUG_SESSION=XDEBUG_ECLIPSE'
	    }
	});
	const myJson = await response.json(); // extract JSON from the http
											// response
	// do something with myJson
	console.log(myJson);
  
	return myJson;
}