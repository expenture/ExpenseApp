export default function ExpentureAPIException(optionalModuleName, message) {
  this.name = 'ExpentureAPIException';
  if (message) this.moduleName = optionalModuleName;
  this.message = message || optionalModuleName;
}
