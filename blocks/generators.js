Blockly.Python['servo'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_machine_import_pwm'] = 'from machine import PWM';

  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var code = `PWM(Pin(${value_pin}), freq=50).duty(int(25.57 + (((${value_angle}) / 180.0) * 102.3)))\n`;
  return code;
};

Blockly.JavaScript['servo'] = function (block) {
  Blockly.JavaScript.definitions_['include']['Servo.h'] = '#include <Servo.h>';
  
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);

  const obj_name = 'myServo' + value_pin;

  Blockly.JavaScript.definitions_['define'][obj_name] = `Servo ${obj_name};`;

  var functionName = Blockly.JavaScript.provideFunction_(
    'servo' + value_pin + '_write',
    [
      'void ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(int angle) {',
      `  if (!${obj_name}.attached()) {`,
      `    ${obj_name}.attach(${value_pin});`,
      '  }',
      '  ${obj_name}.write(angle);',
      '}'
    ]);

  var code = `${functionName}(${value_angle});\n`;
  return code;
};

