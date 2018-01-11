var inventoryData = {};
var timeOffset = 2000;

var devicesInInventory = function(url, deviceTypeId) {
    var response = $.ajax({
        url: url,
        data: {
            deviceTypeId: deviceTypeId
        },
        type: 'GET',
        dataType: 'html',
        async: false,
        cache: false,
        success: function(result) {
            return result;
        }
    });
    return response.responseText;
}

var checkInventoryDelay = function (input, element) {

    element = $(element);
    var url = element.data('checkinventory');
    var deviceTypeId = element.data('value');

    if (inventoryData[deviceTypeId] !== undefined) {
        if (Date.now() > inventoryData[deviceTypeId].lastCheckTime + timeOffset) {
            var devices = JSON.parse(devicesInInventory(url, deviceTypeId));

            inventoryData[deviceTypeId].lastCheckTime = Date.now();
            inventoryData[deviceTypeId].devices = devices.map(function (item) { return item.SerialNumber.toLowerCase() });
        }
    } else {
        var devices = JSON.parse(devicesInInventory(url, deviceTypeId));
        inventoryData[deviceTypeId] = {
            lastCheckTime: Date.now(),
            devices: devices.map(function(item){ return item.SerialNumber.toLowerCase() })
        };
    }

    if (inventoryData[deviceTypeId].devices.indexOf(input.toLowerCase()) === -1) {
        return false;
    } else {
        return true;
    }
}

$.validator.addMethod('checkInventoryDelay', checkInventoryDelay, DeviceNotFoundErrorMessage);

if ($('#itemSerialNumber').length > 0 && !$('#itemSerialNumber').prop('disabled')) {
    $('#itemSerialNumber').rules('add', { checkItemType: true });
    $('#itemSerialNumber').rules('add', { checkInventoryDelay: true });
}