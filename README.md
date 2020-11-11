# Risk Situation Detection app

Risk Situation Detection app is a Smartwatch application that allows for detecting and mitigating risky situations.
It has been developed using Tizen Wearable Web Application Stack and has been tested on Galaxy Watch 46mm LTE (Tizen Version 4.0.0.7).
This application has been created as part of a Master thesis project on risk situation mitigation using the crowdsensing 
system [Extended CrowdS](https://github.com/viktoriya-kutsarova/extended-crowds/tree/master).

## Installation
You can install the application using either Tizen Studio IDE or console. For this project, Tizen Studio IDE has been used.
The Smartwatch and the Notebook need to be connected to the same WiFi network.

### Smartwatch side
1. Enable WiFi. The Smartwatch has to obtain an IP address.
2. Enable Developer mode and Debugging on the Smartwatch.

### Notebook side
1. Install Tizen Studio IDE.
2. Import the project with min. version wearable 4.0.
3. Using the Device Manager of Tizen Studio, connect to the Smartwatch.
4. Sign the application.
5. You can execute Run as/Debug as on the app and select the Smartwatch as a target.

This [tutorial](https://www.youtube.com/watch?v=BqWjvi9rQuY&ab_channel=SamsungDevelopers) may help you perform all of the steps.

## Components

There are two primary components of the Risk Situation Detection app: ***Risk Identifier*** and ***Risk Mitigator***.

### Risk Identifier
The Risk Identifier is the component responsible for detecting whether a risky situation has occurred. Within the current implementation,
it detects a predefined movement pattern. Once the application recognizes the predefined pattern, the Risk Identifier calls the Risk Mitigator.
The predefined pattern within the current implementation is WRIST_UP movement.

### Risk Mitigator
The Risk Mitigator is the component responsible for mitigating the risky situation detected by the Risk Identifier. Within the
current implementation, the Risk Mitigator connects the Smartwatch to the Extended CrowdS crowdsensing system, which takes care
of the rest. The current implementation of the Risk Mitigator connects using Bluetooth to a Smartphone that has Extended CrowdS installed.

## How to extend the system
In order to add a new Risk Identifier, extend the class ***RiskIdentifier*** located in ***js/risk-identifier.js***.
The two methods that need to be implemented are ***measureRisk()*** and ***stopMeasuringRisk()***.
Then add the new identifier to the `const riskIdentifiers` in ***js/main.js***. For an example implementation of a RiskIdentifier,
check the class `RiskIdentifier`.

To add a new Risk Mitigator, extend the class ***RiskMitigator*** located in ***js/risk-mitigator.js***. The method that
needs to be implemented is ***callForHelp()***. Create the new RiskMitigator in ***js/main.js*** and give it as a parameter
to a Risk Identifier. For an example implementation of a RiskMitigator, check the class `BluetoothRiskMitigator`.