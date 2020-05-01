const CREATE_TASK_URL = 'http://192.168.0.108:8000/create_task.php';

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
		callCrowdSCreateTask();
    }
}

async function callCrowdSCreateTask() {
	
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
	const myJson = await response.json(); //extract JSON from the http response
	// do something with myJson
	console.log(myJson);
  
	return myJson;
}