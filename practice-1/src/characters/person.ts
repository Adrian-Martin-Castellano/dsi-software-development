/**
 * Abstract class Person. Describes the minimum attributes a person must have.
 */
export abstract class Person {

    protected _id: number; // Unique ID of the person
  
    /**
     * Person constructor
     * @param _name - Name of the person
     * @param _location - Location of the person
     */
    constructor(
      protected _name: string, 
      protected _location: string) 
      {
        if (_name === "") {
         throw new Error("El nombre no puede estar vacío.");
        } else if (_location === "") {
         throw new Error("El nombre de la localización no puede estar vacío.");
        }
  
        this._id = 0;
      }

      /**
       * Name getter
       */
      get name() {

        return this._name;
      }

      /**
       * Name setter
       */
      set name(name: string) {
        if (name === "") {
          throw new Error("El nombre no puede estar vacío.");
        }

        this._name = name;
      }

      /**
       * ID getter
       */
      get id() {
        return this._id;
      }

      /**
       * ID setter
       * @param id - New ID
       */
      protected setId(id: number): void {
        this._id = id;
      }
  
      /**
       * Location getter
       */
      get location() {
        return this._location;
      }
  
      /**
       * Location setter
       */
      set location(local: string) {
        if (local === "") {
          throw new Error("El nombre de la localización no puede estar vacío.");
         }

        this._location = local;
      }
  }