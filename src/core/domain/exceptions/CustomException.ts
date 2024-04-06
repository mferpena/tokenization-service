class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Llama al constructor de la clase base (Error) con el mensaje de error
    this.name = "CustomError"; // Asigna un nombre a la instancia del error
    this.statusCode = statusCode; // Asigna el código de estado al error
    Object.setPrototypeOf(this, CustomError.prototype); // Establece el prototipo explícitamente para ES5
  }
}

export default CustomError;
