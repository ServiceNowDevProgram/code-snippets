(function execute(inputs, outputs) {
    
    outputs.ipoutput = getIpsFromRange(ipToHex((transformIP(inputs.firstip))), ipToHex(transformIP(inputs.secondip)));
  	
	
//transform the IP Address into a decimal number. Each octet will need to converted to a decimal first and then added back together
    function transformIP(ip) {
        var d = ip.split(".");
        var num = 0;
        num += Number(d[0]) * Math.pow(256, 3);
        num += Number(d[1]) * Math.pow(256, 2);
        num += Number(d[2]) * Math.pow(256, 1);
        num += Number(d[3]);
        return num;
    }
  //Transform Decimal number into a HEX value, the decimal number will be to large to deal with. HEX will shorten it an make it easier to deal with. HEX Value Example> 817EB263 or 0A0A0A0A
    function ipToHex(ipList) {
        var dec = ipList.toString().split(''),
            sum = [],
            hex = [],
            i, s;
        while (dec.length) {
            s = 1 * dec.shift();
            for (i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10;
                sum[i] = s % 16;
                s = (s - sum[i]) / 16;
            }
        }
        while (sum.length) {
            hex.push(sum.pop().toString(16));
        }
        return "0x" + hex.join('').toString();
    }
  //Take the HEX Values and transform them back into an IP Address by shifting the bits right as seen in oc4,oc3,oc2 below. This will loop through untill it reaches the final HEX value converting along the way. it will. then push into an array
    function getIpsFromRange(hex1, hex2) {
        var ipArr = [];
        for (var i = hex1; i < hex2; i++) {
            var oc4 = (i >> 24) & 255;
            var oc3 = (i >> 16) & 255;
            var oc2 = (i >> 8) & 255;
            var oc1 = i & 255;
            gs.debug("IP ADDRESSES: " + oc4 + "." + oc3 + "." + oc2 + "." + oc1);
            ipArr.push(oc4 + "." + oc3 + "." + oc2 + "." + oc1 + "\\n");
        }
        gs.debug("ARRRAY: " + ipArr);
        return ipArr;
    }
})(inputs, outputs);
