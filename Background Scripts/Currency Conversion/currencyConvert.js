var conv = new sn_currency.GlideCurrencyConverter('EUR', 'USD'); // call to API by passing Europe and USA
conv.setAmount(100); //currency value
gs.info(conv.convert()); //call the method from the API
