function include({imports}) {
  var FunctionConstructor = function() {}.constructor;
  var global = FunctionConstructor("return this")();
  return global;
}
