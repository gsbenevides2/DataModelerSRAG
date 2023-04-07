export class OracleError extends Error {
  id: string;
  paramsToQuery: any;
  oraStack: any;
  constructor(id: string, error: any, paramsToQuery: any) {
    super();
    this.name = "OracleError";
    this.message = error.message;
    this.id = id;
    this.paramsToQuery = paramsToQuery;
    this.oraStack = error.stack;
    Object.keys(error).forEach((key) => {
      this[key as keyof OracleError] = error[key];
    });
  }
}
