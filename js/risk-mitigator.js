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

	formData.append("email", 'testnewnew@test.com');
	formData.append("answer_choices", "y;n");
	formData.append("file", "single_choice.php");
	formData.append("question", "This person at location XYZ is in trouble. Can you help?");
	formData.append("lng", 18.07227473706007);
	formData.append("lat", 59.34945964097764);
	formData.append("description", "No description yet");
	formData.append("type", "hit");
	formData.append("hit_type", "single");
		
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